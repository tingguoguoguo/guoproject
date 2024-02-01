<template>
  <v-banner class="my-banner pa-0">
      <v-img src="../assets/banner.png" alt="Banner Image" style="margin-top:60px;"></v-img>
  </v-banner>
  <v-app-bar color="primary">
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">
        <v-app-bar-title>Day My Days</v-app-bar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-for="item in navItems" :key="item.to" :to="item.to" :prepend-icon="item.icon">
        {{ item.text }}
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup></script>

<style scoped>
.my-banner{
  border-bottom: none;
}
</style>
