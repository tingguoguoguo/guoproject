// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
import { useApi } from '@/composables/axios'

// 和番茄鐘不一樣，改成setup的寫法原本的state改成ref和reactive，
// actions改成functions、getters改成computed

// pinia的store存使用者登入後的資料
export const useUserStore = defineStore('user', () => {
  const { apiAuth } = useApi()
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

  // 判斷使用者是否為登入狀態
  const isLogin = computed(() => {
    return token.value.length > 0
  })

  // 判斷使用者是否為管理員
  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })

  const getProfile = async () => { // 用來取得使用者的資料
    if (token.value.length === 0) return

    try {
      const { data } = await apiAuth.get('/users/me') // 向後端發送請求，data為後端controllers getProfile的回傳值
      login(data.result)
    } catch (error) {
      console.log(error)
      logout()
    }
  }

  const logout = () => { // 登出後清空資料
    token.value = ''
    account.value = ''
    email.value = ''
    role.value = UserRole.USER
  }

  return {
    token,
    account,
    email,
    role,
    login,
    isLogin,
    isAdmin,
    getProfile
  }
}, {
  persist: { // 保存pinia狀態的插件，設定儲存的key和paths
    key: 'guoproject',
    paths: ['token']
  }
})
