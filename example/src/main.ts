import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import FhComponents from '@fh/components'

const app = createApp(App)
app.use(FhComponents)
app.mount('#app')
console.log(app)
