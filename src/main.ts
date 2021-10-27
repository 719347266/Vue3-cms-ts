import { createApp } from 'vue'
import { globalRegister } from './global'
import App from './App.vue'
import './assets/css/index.less'
import 'normalize.css'

import router from './router'
import store, { setupStore } from './store'

const app = createApp(App)
globalRegister(app)
setupStore()

app.use(router).use(store).mount('#app')
