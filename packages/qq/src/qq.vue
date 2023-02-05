<script lang="ts" setup name="fh-qq">
import { withDefaults } from 'vue'
interface qq {}

const props = withDefaults(defineProps<qq>(), {})

</script>
<template>
  <div class="fh-qq">
    fh-qq
  </div>
</template>

<style scoped lang="scss">
.fh-qq {}
</style>
