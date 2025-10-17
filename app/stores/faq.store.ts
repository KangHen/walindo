// stores/faq.store.ts
import { defineStore } from "pinia";
import type { Faq } from "~/types/models";

export const useFaqStore = defineStore("faq", {
  state: () => ({
    faqs: [] as Faq[],
  }),

  actions: {
    setFaqs(faqs: Faq[]) {
      this.faqs = faqs;
    },
  },
});
