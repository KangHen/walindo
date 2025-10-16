<template>
  <div class="max-w-md mx-auto mt-4 space-y-5">
    <ProfileInfo :user="currentUser" />
    <ProfileMenuList :items="menuItems" />
  </div>
</template>

<script setup lang="ts">
import ProfileInfo from "~/components/profile/ProfileInfo.vue";
import ProfileMenuList from "~/components/profile/ProfileMenuList.vue";
import type { User } from "~/types/models/user";

const layoutProps = useState("layout-props");
layoutProps.value = {
  title: "Profile",
};

const { user } = useAuth();
const currentUser: User = user.value as User;

const menuItems = [
  { label: "My Profile", icon: "pi-user-edit", path: "/profile/me" },
  {
    label: "Account Verification",
    icon: "pi-shield",
    path: "/profile/verification",
  },
  { label: "Settings", icon: "pi-cog", path: "/profile/settings" },
  { label: "Help Center", icon: "pi-question-circle", path: "/profile/help" },
];
</script>
