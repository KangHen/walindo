<template>
  <div class="max-w-md mx-auto mt-4 space-y-5">
    <ProfileInfo :user="user" />
    <ProfileMenuList :items="menuItems" />
  </div>
</template>

<script setup lang="ts">
import ProfileInfo from '~/components/profile/ProfileInfo.vue'
import ProfileMenuList from '~/components/profile/ProfileMenuList.vue'
import type { User } from '~/types/models/user'

const layoutProps = useState('layout-props')
layoutProps.value = {
  title: 'Profile'
}

const user = ref(<User>{
  username: 'hend998',
  name: 'Hendri Argadiyanto',
  email: 'hendri@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=12'
})

const menuItems = [
  { label: 'My Profile', icon: 'pi-user-edit', path: '/profile/me' },
  { label: 'Account Verification', icon: 'pi-shield', path: '/profile/verification' },
  { label: 'Settings', icon: 'pi-cog', path: '/settings' },
  { label: 'Help Center', icon: 'pi-question-circle', path: '/help' }
]
</script>
