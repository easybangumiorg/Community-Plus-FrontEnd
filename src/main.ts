import 'mdui/mdui.css'
import './assets/main.scss'
import 'mdui'
import { setColorScheme } from 'mdui';
setColorScheme('#c2e7ff')
import '@/shared/icons'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(createPersistedState({
    storage: localStorage,
    auto: true,
}))

app.use(pinia)
app.use(router)

app.mount('#app')
