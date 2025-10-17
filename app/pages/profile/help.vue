<template>
  <div class="max-w-md mx-auto mt-4 space-y-5">
    <section class="bg-white rounded-2xl shadow-md divide-y divide-gray-100">
      <Accordion multiple :value="activePanels">
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
    </section>
  </div>
</template>
<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import { useFaq } from "~/composables/useFaq";

const layoutProps = useState("layout-props");
layoutProps.value = {
  title: "Help Center",
  showBackButton: true,
};
const activePanels = ref<string[]>([]);
const { fetchFaqs, faqs } = useFaq();

onMounted(async () => {
  await fetchFaqs();
});
</script>
