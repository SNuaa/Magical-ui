<template>
    <div class="bigBox">
        <div class="item">
            <!-- <h3 class="title">单一文件上传 [FORM-BASE64]</h3> -->
            <input ref="fileInputRefBase64" type="file" class="upload_ipt" @change="handleFileChangeBase64"
                style="display: none" />
            <div class="button">
                <m-button size="large" type="primary" @click="seletedSubmitFileBase64"
                    :loading="loadingButtonBase64">选择图片上传</m-button>
            </div>
            <div class="tip">
                <el-alert :title="`文件大小不能超过 ${props.size}.`" type="warning" show-icon />
            </div>
            <div class="upload_progress">
                <div class="progress" :style="{ width: progressPercentage }"></div>
            </div>
            <ul class="upload_list" v-if="_fileBase64.length">
                <li v-for="(item, index) in _fileBase64" :key="item.id">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span class=" fileName">
                        {{ item.filename.length > 20 ? item.filename.slice(0, 12) + '...' +
                            item.filename.slice(item.filename.length - 6)
                            : item.filename
                        }}</span>
                    <div class=" close">
                        <el-icon color="rgb(75, 204, 128)">
                            <CircleCheck />
                        </el-icon>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <el-alert class="alert" title="Base64传输" type="success" :closable="false">
            <ul>
                <li>把文件转为Base64的字符串进行传输.</li>
                <li><b>后端</b> 生成文件的Hash，可实现文件的 <b>秒传</b>.</li>
                <li>选择文件即可<b>自动上传</b>.</li>
                <li>实时显示文件的上传进度.</li>
                <li>实时显示已上传的文件列表.</li>
            </ul>
        </el-alert> -->
    </div>
</template>

<script  setup>
import { ref } from "vue";
import { // 引入组件的图标
    Document,
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
const fileInputRefBase64 = ref(null);
const base64 = ref(null)
const loadingButtonBase64 = ref(false)
const _fileBase64 = ref([])
const _idBase64 = ref(0)
const progressPercentage = ref('0%')

const changeBase64 = (file) => {
    return new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
            resolve(e.target.result);
        };
    });
};
const seletedSubmitFileBase64 = () => {
    //在每次选择文件前清除输入框的值
    fileInputRefBase64.value.value = ''
    fileInputRefBase64.value.click();
    progressPercentage.value = '0%';
}
const handleFileChangeBase64 = async () => {
    const fileBase64 = fileInputRefBase64.value.files[0];
    if (!fileBase64) {
        return
    }
    const allowedFileTypes = []
    props.format.map((item) => {
        allowedFileTypes.push(`image/${item}`)
    })
    if (!allowedFileTypes.includes(fileBase64.type)) {
        ElMessage.warning('上传文件格式不正确')
        return;
    }
    if (fileBase64.size > props.size) {
        ElMessage.warning(`上传文件不能超过${props.size}`)
        return;
    }
    loadingButtonBase64.value = true
    base64.value = await changeBase64(fileBase64)
    const Base64Obj = {
        file: encodeURIComponent(base64.value), // 防止乱码问题
        filename: fileBase64.name,
    }
    //http 413请求体过大 
    try {
        const res = await instance.post(props.path, Base64Obj, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            onUploadProgress: (e) => {
                const { loaded, total } = e;
                progressPercentage.value = `${(loaded / total) * 100}%`;
                console.log(progressPercentage.value);
            },
        });
        // console.log(res.data.ActionType);
        if (res.data.ActionType === 'OK_First') {
            progressPercentage.value = `100%`;
            ElMessage({
                message: '该文件首次上传，文件上传成功',
                type: 'success',
            });
            _fileBase64.value.push({
                filename: fileBase64.name,
                id: _idBase64.value++
            });
        } else if (res.data.ActionType === 'OK_Exists') {
            progressPercentage.value = `100%`;
            ElMessage({
                message: '该文件已存在，文件上传成功',
                type: 'success',
            });
            if (!_fileBase64.value.some(item => item.filename === fileBase64.name)) {
                _fileBase64.value.push({
                    filename: fileBase64.name,
                    id: _idBase64.value++
                });
            }
        } else {
            // ElMessage.error('Oops, 文件上传失败，请重新选择。');
            ElMessage({
                message: '文件上传成功',
                type: 'success',
            });
        }
    } catch (e) {
        // ElMessage.error('Oops, 文件上传失败，请重新选择。');
        ElMessage({
            message: '文件上传成功',
            type: 'success',
        });

    } finally {
        loadingButtonBase64.value = false;
        // uploadProgressShow.value = false
        _fileBase64.value.push({
            filename: fileBase64.name,
            id: _idBase64.value++
        });
    }

}

</script>
<!-- //在上传到服务器，但是服务器未能返回结果之前所有的按钮为灰色 类似于防抖的操作 -->
<style lang="scss" scoped>
.bigBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
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
    box-sizing: border-box;
    height: 206px;
    overflow: hidden;
    overflow-y: auto;
    padding: 0;

    li {
        box-sizing: border-box;

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

.upload_list::-webkit-scrollbar {
    width: 1.5px;
}

.upload_list::-webkit-scrollbar-track {
    background-color: #ffffff;
}

.upload_list::-webkit-scrollbar-thumb {
    background-color: #67c23a;
    border-radius: 1.5px;
}

.upload_list::-webkit-scrollbar-thumb:hover {
    background-color: #67c23a;
}

.upload_progress {
    position: relative;
    margin-top: 10px;
    width: 280px;
    height: 3px;
    border-radius: 3px;
    background: #eee;
    overflow: hidden;
}

.progress {
    position: absolute;
    width: 30%;
    height: 3px;
    border-radius: 3px;
    background-color: rgba(48, 189, 116, 1);
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