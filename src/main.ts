import 'mdui/mdui.css'
import './assets/main.scss'
import 'mdui'
import { setColorScheme } from 'mdui';
setColorScheme('#c2e7ff')

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
