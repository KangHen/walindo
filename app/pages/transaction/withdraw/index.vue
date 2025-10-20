<template>
  <div class="p-4 space-y-4">
    <h1 class="text-lg font-semibold text-gray-800 mb-2">Pilih Metode Penarikan</h1>

    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="m in methods"
        :key="m.code"
        @click="$router.push(m.route)"
        class="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border shadow-sm hover:bg-gray-50 active:bg-gray-100 transition"
      >
        <img :src="m.icon" alt="" class="w-12 h-12 object-contain" />
        <span class="text-sm font-medium text-gray-700 text-center">{{ m.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const methods = [
  {
    code: 'atm',
    name: 'ATM Bersama',
    icon: 'https://upload.wikimedia.org/wikipedia/en/b/bb/ATM_Bersama.png',
    route: '/withdraw/to-bank'
  },
  {
    code: 'localbank',
    name: 'Ke Local Bank',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png',
    route: '/withdraw/to-bank'
  },
  {
    code: 'indomaret',
    name: 'Indomaret',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Indomaret.svg/1024px-Indomaret.svg.png',
    route: '/withdraw/to-agent'
  },
  {
    code: 'alfamart',
    name: 'Alfamart',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/ALFAMART_LOGO_BARU.png',
    route: '/withdraw/to-agent'
  },
  {
    code: 'agen',
    name: 'Agen Mitra',
    icon: 'https://cdn-icons-png.flaticon.com/512/921/921347.png',
    route: '/withdraw/to-agent'
  }
]
</script>
