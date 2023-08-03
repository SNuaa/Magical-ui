<template>
  <div :class="[`mzl-radio-${size}`, customClass]">
    <label v-for="(item, index) in options" :key="index"
      :class="[{ 'mzl-radio-active': modelVal == item[valueFiled] }, item.disabled ? modelVal == item[valueFiled] ? 'mzl-radio-active-disabled' : 'mzl-radio-disabled' : '']"
      @click="change(item, index)"
      :style="{ 'display': inline ? 'inline-block' : 'table', 'margin-bottom': inline ? '0' : size == 'small' ? '8px' : size == 'mini' ? '6px' : '10px' }">
      <span class="mzl-radio-round"
        :style="{ 'border-color': customColor == '' ? '' : item.disabled ? '' : modelVal != item[valueFiled] ? '' : customColor, 'background': customColor == '' ? '' : item.disabled ? '' : modelVal != item[valueFiled] ? '' : customColor }"></span>
      <span
        :style="{ 'color': customColor == '' ? '' : item.disabled ? '' : modelVal != item[valueFiled] ? '' : customColor }">{{
          item[labelFiled] }}</span>
    </label>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
  name: "mRadio"
}
</script>
<script setup>
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: String | Number,
  size: {
    type: String,
    default: 'default'
  },
  options: {
    type: Array,
    default: () => {
      return []
    }
  },
  labelFiled: {
    type: String,
    default: "label"
  },
  valueFiled: {
    type: String,
    default: "value"
  },
  customColor: String,
  customClass: String,
  inline: {
    type: Boolean,
    default: true
  },
})
const modelVal = ref(props.modelValue || '')
const change = (item, index) => {
  if (!item.disabled) {
    modelVal.value = item[props.valueFiled]
    emit('update:modelValue', item[props.valueFiled])
    emit('change', { "value": item[props.valueFiled], "index": index })
  }

}
const radioIndex = ref(0)
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>