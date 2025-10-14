// store/auth.store.ts
import { defineStore } from "pinia";
import type { User } from "~/types/models/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setAuth(token: string, user: any) {
      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },

    setUser(user: any) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    loadAuthFromStorage() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
