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
      console.log("[fetch response]", request, response.status, response.body);
    },

    async onResponseError({ request, response, options }) {
      if (response.status === 401) {
        navigateTo("/login");
      }

      console.error("[fetch error]", request, response.status, response.body);
    },
  });

  const api = {
    async auth(url: string, body?: any, opts?: any) {
      localStorage.removeItem("token");

      try {
        const data = await instance(url, { method: "POST", body, ...opts });
        return { success: true, data };
      } catch (err: any) {
        return handleApiError(err);
      }
    },

    async get(url: string, params?: any, opts?: any) {
      try {
        const data = await instance(url, { method: "GET", params, ...opts });
        console.log(data);

        return { success: true, data };
      } catch (err: any) {
        return handleApiError(err);
      }
    },

    async post(url: string, body?: any, opts?: any) {
      try {
        const data = await instance(url, { method: "POST", body, ...opts });
        return { success: true, data };
      } catch (err: any) {
        return handleApiError(err);
      }
    },

    async put(url: string, body?: any, opts?: any) {
      try {
        const data = await instance(url, { method: "PUT", body, ...opts });
        return { success: true, data };
      } catch (err: any) {
        return handleApiError(err);
      }
    },

    async delete(url: string, body?: any, opts?: any) {
      try {
        const data = await instance(url, { method: "DELETE", body, ...opts });
        return { success: true, data };
      } catch (err: any) {
        return handleApiError(err);
      }
    },

    async upload(url: string, formData: FormData, opts?: any) {
      try {
        const data = await instance(url, {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
          ...opts,
        });
        return { success: true, data };
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
