<template>
  <v-container fluid style="background-color: #ffefcf; margin-top=-10px;">
    <v-row class="justify-center">
      <v-col cols="8">
        <h1>註冊</h1>
      </v-col>
      <v-col cols="8">
        <v-form>
          <v-text-field label="帳號" minlength="4" maxlength="20" counter></v-text-field>
          <v-text-field label="信箱" type="email"></v-text-field>
          <v-text-field label="密碼" minlength="4" maxlength="20" counter type="password"></v-text-field>
          <v-text-field label="確認密碼" minlength="4" maxlength="20" counter type="password"></v-text-field>
          <v-btn type="submit" color="#ad4e00">註冊</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
h1{
  color:#ad4e00;
}
</style>
