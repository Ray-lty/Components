<template>
  <div class="{NAME}">
    <h1>{{ NAME }}</h1>
    <p class="msg">msg is: {{ props.msg }}</p>
    <el-button type="primary" onClick="{onBtnClick}">点击我</el-button>
  </div>
</template>

<script setup lang='ts' name="Com">
import { withDefaults } from 'vue'
interface ComProps {
    msg?: string
}
const props = withDefaults(defineProps<ComProps>(), {
  msg: ''
})
const NAME: string = 'Com组件'
</script>

<style>
</style>
