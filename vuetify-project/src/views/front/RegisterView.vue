<template>
  <v-container fluid style="background-color: #ffefcf; margin-top=-10px;">
    <v-row class="justify-center">
      <v-col cols="8">
        <h1>註冊</h1>
      </v-col>
      <v-col cols="8">
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field label="帳號" minlength="4" maxlength="20" counter v-model="account.value.value" :error-messages="account.errorMessage.value"></v-text-field>
          <v-text-field label="信箱" type="email" v-model="email.value.value" :error-messages="email.errorMessage.value"></v-text-field>
          <v-text-field label="密碼" minlength="4" maxlength="20" counter type="password" v-model="password.value.value" :error-messages="password.errorMessage.value"></v-text-field>
          <v-text-field label="確認密碼" minlength="4" maxlength="20" counter type="password" v-model="passwordConfirm.value.value" :error-messages="passwordConfirm.errorMessage.value"></v-text-field>
          <br>
          <v-btn type="submit" color="#ad4e00">註冊</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'

const { api } = useApi()

const router = useRouter()
const createSnackbar = useSnackbar()

// 定義註冊表單的資料格式
const schema = yup.object({
  account: yup.string()
    .required('缺少使用者帳號')
    .min(4, '帳號至少4個字')
    .max(20, '帳號最多20個字'),
  email: yup.string()
    .required('缺少使用者信箱')
    // .test(自訂驗證名稱, 錯誤訊息, 驗證函式)
    .test('isEmail', '使用者信箱格式錯誤', (value) => { return validator.isEmail(value) }),
  password: yup.string()
    .required('缺少使用者密碼')
    .min(4, '密碼至少4個字')
    .max(20, '密碼最多20個字'),
  passwordConfirm: yup.string()
    .required('缺少使用者密碼')
    .min(4, '密碼至少4個字')
    .max(20, '密碼最多20個字')
    // .oneOf 只允許符合陣列內其中一個值
    // .oneOf(陣列, 錯誤訊息)
    // .ref('password') 代表這個 schema 的 password 欄位值
    .oneOf([yup.ref('password')], '密碼不一致')
})

// 建立表單，表單的驗證方式綁定為上方的schema
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

// 建立表單欄位，和上方的schema對應
const account = useField('account')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

const submit = handleSubmit(async (values) => {
  try {
    await api.post('/users', {
      account: values.account,
      email: values.email,
      password: values.password
    })
    createSnackbar({
      text: '註冊成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    router.push('/login')
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
