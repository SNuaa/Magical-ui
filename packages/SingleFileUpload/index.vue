<template>
    <!-- 单文件上传 form-data -->
    <SingleFileUploadFormData v-if="type === 'FormData'" :size="props.size" :format="props.format" :path="props.path" />
    <!-- 单文件上传 form-base64 后端生成hash名 实现文件妙传- -->
    <SingleFileUploadFormBase64 v-if="type === 'FormBase64'" :size="props.size" :format="props.format" :path="props.path" />
    <!-- 单文件上传 文件缩略图 前端生成hash名 -->
    <SingleFileUploadFormBase64Img v-if="type === 'FormBase64Img'" :size="props.size" :format="props.format"
        :path="props.path" />
</template>
<script>
export default {
    name: "mSingleFileUpload",
};
</script>
<script  setup>
import SingleFileUploadFormData from "./components/SingleFileUploadFormData.vue";
import SingleFileUploadFormBase64 from "./components/SingleFileUploadFormBase64.vue";
import SingleFileUploadFormBase64Img from "./components/SingleFileUploadFormBase64Img.vue";

const props = defineProps({
    type: {
        type: String,
        default: "FormData",
    },
    size: {
        type: String,
        default: "2MB",
    },
    format: {
        type: Array,
        default: ['png', 'jpg', 'jpeg'],
    },
    path: {
        type: String,
        default: "",
    },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>