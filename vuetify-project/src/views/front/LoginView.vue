<template>
  <v-container fluid style="background-color: #ffefcf; margin-top=-10px;">
    <v-row class="justify-center">
      <v-col cols="8">
        <h1>登入</h1>
      </v-col>
      <v-col cols="8">
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field label="帳號" minlength="4" maxlength="20" counter v-model="account.value.value" :error-messages="account.errorMessage.value"></v-text-field>
          <v-text-field label="密碼" minlength="4" maxlength="20" counter type="password" v-model="password.value.value" :error-messages="password.errorMessage.value"></v-text-field>
          <br>
          <v-btn type="submit" color="#ad4e00">登入</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'

const { api } = useApi()

const router = useRouter()
const createSnackbar = useSnackbar()
const { user } = useUserStore()

// 定義註冊表單的資料格式
const schema = yup.object({
  account: yup.string()
    .required('缺少使用者帳號')
    .min(4, '帳號至少4個字')
    .max(20, '帳號最多20個字'),
  password: yup.string()
    .required('缺少使用者密碼')
    .min(4, '密碼至少4個字')
    .max(20, '密碼最多20個字')
})

// 建立表單，表單的驗證方式綁定為上方的schema
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

// 建立表單欄位，和上方的schema對應
const account = useField('account')
const password = useField('password')

const submit = handleSubmit(async (values) => { // values為表單的資料
  try {
    // 把後端回傳的資料存到data
    const { data } = await api.post('/users/login', {
      account: values.account, // 把表單的帳號密碼傳到後端驗證，並且存到data
      password: values.password
    })
    user.login(data) // 將後端回傳的資料（可能包含使用者資訊或登入 token）存到 user store
    createSnackbar({
      text: '登入成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    router.push('/')
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
})

</script>

<style>
h1{
  color:#ad4e00;
}
</style>
