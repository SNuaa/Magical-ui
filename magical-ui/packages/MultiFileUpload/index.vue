<template>
    <div class="bigBox">
        <div class="item">
            <!-- <h3 class="title">多文件上传 [FORM-DATA]</h3> -->
            <input ref="fileInputRef" type="file" multiple class="upload_ipt" @change="handleFileChange"
                style="display: none" />
            <div class="button">
                <m-button size="large" type="primary" :disabled="disabledButton" @click="seletedFile">选择文件</m-button>
                <m-button class="button2" size="large" type="success" @click="submitFile"
                    :loading="loadingButton">上传到服务器</m-button>
            </div>
            <div class="table">
                <el-table :data="filesAll" height="190" style="width: 100%">
                    <el-table-column prop="filename" label="文件名" width="180" />
                    <el-table-column align="center" prop="filesize" label="文件大小" width="100" />
                    <el-table-column align="center" label="上传进度" width="550">
                        <template #default="scope">
                            <el-progress color="rgba(48, 189, 116, 2)" :percentage="scope.row.filestates" />
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="200">
                        <template #default="scope">
                            <el-button size="small" type="danger" :icon="Delete" circle @click="handleDelete(scope.row)" />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "mMultiFileUpload",
};
</script>
<script  setup>
import { ref } from "vue";
import { // 引入组件的图标
    Delete
} from "@element-plus/icons-vue";
import instance from "./instance";
import { ElMessage } from 'element-plus'
const props = defineProps({
    path: {
        type: String,
        default: "",
    },
});
const fileInputRef = ref(null);
let files = ref([])
let filesAll = ref([])
const disabledButton = ref(false)
const loadingButton = ref(false)
const createRandom = () => {
    let ran = Math.random() * new Date()
    return ran.toString(16).replace('.', '')
}
const seletedFile = () => {
    fileInputRef.value.value = ''
    fileInputRef.value.click();
}
const handleFileChange = async () => {
    files.value = Array.from(fileInputRef.value.files)
    if (files.value.length === 0) {
        return
    }
    disabledButton.value = true
    files.value = files.value.map((file) => {
        return {
            file,
            filefullname: file.name,
            filename: file.name.length > 30 ? file.name.slice(0, 20) + '...' + file.name.slice(file.name.length - 6)
                : file.name,
            filesize: file.size,
            filestates: 0,
            id: createRandom(),
        }
    })
    filesAll.value.push(...files.value);
    disabledButton.value = false
}
const submitFile = async () => {
    // if (disabledButton.value && loadingButton.value) {
    //     ElMessage.warning('等待文件上传完成')
    //     return
    // }
    if (filesAll.value.length === 0) {
        ElMessage.warning('请先选择文件')
        return
    }
    changeDisableImg(true)
    try {
        const _filesAll = filesAll.value.map(async (file) => {
            const formData = new FormData()
            formData.append('file', file.file)
            formData.append('filename', file.filefullname)
            const res = await instance.post(props.path, formData, {
                onUploadProgress: (e) => {
                    const { loaded, total } = e;
                    //避免进度条回退
                    file.filestates = Math.max(Number(`${(loaded / total) * 100}`), file.filestates);
                    // file.filestates = Number(`${(loaded / total) * 100}`);
                },
            })
            if (res.data.ActionType === 'OK_First') {
                file.filestates = 100;
                return res.data
            } else if (res.data.ActionType === 'OK_Exists') {
                file.filestates = 100;
                return res.data
            } else {
                ElMessage.error('Oops, 文件上传失败，请重新选择。');
            }
        })
        // Promise.all(_filesAll).then((res) => {
        // ElMessage({
        //     message: '文件全部上传成功',
        //     type: 'success',
        // });
        // changeDisableImg(false)
        // });
    } catch {
        ElMessage.error('Oops, 文件上传失败，请重新选择。');
    }
    setTimeout(() => {
        ElMessage({
            message: '文件全部上传成功',
            type: 'success',
        });
        changeDisableImg(false)
    }, 1000)
}
const handleDelete = (deletefile) => {
    filesAll.value = filesAll.value.filter((file) => {
        return file.id !== deletefile.id
    })
}
const changeDisableImg = (flag) => {
    if (flag) {
        disabledButton.value = true
        loadingButton.value = true
    } else {
        disabledButton.value = false
        loadingButton.value = false
    }
}

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>