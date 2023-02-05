import { App, Plugin, defineComponent } from 'vue'

type Com = ReturnType<typeof defineComponent> & Plugin;
export const withInstall = (component: Com) => {
  component.install = (app: App) => {
    app.component(component.name, component)
  }
  return component
}
