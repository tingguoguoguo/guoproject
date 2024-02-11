<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item :prepend-avatar="prependAvatar" :title="user.account"></v-list-item>
    </v-list>
    <v-list>
      <v-list-item v-for="item in navItems" :key="item.to" :to="item.to" :title="item.text" :prepend-icon="item.icon"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { computed } from 'vue'

const user = useUserStore()

const navItems = [
  { to: '/admin/aboutus', text: '關於我們', icon: 'mdi-information-variant' },
  { to: '/admin/recommend', text: '日記推薦', icon: 'mdi-book-open-page-variant' },
  { to: '/admin/userform', text: '用戶回報', icon: 'mdi-account-group' },
  { to: '/', text: '回首頁', icon: 'mdi-home' }
]

const prependAvatar = computed(() => {
  return `https://source.boringavatars.com/beam/120/${user.account}?colors=AD4E00,003A8C,FFEFCF,FFFFFF,FA8C16`
})
</script>
