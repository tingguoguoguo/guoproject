<template>
  <!-- 手機板側欄 -->
  <v-navigation-drawer v-model="drawer" temporary location="left" v-if="isMobile">
    <v-list nav>
      <template v-for="item in navItems" :key="item.to">
        <v-list-item :to="item.to">
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
          <v-btn :to="item.to" :prepend-icon="item.icon">
            {{ item.text }}
          </v-btn>
        </template>
      </template>
    </v-container>
  </v-app-bar>
  <!-- 頁面內容 -->
  <v-main>
    <v-banner class="my-banner pa-0">
      <v-img src="../assets/banner.png" alt="Banner Image"></v-img>
    </v-banner>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'

// 手機版判斷
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// 手機板側欄開關
const drawer = ref(false)

// 導覽列項目
const navItems = [
  { to: '/register', text: '註冊', icon: 'mdi-account-plus' },
  { to: '/login', text: '登入', icon: 'mdi-login' }
]
</script>

<style scoped>
.my-banner{
  border-bottom: none;
}
</style>
