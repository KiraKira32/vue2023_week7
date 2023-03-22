import { createApp } from 'vue'

// 匯入 axios
import axios from 'axios'
// 匯入 vue axios
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

// 匯入 Bootstrap
import './assets/all.scss'
// 匯入 Bootstrap 5 的 CSS 和 JavaScript
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js'

import moment from 'moment'

const app = createApp(App)

app.config.globalProperties.$moment = moment
app.use(moment)
app.use(VueAxios, axios)
app.use(router)

app.mount('#app')
