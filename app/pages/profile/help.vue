<template>
  <div class="max-w-md mx-auto mt-4 space-y-5">
    <section class="bg-white rounded-2xl shadow-md divide-y divide-gray-100">
      <Accordion v-if="!isLoading" multiple :value="activePanels">
        <AccordionPanel
          v-for="(item, index) in faqs"
          :key="index"
          :value="index.toString()"
        >
          <AccordionHeader>
            <div class="flex items-center gap-2">
              <i class="pi pi-question-circle text-green-600 text-lg"></i>
              <span class="text-gray-800 font-medium">{{ item.title }}</span>
            </div>
          </AccordionHeader>
          <AccordionContent>
            <p class="text-gray-600 leading-relaxed">
              {{ item.description }}
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      <div v-if="isLoading" class="w-full flex justify-center py-10">
        <Skeleton shape="circle" size="3rem" class="mb-4"></Skeleton>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import Skeleton from "primevue/skeleton";

import { useFaq } from "~/composables/useFaq";

const layoutProps = useState("layout-props");
layoutProps.value = {
  title: "Help Center",
  showBackButton: true,
};

const isLoading = ref(false);
const activePanels = ref<string[]>([]);
const { fetchFaqs, faqs } = useFaq();

onMounted(async () => {
  isLoading.value = true;
  await fetchFaqs();
  isLoading.value = false;
});
</script>
