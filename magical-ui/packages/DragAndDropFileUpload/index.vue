<template>
    <div class="bigBox">
        <div class="item">
            <section class="box" :class="{ enterbox: isEnterBox }" @dragenter="dragenter" @dragleave="dragleave"
                @dragover="dragover" @drop="drop">
                <input @change="handleFileChange" multiple ref="fileInputRef" type="file" accept=".png,.jpg"
                    class="upload_ipt" style="display: none" />
                <div class="drag">
                    <div class="icon">
                        <el-icon class="el-icon--upload" size:><upload-filled /></el-icon>
                    </div>
                    <div class="text">
                        将文件拖拽到此处，或<span class="submit" @click="submit">点击上传</span>
                    </div>
                </div>
                <div class="mark" v-show="ismark">
                    <div class="markText">正在上传中,请稍等...</div>
                </div>
            </section>
            <div class="tip">
                <el-alert title="文件大小不能超过2MB." type="warning" show-icon />
            </div>
            <div class="scrollbar" v-if="filesAll.length">
                <el-scrollbar max-height="60px">
                    <p v-for="(file, index) in filesAll" :key="file.id" class="scrollbar-demo-item">
                        <el-icon>
                            <Document />
                        </el-icon>
                        <span class=" fileName">{{ file.filename }}</span>
                        <el-progress class="progress" :percentage="file.filestates" status="success" />
                    </p>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "mDragAndDropFileUpload",
};
</script>
<script setup >
import { ref } from 'vue';
import { // 引入组件的图标
    Document,
} from "@element-plus/icons-vue";
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, ElProgress } from 'element-plus'
import instance from "./instance";
const props = defineProps({
    path: {
        type: String,
        default: "",
    },
});
const ismark = ref(false)
const fileInputRef = ref(null)
const isEnterBox = ref(false)
const filesAll = ref([])
const createRandom = () => {
    let ran = Math.random() * new Date()
    return ran.toString(16).replace('.', '')
}
//手动选择
const submit = () => {
    fileInputRef.value.value = ''
    fileInputRef.value.click();
}
const handleFileChange = () => {
    if (ismark.value) {
        ElMessage.warning('等待文件上传完成')
        return
    }
    const files = Array.from(fileInputRef.value.files)
    if (files.length === 0) {
        return
    }
    filesAll.value = files.map((file) => {
        return {
            file,
            filefullname: file.name,
            filename: file.name.length > 30 ? file.name.slice(0, 20) + '...' + file.name.slice(file.name.length - 6)
                : file.name,
            filestates: 0,
            id: createRandom(),
        }
    })
    uploadFile(filesAll);
}
//拖拽选择
const dragenter = (e) => {
    e.preventDefault();
    isEnterBox.value = true
}
const dragleave = (e) => {
    e.preventDefault();
    isEnterBox.value = false
}
const dragover = (e) => {
    e.preventDefault();
}
const drop = (e) => {
    e.preventDefault();
    if (ismark.value) {
        ElMessage.warning('等待文件上传完成')
        return
    }
    let files = Array.from(e.dataTransfer.files)
    if (files.length === 0) {
        return
    }
    filesAll.value = files.map((file) => {
        return {
            file,
            filefullname: file.name,
            filename: file.name.length > 30 ? file.name.slice(0, 20) + '...' + file.name.slice(file.name.length - 6)
                : file.name,
            filestates: 0,
            id: createRandom(),
        }
    })
    uploadFile(filesAll);
}
const uploadFile = async (filesAll) => {
    if (filesAll.value.length === 0) {
        ElMessage.warning('请先选择文件')
        return
    }
    // console.log(filesAll.value);
    ismark.value = true
    try {
        const _filesAll = filesAll.value.map(async (file) => {
            const formData = new FormData()
            formData.append('file', file.file)
            formData.append('filename', file.filefullname)
            const res = await instance.post(props.path, formData, {
                onUploadProgress: (e) => {
                    const { loaded, total } = e;
                    file.filestates = Number(`${(loaded / total) * 100}`);
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
        //     ElMessage({
        //         message: '文件全部上传成功',
        //         type: 'success',
        //     });
        //     ismark.value = false
        // });
    } catch {
        ElMessage.error('Oops, 文件上传失败，请重新选择。');
    }
    setTimeout(() => {
        ElMessage({
            message: '文件全部上传成功',
            type: 'success',
        });
        ismark.value = false
    }, 1000)
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>