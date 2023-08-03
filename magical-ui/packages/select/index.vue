<template>
  <div :class="[selectClass, customClass]" :style="[
    customClass ? {} : { width: parseInt(width) < 100 ? '100px' : width },
  ]" v-click-outside>
  
    <div :class="selectInputClass">
      <input type="text" :readonly="!searchable" :placeholder="selVal == '' ? placeholder : selVal"
        :style="[customClass ? {} : customStyle]" :class="[selVal == '' ? 'mzl-select-input' : 'mzl-select-input-value']"
        :disabled="disabled" @input="input" :value="selVal" />
      <i :class="iconClass" :style="[{ transform: rotate }, fixIcon]"></i>
    </div>

    <transition name="slide-fade">
      <div class="mzl-select-option" v-if="isShow">
        <div class="mzl-select-option-find">
          <ul>
            <li class="mzl-select-option-li" v-for="(item, index) in optionsData" :key="index"
              @click="selChange(item, index)" :class="{
                'mzl-select-active':
                  activeIndex == index ||
                  selVal == item[labelFiled] ||
                  item.selected,
                'mzl-select-disabled': item.disabled,
              }">
              {{ item[labelFiled] }}
              <i class="iconfont m-icon-select-bold" v-if="multiple && item.selected"></i>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "mSelect",
};
</script>
<script setup>
import {
  ref,
  computed,
  reactive,
  onMounted,
  watch,
  nextTick,
  onUpdated,
} from "vue";
const emit = defineEmits(["update:modelValue", "change"]);
const props = defineProps({
  modelValue: String | Array,
  placeholder: String,
  customClass: String,
  disabled: Boolean,
  searchable: Boolean,
  size: {
    type: String,
    default: "default",
  },
  width: {
    type: String,
    default: "260px",
  },
  height: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => {
      return [];
    },
  },
  //默认需要显示的label字段
  labelFiled: {
    type: String,
    default: "label",
  },
  //默认需要显示的value字段
  valueFiled: {
    type: String,
    default: "value",
  },
  multiple: Boolean,
});
props.options.forEach((item, index) => {
  if (!props.multiple) {
    item.selected = false;
  } else {
    props.modelValue.forEach((item1, index1) => {
      if (item[props.valueFiled] == item1) {
        item.selected = true;
      }
    });
    console.log();
  }
});

const activeIndex = ref(-1);
const isShow = ref(false);
const rotate = ref("rotate(0deg)");
const optionsData = ref(props.options || []);
const selVal = ref(
  props.multiple
    ? props.modelValue
    : props.modelValue != ""
      ? props.options.filter((item) => {
        return item[props.valueFiled] == props.modelValue;
      })[0][props.labelFiled]
      : ""
);
/*1.增加选择框width和height属性的大小限制 高度最小是25px,width属性最小是100px
 *2.动态计算下拉图标的行高
 */
const fixIcon = reactive({});

// icon class
const iconClass = computed(() => {
  return ["select-icon iconfont m-icon-arrow-down"];
});

//根据自定义的组件尺寸适配组件里面的下拉框相对位置以及图标居中
const customStyle = computed(() => {
  let styles = {};
  if (props.height) {
    let height = parseInt(props.height) < 25 ? "25px" : props.height;
    styles.height = height;
    fixIcon.lineHeight = height;
    fixIcon.top = 0;
    fixIcon.height = "100%";
  }
  return styles;
});

// selece class
const selectClass = computed(() => {
  return [
    `mzl-select-${props.size}`,
    props.disabled ? `mzl-select-${props.size}-disabled` : "",
  ];
});
// select input class
const selectInputClass = computed(() => {
  return [
    "mzl-select-input-box",
    `mzl-select-input-${props.size}`,
    props.disabled ? `mzl-select-input-${props.size}-disabled` : "",
  ];
});
const blur = (e) => {
  isShow.value = false;
  rotate.value = "rotate(0deg)";
};

const input = (e) => {
  selVal.value = e.target.value;
  optionsData.value = [];
  let filterList = props.options.filter((item) => {
    return item[props.labelFiled].indexOf(e.target.value) != -1;
  });
  filterList.forEach((item, index) => {
    optionsData.value.push(item);
  });
};
const vClickOutside = {
  beforeMount(el) {
    let handler = (e) => {
      if (!props.disabled) {
        if (!props.multiple) {
          if (
            el.contains(e.target) &&
            e.target.className.indexOf("mzl-select-option-li") == -1
          ) {
            if (!isShow.value) {
              isShow.value = !isShow.value;
              if (isShow.value) {
                rotate.value = "rotate(180deg)";
              } else {
                rotate.value = "rotate(0deg)";
              }
            }
          } else {
            if (isShow.value) {
              blur();
            }
          }
        } else {
          if (el.contains(e.target)) {
            if (!isShow.value) {
              isShow.value = !isShow.value;
              if (isShow.value) {
                rotate.value = "rotate(180deg)";
              } else {
                rotate.value = "rotate(0deg)";
              }
            }
          } else {
            if (isShow.value) {
              blur();
            }
          }
        }
      }
    };
    el.handler = handler;
    if (typeof document !== "undefined") {
      document.addEventListener("click", handler);
    }
  },
  unmounted(el) {
    if (typeof document !== "undefined") {
      document.removeEventListener("click", el.handler);
    }
  },
};
// 选择事件
let labels = [];
let indexs = [];
const selChange = (item, index) => {
  if (!props.multiple) {
    if (!item.disabled) {
      activeIndex.value = index;
      selVal.value = item[props.labelFiled];
      emit("update:modelValue", item[props.valueFiled]);
      emit("change", { lable: item.label, value: item.value, index: index });
      blur();
    }
  } else {
    if (!item.disabled) {
      Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };
      item.selected = !item.selected;
      if (item.selected) {
        selVal.value.push(item[props.valueFiled]);
        labels.push(item.label);
        indexs.push(index);
      } else {
        selVal.value.splice(selVal.value.indexOf(item[props.valueFiled]), 1);
        labels.splice(labels.indexOf(item.label), 1);
        indexs.splice(indexs.indexOf(index), 1);
      }
      emit("update:modelValue", selVal.value);
      emit("change", { lable: labels, value: selVal.value, index: indexs });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
