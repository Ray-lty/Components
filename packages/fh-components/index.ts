import { App } from 'vue'
import Com from '@fh-components/com'
import '../scss/index.scss'
import Qq from '@fh-components/qq'
// notes for cli
const components = [Co,
  Qq
] // components

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default {
  install
}
