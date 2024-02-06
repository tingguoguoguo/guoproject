// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
import UserRole from '@/enums/UserRole'

// 和番茄鐘不一樣，改成setup的寫法原本的state改成ref和reactive，
// actions改成functions、getters改成computed

// pinia的store存使用者登入後的資料
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const role = ref(UserRole.USER)

  // 把使用者登入後的資料存到ref的function
  const login = (data) => {
    token.value = data.token
    account.value = data.account
    email.value = data.email
    role.value = data.role
  }

  return {
    token,
    account,
    email,
    role,
    login
  }
})
