<!--
 * @Author: zhangxin
 * @Date: 2022-04-29 09:22:25
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-07-26 15:01:07
 * @Description: file content
-->
<script setup>
import { useElementSize } from '@vueuse/core'

const props = defineProps({
  visable: {
    type: Boolean,
    default: false,
  },
  positionStyle: {
    type: Object,
    default: () => ({
      left: 0,
      top: 0,
    }),
  },
  content: {
    type: Array,
    default: () => [],
  },
})

const floatRefs = ref(null)
const { width, height } = useElementSize(floatRefs)

const style = computed(() => {
  const { left, top } = props.positionStyle
  const x = left - unref(width) - unref(width) / 2.5
  const y = top - unref(height) / 2
  return {
    left: `${x}px`,
    top: `${y}px`,
  }
})
</script>

<template>
  <div v-show="visable" ref="floatRefs" class="float-window" :style="style">
    <template v-for="item in content" :key="item.field">
      <div  class="float-window-item">
        <p class="float-window-item-label">
          {{ item.label }}：
        </p>
        <p class="float-window-item-text" :style="item.style">
          {{ item.text }}
        </p>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use './float-window.scss';
</style>
