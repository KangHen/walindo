<template>
  <div class="p-4 max-w-md mx-auto bg-white min-h-screen">
    <div class="flex items-center mb-4">
      <Button icon="pi pi-arrow-left" class="p-button-text mr-2" @click="router.back()" />
      <h2 class="text-lg font-semibold">Transfer</h2>
    </div>
    <TabView v-model:activeIndex="activeTab" class="rounded-xl overflow-hidden shadow-sm">
      <TabPanel :value="0" header="Bank">
        <TransferFormBank />
      </TabPanel>
      <TabPanel :value="1" header="Nomor HP">
        <TransferFormPhone />
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TransferFormBank from '~/components/transfer/TransferFromBank.vue'
import TransferFormPhone from '~/components/transfer/TransferFromPhone.vue'
const layoutProps = useState('layout-props')
layoutProps.value = {
  title: 'Transaction',
}

const router = useRouter()
const activeTab = ref(0)
</script>
