import { Config } from '../config'
import { ComponentInfo } from '../domain/component-info'

export const vueTemplate = (
  lineNameWithPrefix: string,
  lowCamelName: string
): string => {
  return `<script lang="ts" setup name="${lineNameWithPrefix}">
import { withDefaults } from 'vue'
interface ${lowCamelName} {}

const props = withDefaults(defineProps<${lowCamelName}>(), {})

</script>
<template>
  <div class="${lineNameWithPrefix}">
    ${lineNameWithPrefix}
  </div>
</template>

<style scoped lang="scss">
.${lineNameWithPrefix} {}
</style>
`
}

export const indexTemplate = (componentInfo: ComponentInfo) => {
  const { upCamelName, lineName } = componentInfo
  return `import ${upCamelName} from './src/${lineName}.vue'
import { withInstall } from '@${Config.COMPONENT_LIB_NAME}/utils'
  
const ${lineName}Install = withInstall(${upCamelName})
  
export default ${lineName}Install
`
}
