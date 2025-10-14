import { defineNuxtPlugin, useRuntimeConfig, navigateTo } from "#app";
import { ofetch } from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const instance = ofetch.create({
    async onRequest({ options }) {
      options.baseURL = config.public.apiUrl;

      const token = localStorage.getItem("token");
      if (token) {
        options.headers = new Headers(options.headers || {});
        options.headers.set("Authorization", `Bearer ${token}`);
      }
    },

    async onResponse({ request, response, options }) {
      const res = response._data;
      response._data = res;
    },

    async onResponseError({ request, response, options }) {
      if (response.status === 401) {
        navigateTo("/login");
      }

      const error: any = {
        message: response._data?.message || "An error occurred",
        status: response.status,
      };

      throw error;
    },
  });

  const api = {
    async auth(url: string, body?: any, opts?: any) {
      localStorage.removeItem("token");

      try {
        return await instance(url, { method: "POST", body, ...opts });
      } catch (err: any) {
        return handleApiError(err);
      }
    },

    async get(url: string, params?: any, opts?: any) {
      try {
        return await instance(url, { method: "GET", params, ...opts });
      } catch (err: any) {
        return handleApiError(err);
      }
    },

    async post(url: string, body?: any, opts?: any) {
      try {
        return await instance(url, { method: "POST", body, ...opts });
      } catch (err: any) {
        return handleApiError(err);
      }
    },

    async put(url: string, body?: any, opts?: any) {
      try {
        return await instance(url, { method: "PUT", body, ...opts });
      } catch (err: any) {
        return handleApiError(err);
      }
    },

    async delete(url: string, body?: any, opts?: any) {
      try {
        return await instance(url, { method: "DELETE", body, ...opts });
      } catch (err: any) {
        return handleApiError(err);
      }
    },

    async upload(url: string, formData: FormData, opts?: any) {
      try {
        return await instance(url, {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
          ...opts,
        });
      } catch (err: any) {
        return handleApiError(err);
      }
    },
  };

  function handleApiError(err: any) {
    return {
      success: false,
      status: err?.response?.status,
      message: err?.response?._data?.message || err.message,
    };
  }

  nuxtApp.provide("api", api);
});
