import { createApp } from 'vue'
import App from './App.vue'
import RouterIndex from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import btn from '@/config/button-auto-lose-focus'

const app = createApp(App)
app.use(RouterIndex)
app.use(ElementPlus)
app.use(btn)
app.mount('#app')
