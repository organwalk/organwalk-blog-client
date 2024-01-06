import { createApp } from 'vue'
import App from './App.vue'
import RouterIndex from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import btn from '@/config/button-auto-lose-focus'
import { createPinia } from 'pinia'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// noinspection NpmUsedModulesInstalled
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});
const pinia = createPinia()
const app = createApp(App)
app.use(RouterIndex)
app.use(ElementPlus)
app.use(btn)
app.use(pinia)
app.use(VMdPreview);
app.mount('#app')
