<template>
  <!-- 手機板側欄 -->
  <v-navigation-drawer v-model="drawer" temporary location="left" v-if="isMobile">
    <v-list nav>
      <template v-for="item in navItems" :key="item.to">
        <v-list-item :to="item.to" v-if="item.show">
          <template #prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
  <!-- 導覽列 -->
  <v-app-bar color="primary">
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">
        <v-app-bar-title>Day My Days</v-app-bar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- 手機板導覽列 -->
      <template v-if="isMobile">
        <v-app-bar-nav-icon @click="drawer=true"></v-app-bar-nav-icon>
      </template>
      <!-- 電腦板導覽列 -->
      <template v-else>
        <template v-for="item in navItems" :key="item.to" >
          <v-btn :to="item.to" :prepend-icon="item.icon" v-if="item.show">
            {{ item.text }}
          </v-btn>
        </template>
      </template>
    </v-container>
  </v-app-bar>
  <!-- 頁面內容 -->
  <v-main>
    <v-banner class="my-banner pa-0 bottom-shadow">
      <v-img src="../assets/banner.png" alt="Banner Image"></v-img>
    </v-banner>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'

const user = useUserStore()

// 手機版判斷
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// 手機板側欄開關
const drawer = ref(false)

// 導覽列項目，動態判斷是否為登入狀態
const navItems = computed(() => {
  return [
    { to: '/about', text: '關於我們', icon: 'mdi-moon-waning-crescent', show: true },
    { to: '/recommend', text: '推薦日記', icon: 'mdi-book-open-blank-variant', show: user.isLogin },
    { to: '/personalpage', text: '個人頁面', icon: 'mdi-account-box', show: user.isLogin },
    { to: '/register', text: '註冊', icon: 'mdi-account-plus', show: !user.isLogin },
    { to: '/login', text: '登入', icon: 'mdi-login', show: !user.isLogin },
    { to: '/admin', text: '管理', icon: 'mdi-account-eye-outline', show: user.isLogin && user.isAdmin }
  ]
})
</script>

<style scoped>
.my-banner{
  border-bottom: none;
}
.bottom-shadow{
  box-shadow:0 6px 4px rgba(0,0,0,0.2)
}
</style>
