<template>
  <div class="max-w-md mx-auto bg-gray-50 min-h-screen p-4">
    <WalletHeader />
    <WalletBalance :balance="balance" :updatedAt="updatedAt" />
    <WalletActions />
    <WalletTransactions :transactions="transactions" />
  </div>
</template>

<script setup lang="ts">
import WalletHeader from "~/components/dashboard/WalletStatus.vue";
import WalletBalance from "~/components/dashboard/WalletBalance.vue";
import WalletActions from "~/components/dashboard/WalletActions.vue";
import WalletTransactions from "~/components/dashboard/WalletTransactions.vue";

const layoutProps = useState("layout-props");
layoutProps.value = {
  title: "Wallet Indonesia",
};
const isLoading = ref(false);

const { fetchWallet, balance } = useWallet();
const { fetchTransactions, transactions } = useTransaction();

const updatedAt = "a few seconds ago";

const fetchAll = async () => {
  isLoading.value = true;
  await fetchWallet();
  await fetchTransactions({ mode: "only-10-items" });
  isLoading.value = false;
};

onMounted(async () => {
  await fetchAll();
});
</script>
