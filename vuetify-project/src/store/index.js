// Utilities
// pinia的設定檔
import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate' // 保存pinia狀態的插件

const pinia = createPinia()
pinia.use(persistedstate)
export default pinia
