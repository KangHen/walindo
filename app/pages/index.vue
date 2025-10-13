<template>
  <div class="max-w-md mx-auto bg-gray-50 min-h-screen p-4">
    <WalletHeader />
    <WalletBalance :balance="balance" :updatedAt="updatedAt" />
    <WalletActions />
    <WalletTransactions :transactions="transactions" />
  </div>
</template>

<script setup lang="ts">
import WalletHeader from '~/components/dashboard/WalletStatus.vue'
import WalletBalance from '~/components/dashboard/WalletBalance.vue'
import WalletActions from '~/components/dashboard/WalletActions.vue'
import WalletTransactions from '~/components/dashboard/WalletTransactions.vue'
import type { Transaction } from '~/types/models/transaction'

const layoutProps = useState('layout-props')
layoutProps.value = {
  title: 'Wallet Indonesia'
}

const balance = 325000
const updatedAt = "a few seconds ago"

const transactions: Transaction[] = [
  { id: 1, title: "Top Up from BCA", date: "10 Okt 2025", amount: 150000, icon: "pi-wallet" },
  { id: 2, title: "Payment for Kopi Kenangan", date: "9 Okt 2025", amount: -25000, icon: "pi-shopping-bag" },
  { id: 3, title: "Send to DANA", date: "8 Okt 2025", amount: -100000, icon: "pi-send" },
  { id: 4, title: "Cashback Voucher", date: "7 Okt 2025", amount: 5000, icon: "pi-gift" }
]
</script>
