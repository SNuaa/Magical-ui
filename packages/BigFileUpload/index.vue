<template>
    <div class="item">
        <input ref="fileInputRef" type="file" class="upload_ipt" style="display: none" @change="handleFileChange" />
        <div class="button">
            <m-button class="button1" size="large" type="primary" @click="seletedFile"
                :disabled="status !== Status.wait">选择文件</m-button>
            <m-button class="button2" size="large" type="success" @click="handleUpload"
                :disabled="uploadDisabled">上传文件</m-button>
            <!-- <m-button class="button2" size="large" type="info" @click="handleResume"
                v-if="status === Status.pause">恢复上传</m-button> -->
            <!-- <m-button class="button2" size="large" type="warning" @click="handlePause" v-else
                :disabled="status !== Status.uploading || !container.hash">暂停上传</m-button>
            <m-button class="button2" size="large" type="danger" @click="handleDelete"
                :disabled="uploadDisabled">删除文件</m-button> -->
        </div>
        <div class="percentage">
            <div class="percentageItem">
                <el-icon>
                    <Document />
                </el-icon>
                <span class="title" v-if="fileName !== null">{{ fileName }}</span>
                <span class="title" v-else>待上传的文件名</span>
            </div>
            <div class="percentageItem">
                <el-icon>
                    <Odometer />
                </el-icon>
                <span class="title">计算切片的Hash</span>
                <span class="percentageEach"> <el-progress color="rgba(48, 189, 116, 2)" :percentage="hashPercentage"
                        :stroke-width="7"></el-progress></span>
            </div>
            <div class="percentageItem">
                <el-icon>
                    <UploadFilled />
                </el-icon>
                <span class="title">上传的总进度</span>
                <span class="percentageEach"> <el-progress color="rgba(48, 189, 116, 2)" :percentage="fakeUploadPercentage"
                        :stroke-width="7"></el-progress></span>
            </div>
        </div>
        <div class="table">
            <el-table :data="data" height="255" style="width: 100%">
                <el-table-column align="center" prop="hash" label="切片的Hash" width="400" />
                <el-table-column align="center" prop="filesize" label="切片大小(KB)" width="300">
                    <template v-slot="{ row }">
                        {{ transformByte(row.size) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="上传进度">
                    <template #default="scope">
                        <el-progress color="#909399" :percentage="scope.row.percentage" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name: "mBigFileUpload",
};
</script>
<script  setup>
import { ref, reactive, computed, watch } from "vue";
import { // 引入组件的图标
    Odometer,
    UploadFilled,
    Document
} from "@element-plus/icons-vue";
import instance from "./instance";
import { ElMessage } from 'element-plus'
import axios from 'axios'// 引入axios
const props = defineProps({
    path: {
        type: String,
        default: "",
    },
});
const CancelToken = axios.CancelToken
let source = CancelToken.source()

const Status = {
    wait: "wait",
    pause: "pause",
    uploading: "uploading"
};
const container = reactive({
    file: null,
    hash: "",
    worker: null
})
const SIZE = ref(10 * 1024 * 1024);
const hashPercentage = ref(0)
const fakeUploadPercentage = ref(0)
let data = reactive([])
const status = ref(Status.wait)
const fileInputRef = ref(null)
const fileName = ref(null)
const reqResults = ref(0)
const uploadDisabled = computed(() => {
    return (
        !container.file ||
        [Status.pause, Status.uploading].includes(status.value)
    );
});
const uploadPercentage = computed(() => {
    if (!container.file || !data.length) return 0;
    console.log('uploadPercentage改变了');
    const loaded = data
        .map(item => item.size * item.percentage)
        .reduce((acc, cur) => acc + cur);
    return parseInt((loaded / container.file.size).toFixed(2));
});
// 使用 watch 监听 uploadPercentage 的变化
watch(uploadPercentage, () => {
    if (uploadPercentage.value > fakeUploadPercentage.value) {
        fakeUploadPercentage.value = uploadPercentage.value - 0.01;
    }
});
const transformByte = (val) => {
    return Number((val / 1024).toFixed(0));
}
const handleDelete = async () => {
    const dataObj = {
        fileHash: container.hash,
        filename: container.file.name
    }
    let res = await instance.post(props.path, dataObj, {
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }, cancelToken: source.token,
    })
    if (res.data.ActionType === 'OK') {
        resetData()
        ElMessage({
            message: '文件删除成功',
            type: 'success',
        });
        status.value = Status.wait;
    }
    if (res.data.ActionType === 'ERROR') {
        ElMessage({
            message: '文件删除失败,请稍后再试',
            type: 'fail',
        });
        status.value = Status.wait;
    }
}
const handlePause = () => {
    status.value = Status.pause;
    source.cancel('终止上传！')
    source = CancelToken.source()
    if (container.worker) {
        container.worker.onmessage = null;
    }
}
const handleResume = async () => {
    status.value = Status.uploading;
    const { shouldUpload, uploadedList } = await verifyUpload(
        container.file.name,
        container.hash
    );
    if (!shouldUpload) {
        fakeUploadPercentage.value = 100
        ElMessage({
            message: '跳过上传：文件上传成功',
            type: 'success',
        })
        status.value = Status.wait;

        return;
    }
    if (uploadedList.length !== 0) {
        updataPercentage(uploadedList)
    }
    console.log('恢复上传 已经上传的切片长度');
    console.log(uploadedList);
    await uploadChunks(uploadedList);
}
const updataPercentage = (uploadedList) => {
    const index = uploadedList.map((item) => {
        return Number(item.split('-')[1])
    })
    console.log('恢复上传 已经上传的切片的index');
    console.log(index);
    index.map((_index) => {
        data[_index].percentage = 100;
    })
}
const resetData = () => {
    source.cancel('终止上传！')
    source = CancelToken.source()
    if (container.worker) {
        container.worker.onmessage = null;
    }
    data.splice(0);
    container.file = null;
    container.hash = "";
    container.worker = null;
    fileName.value = null
    hashPercentage.value = 0
    fakeUploadPercentage.value = 0
}
const createFileChunk = (file, size = SIZE.value) => {
    const fileChunkList = [];
    let count = Math.ceil(file.size / size)
    if (count > 100) {
        size = file.size / 100
        SIZE.value = size
        count = 100
    }
    let cur = 0;
    while (cur < count) {
        fileChunkList.push({ file: file.slice(cur * size, (cur + 1) * size) });
        cur++;
    }
    return fileChunkList;
}
const calculateHash = (fileChunkList) => {
    return new Promise(resolve => {
        container.worker = new Worker("/hash.js");
        container.worker.postMessage({ fileChunkList });
        container.worker.onmessage = e => {
            const { percentage, hash } = e.data;
            hashPercentage.value = Math.max(percentage, hashPercentage.value);
            if (hash) {
                resolve(hash);
            }
        };
    });
}
const seletedFile = () => {
    fileInputRef.value.value = ''
    fileInputRef.value.click();
}
const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    resetData();
    fileName.value = file.name
    container.file = file;
    // console.log("选择的文件");
    // console.log(file);
}
const handleUpload = async (e) => {
    if (!container.file) return
    status.value = Status.uploading
    const fileChunkList = createFileChunk(container.file);
    // console.log("文件的切片列表");
    // console.log(fileChunkList);

    container.hash = await calculateHash(fileChunkList)

    // console.log("文件的哈希");
    // console.log(container.hash);

    // console.log("文件的名字");
    // console.log(container.file.name);
    const { shouldUpload, uploadedList } = await verifyUpload(
        container.file.name,
        container.hash
    );
    // console.log("验证文件是否上传:");
    // console.log(shouldUpload);
    // console.log(uploadedList);

    if (!shouldUpload) {
        fakeUploadPercentage.value = 100
        ElMessage({
            message: '跳过上传：文件上传成功',
            type: 'success',
        })
        status.value = Status.wait;
        return;
    }
    fileChunkList.forEach(({ file }, index) => {
        data.push({
            fileHash: container.hash,
            index,
            hash: container.hash + "-" + index,
            chunk: file,
            size: file.size,
            percentage: uploadedList.includes(index) ? 100 : 0
        });
    });
    if (uploadedList.length !== 0) {
        updataPercentage(uploadedList)
    }
    await uploadChunks(uploadedList);
}
const uploadChunks = async (uploadedList = []) => {
    // 1. 过滤出尚未上传的文件数据对象
    const filteredData = data.filter(({ hash }) => !uploadedList.includes(hash));

    // 2. 构建请求数据数组
    const requestDataList = [];
    for (const { chunk, hash, index } of filteredData) {
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("hash", hash);
        formData.append("filename", container.file.name);
        formData.append("fileHash", container.hash);
        requestDataList.push({ formData, index });
    }
    console.log('构建请求数据数组');
    console.log(requestDataList);
    // try {
    await creatRequest(requestDataList, 6);
    // } catch (error) {
    await mergeRequest();
    // console.log('并发请求失败');
    // }
    // console.log('已上传的切片的长度：' + uploadedList.length);
    // console.log('续传切片的长度：' + reqResults.value);
    // if (uploadedList.length + reqResults.value === data.length) {
    // await mergeRequest();
    // }
    // console.log('進度條' + uploadPercentage);
}
const mergeRequest = async () => {
    ElMessage({
        message: '切片全部上传成功，正在合并切片',
        type: 'success',
    });
    const dataObj = {
        size: SIZE.value,
        fileHash: container.hash,
        filename: container.file.name
    }
    try {
        let res = await instance.post(props.path, dataObj, {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }, cancelToken: source.token,
        })
        if (res.data.ActionType === 'OK') {
            fakeUploadPercentage.value = 100
            ElMessage({
                message: '文件全部上传成功',
                type: 'success',
            });
            status.value = Status.wait;
        }
    } catch {
        fakeUploadPercentage.value = 100
        ElMessage({
            message: '文件全部上传成功',
            type: 'success',
        });
        status.value = Status.wait;
    }


    // console.log('縂進度：');
    // console.log(fakeUploadPercentage.value);
    // console.log('進度條' + uploadPercentage);
}
const verifyUpload = async (filename, fileHash) => {
    const fileObj = {
        filename: filename,
        fileHash: fileHash
    }
    try {
        await axios.post(props.path, fileObj);
    } catch {
        const shouldUpload = true
        const uploadedList = []
        console.log('verifyUpload' + shouldUpload + '~' + uploadedList);
        return {
            shouldUpload, uploadedList
        }
    }

    // if (res.data.ActionType === 'OK') {
    //     const { shouldUpload, uploadedList } = res.data
    //     console.log('verifyUpload' + shouldUpload + '~' + uploadedList);
    //     return {
    //         shouldUpload, uploadedList
    //     }
    // }
}
const creatRequest = async (tasks, pool) => {
    console.log("进入并发处理函数");
    pool = pool || 5
    let together = new Array(pool).fill(null),
        _index = 0;
    together = together.map(() => {
        return new Promise((resolve, reject) => {
            const run = function run() {
                if (_index >= tasks.length) {
                    resolve()
                    return
                }
                const { formData, index } = tasks[_index++];
                instance.post(props.path, formData, {
                    onUploadProgress: (e) => {
                        const { loaded, total } = e;
                        data[index].percentage = Number(`${(loaded / total) * 100}`);
                        console.log('进度条');
                        console.log(data[index].percentage);
                    }, cancelToken: source.token, // 添加 cancelToken，用于后续取消请求发送
                }).then(result => {
                    console.log("切片上传结果：");
                    console.log(result);
                    run();
                }).catch(reason => {
                    // reject(reason)
                    run();
                })
            }
            run()
        })
    })
    await Promise.all(together);
    reqResults.value = _index
    return _index;
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>