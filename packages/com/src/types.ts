import { withDefaults, defineProps } from 'vue'

export interface ComProps {
    msg?: string
}
export const props = withDefaults(defineProps<ComProps>(), {
  msg: ''
})
