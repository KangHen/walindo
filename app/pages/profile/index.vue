<template>
  <div class="max-w-md mx-auto mt-4 space-y-5">
    <ProfileInfo :name="user.name" :email="user.email" :photo="user.photo" />
    <ProfileMenuList :items="menuItems" />
  </div>
</template>

<script setup lang="ts">
import ProfileInfo from '~/components/profile/ProfileInfo.vue'
import ProfileMenuList from '~/components/profile/ProfileMenuList.vue'

const layoutProps = useState('layout-props')
layoutProps.value = {
  title: 'Profile'
}

const user = {
  name: 'Hendri Argadiyanto',
  email: 'hendri@example.com',
  photo: 'https://i.pravatar.cc/150?img=12'
}

const menuItems = [
  { label: 'Profil Saya', icon: 'pi-user-edit', path: '/profile/me' },
  { label: 'Verifikasi Akun', icon: 'pi-shield', path: '/profile/verification' },
  { label: 'Pengaturan', icon: 'pi-cog', path: '/settings' },
  { label: 'Pusat Bantuan', icon: 'pi-question-circle', path: '/help' }
]
</script>
