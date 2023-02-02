import { createApp } from 'vue'
import App from './App.vue'
import FhIcon from '@fh/components/icon'
const app = createApp(App)
app.use(FhIcon)
app.mount("#app")