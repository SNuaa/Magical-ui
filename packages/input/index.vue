<template>
  <div :class="[`mzl-group-input-${size}`]" :style="{ 'min-width': 'auto' }">
    <div :class="isClass" :style="isStyle" style="">
      <i :class="['left-icon', 'iconfont', leftIcon]" v-if="!showPassword && leftIcon != ''"></i>
      <input :type="inptype" @focus="focus" @blur="blur" :value="modelValue" @input="iptChange" :disabled="disabled"
        @change="change" :placeholder="placeholder" :autofocus="autofocus" :readonly="readonly" :form="form" />
      <transition name="slide-fade">
        <i class="clearable-icon iconfont m-icon-close" v-if="!showPassword && clearable && modelValue != ''"
          @click="clear"></i>
      </transition>
      <i :class="['right-icon', 'iconfont', rightIcon]" v-if="!showPassword && rightIcon != ''"></i>
      <i v-if="showPassword" :class="['password-icon', 'iconfont m-icon-browse']" @click="showPwd(type)"></i>
    </div>
    <slot name="btn" />
  </div>
</template>
<script>
import { reactive, ref, computed, useSlots } from 'vue'
export default {
  name: "mInput"
}
</script>
<script setup>
const emit = defineEmits(['update:modelValue', 'clear', 'focus', 'blur', 'input', 'change'])
const props = defineProps({
  modelValue: String | Number,
  disabled: Boolean,
  clearable: Boolean,
  showPassword: Boolean,
  type: String,
  size: {
    type: String,
    default: 'default'
  },
  leftIcon: {
    type: String,
    default: ""
  },
  rightIcon: {
    type: String,
    default: ""
  },
  placeholder: String,
  //当页面加载时 <input> 元素自动获得焦点
  autofocus: Boolean,
  focusColor: {
    type: String,
    default: '#0e80eb'
  },
  readonly: Boolean,
  form: String
})
const slot = useSlots()
const isStyle = ref({})
const inptype = ref(props.type)
let focusStyle = {
  'width': !!slot.btn ? 'auto' : '100%',
  'float': !!slot.btn ? 'left' : 'auto',
  'border-radius': !!slot.btn ? '4px 0 0 4px' : '4px',
  'border-color': '#dcdfe6f6'
}
isStyle.value = focusStyle
const focus = (e) => {
  focusStyle['border-color'] = "#0e80eb"
  isStyle.value = {
    'width': !!slot.btn ? 'auto' : '100%',
    'float': !!slot.btn ? 'left' : 'auto',
    'border-radius': !!slot.btn ? '4px 0 0 4px' : '4px',
    'border-color': props.focusColor
  }
  emit('focus', e)
}
const blur = (e) => {
  isStyle.value = {
    'width': !!slot.btn ? 'auto' : '100%',
    'float': !!slot.btn ? 'left' : 'auto',
    'border-radius': !!slot.btn ? '4px 0 0 4px' : '4px',
  }
  emit('blur', e)
}
const iptChange = (e) => {
  emit('update:modelValue', e.target.value)
  emit('input', e.target.value)
}
const change = (e) => {
  emit('change', e)
}
const clear = (e) => {
  emit('update:modelValue', "")
  emit('clear')
}
// 显示密码
const showPwd = (e) => {
  if (inptype.value == 'text') {
    inptype.value = 'password'
  } else {
    inptype.value = 'text'
  }

  console.log(e);
}
const isClass = computed(() => {
  return [
    props.clearable ? 'mzl-input-clearable' : props.size == 'default' ? 'mzl-input-default' : `mzl-input-${props.size}`,
    props.leftIcon != "" ? `mzl-input-left-icon-${props.size}` : !props.clearable ? props.rightIcon != "" ? `mzl-input-right-icon-${props.size}` : '' : '',
    props.disabled ? 'mzl-input-disabled' : '',
    props.type == 'password' ? props.showPassword ? `mzl-input-password-showpassword-${props.size}` : `mzl-input-password-${props.size}` : ''
  ]
})
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>