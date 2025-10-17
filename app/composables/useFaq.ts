// composables/useFaq.ts
import { FaqService } from "~/services/faq.service";

export const useFaq = () => {
  const faqStore = useFaqStore();
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);

  const fetchFaqs = async () => {
    loading.value = true;
    errorMessage.value = null;

    try {
      const response = await FaqService.getAll();

      if (response?.success && response?.data) {
        faqStore.setFaqs(response.data);
      } else {
        throw new Error("Error fetching FAQs");
      }
    } catch (err: any) {
      errorMessage.value = err.message || "Fetching FAQs failed";
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchFaqs,
    faqs: computed(() => faqStore.faqs),
    loading,
    errorMessage,
  };
};
