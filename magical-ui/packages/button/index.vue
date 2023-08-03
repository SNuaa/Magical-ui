<template>
    <button :class="isClass" :style="styles">
        <i :class="isIconClass" v-if="leftIcon"></i>
        <span :style="{
            'margin-left':
                $slot['default'] == undefined ? '0px' : leftIcon ? '4px' : '0px',
            'margin-right':
                $slot['default'] == undefined ? '0px' : rightIcon ? '4px' : '0px',
        }">
            <slot />
        </span>
        <i :class="isIconClass" v-if="rightIcon"></i>
    </button>
</template>
<script>
export default {
    name: "mButton",
};
</script>
<script setup>
import { computed, useSlots } from "vue";
const props = defineProps({
    type: {
        type: String,
        default: "default",
    },
    disabled: Boolean,
    round: Boolean,
    size: {
        type: String,
        default: "default",
    },
    customColor: {
        type: String,
        default: "",
    },
    leftIcon: String,
    rightIcon: String,
    localing: Boolean,
});
const mBtnDeaultStyle = {
    background: props.customColor,
    border: props.customColor,
    color: "#fff",
};
const $slot = useSlots();
const isClass = computed(() => {
    return [
        props.size == "default"
            ? "mzl-button"
            : props.size == "medium"
                ? "mzl-button-medium"
                : props.size == "small"
                    ? "mzl-button-small"
                    : props.size == "mini"
                        ? "mzl-button-mini"
                        : "mzl-button",
        props.type ? (props.disabled ? "" : `mzl-button-${props.type}`) : "",
        props.disabled ? `mzl-button-${props.type}-disabled` : "",
        {
            "mzl-button-round": props.round,
        },
    ];
});
const isIconClass = computed(() => {
    return [
        "iconfont",
        props.leftIcon || props.rightIcon,
        props.localing
            ? props.leftIcon == "m-icon-loading1" ||
                props.leftIcon == "m-icon-loading2" ||
                props.leftIcon == "m-icon-loading3" ||
                props.leftIcon == "m-icon-loading4" ||
                props.leftIcon == "m-icon-loading5" ||
                props.leftIcon == "m-icon-loading6" ||
                props.rightIcon == "m-icon-loading1" ||
                props.rightIcon == "m-icon-loading2" ||
                props.rightIcon == "m-icon-loading3" ||
                props.rightIcon == "m-icon-loading4" ||
                props.rightIcon == "m-icon-loading5" ||
                props.rightIcon == "m-icon-loading6"
                ? "mzl-icon-loading"
                : ""
            : "",
    ];
});
const styles = computed(() => {
    return [
        props.customColor == ""
            ? {}
            : props.type == "default"
                ? {}
                : mBtnDeaultStyle,
    ];
});
</script>
<style>
@import url("../../styles/iconfont.css");
@import url("../../styles/main.css");
</style>

<style scoped lang="scss">
@import "./index.scss";
</style>