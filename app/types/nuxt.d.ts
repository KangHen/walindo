export {};

declare module "#app" {
  interface NuxtApp {
    $api: {
      auth: (url: string, body?: any, opts?: any) => Promise<any>;
      get: (url: string, params?: any, opts?: any) => Promise<any>;
      post: (url: string, body?: any, opts?: any) => Promise<any>;
      put: (url: string, body?: any, opts?: any) => Promise<any>;
      delete: (url: string, body?: any, opts?: any) => Promise<any>;
      upload: (url: string, formData: FormData, opts?: any) => Promise<any>;
    };
  }
}

declare module "nuxt/dist/app/nuxt" {
  interface NuxtApp {
    $api: {
      auth: (url: string, body?: any, opts?: any) => Promise<any>;
      get: (url: string, params?: any, opts?: any) => Promise<any>;
      post: (url: string, body?: any, opts?: any) => Promise<any>;
      put: (url: string, body?: any, opts?: any) => Promise<any>;
      delete: (url: string, body?: any, opts?: any) => Promise<any>;
      upload: (url: string, formData: FormData, opts?: any) => Promise<any>;
    };
  }
}
