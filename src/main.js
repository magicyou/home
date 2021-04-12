
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
    createFromIconfontCN
} from '@ant-design/icons-vue'

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2241745_iwyjzan1ky.js', // 在 iconfont.cn 上生成
})

const app = createApp(App);
app.use(IconFont);
app.use(store).use(router).mount('#app')
