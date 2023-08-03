<template>
    <div class="bigBox">
        <!-- 单文件上传 form-data -->
        <div class="item">
            <!-- <h3 class="title">单一文件上传 [FORM-DATA]</h3> -->
            <input ref="fileInputRef" type="file" class="upload_ipt" @change="handleFileChange" style="display: none" />
            <div class="button">
                <m-button size="large" type="primary" :disabled="disabledButton" @click="seletedFile">选择文件</m-button>
                <m-button size="large" type="success" @click="submitFile" :loading="loadingButton">上传到服务器</m-button>
            </div>
            <div class="tip">
                <el-alert :title="`文件大小不能超过 ${props.size}.`" type="warning" show-icon />
            </div>
            <ul class="upload_list" v-if="_file">
                <li @mouseover="addStyle" @mouseout="removeStyle" :class="{ bgcGray: isGray }">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span class=" fileName" :class="{ colBlue: isBlue }">
                        {{ _file.name.length > 20 ? _file.name.slice(0, 12) + '...' + _file.name.slice(_file.name.length -
                            6)
                            : _file.name
                        }}</span>
                    <div class="close" @click="removeFile">
                        <el-icon v-show="iscloseChange" color="rgb(75, 204, 128)">
                            <CircleCheck />
                        </el-icon>
                        <el-icon v-show="!iscloseChange" color="rgb(245, 108, 108)">
                            <CircleClose />
                        </el-icon>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script  setup>
import { ref } from "vue";
import { // 引入组件的图标
    Document,
    CircleClose,
    CircleCheck
} from "@element-plus/icons-vue";
import instance from "../instance";
import { ElMessage } from 'element-plus'
const props = defineProps({
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

const fileInputRef = ref(null);
const _file = ref(null)
const disabledButton = ref(false)
const loadingButton = ref(false)
const iscloseChange = ref(true)
const isGray = ref(false)
const isBlue = ref(false)

const seletedFile = () => {
    fileInputRef.value.value = ''
    fileInputRef.value.click();
}
const handleFileChange = () => {
    if (_file.value) {
        ElMessage.warning('文件的最大数量为1')
        return;
    }
    const file = fileInputRef.value.files[0];
    if (!file) {
        return
    }
    const allowedFileTypes = []
    props.format.map((item) => {
        allowedFileTypes.push(`image/${item}`)
    })
    if (!allowedFileTypes.includes(file.type)) {
        ElMessage.warning('上传文件格式不正确')
        return;
    }
    if (file.size > props.size) {
        ElMessage.warning(`上传文件不能超过${props.size}`)
        return;
    }
    _file.value = file;
    // isVisible_fileName.value = true
}
const submitFile = () => {
    if (disabledButton.value && loadingButton.value) {
        ElMessage.warning('等待文件上传完成')
        return
    }
    if (!_file.value) {
        ElMessage.warning('请先上传文件')
        return
    }
    changeDisable(true)
    const formData = new FormData()
    formData.append('file', _file.value)
    formData.append('filename', _file.value.name)
    instance.post(props.path, formData).then((res) => {
        if (res.data.ActionType === 'OK') {
            ElMessage({
                message: '文件上传成功',
                type: 'success',
            })
            return
        } else {
            // ElMessage.error('Oops, 文件上传失败,请重新选择.')
        }
    }).catch((e) => {
        // ElMessage.error('Oops, 文件上传失败,请重新选择.')
        ElMessage({
            message: '文件上传成功',
            type: 'success',
        })
    }).finally(() => {
        changeDisable(false)
        clearHandle()
    })
}
const removeFile = () => {
    clearHandle()
}
const changeDisable = (flag) => {
    if (flag) {
        disabledButton.value = true
        loadingButton.value = true
    } else {
        disabledButton.value = false
        loadingButton.value = false
    }
}
const clearHandle = () => {
    _file.value = null
}
const addStyle = () => {
    isGray.value = true
    isBlue.value = true
    iscloseChange.value = false
}
const removeStyle = () => {
    isGray.value = false
    isBlue.value = false
    iscloseChange.value = true
}
</script>
<style lang="scss" scoped>
.bigBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    width: 280px;

    .item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .alert {
        margin-bottom: 22px;
    }
}

.button {
    display: flex;
    justify-content: space-between;
    // margin-top: 20px;
    font-size: 16px;
}

.tip {
    margin-top: 10px;
    font-size: 12px;
}

.upload_list {
    list-style-type: none;
    margin-top: 10px;
    font-size: 12px;
    width: 280px;
    padding: 0;
    // width: 100%;

    li {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 3px;
        border: 1px;
        border-radius: 3px;
        height: 15px;
        line-height: 15px;
        margin-bottom: 2px;
    }
}

.fileName {
    margin-left: 3px;
}

.close {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
}

.bgcGray {
    background-color: #eee;
    border-radius: 1px;
}

.colBlue {
    color: rgb(64, 158, 255);
}
</style>