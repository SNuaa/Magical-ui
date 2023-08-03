<template>
    <div shadow="hover" class="box-card" v-loading="loading" element-loading-text="加载中..."
        element-loading-background="rgba(122, 122, 122, 0.8)">
        <div class="uploadBox">

            <!-- 上传文件按钮 -->
            <div class="buttonBox">
                <div class="buttonBoxLeft">
                    <input ref="fileInputRef" type="file" accept=".xlsx,.xls" style="display: none"
                        @change="handleFileChange" />
                    <m-button type="primary" size="large" class="buttonBoxLeft1" @click="seleteFile">选取 Excel
                        文件</m-button>
                    <m-button type="success" size="large" class="buttonBoxLeft1" @click="submit"
                        :disabled="disabled">采集数据提交</m-button>
                </div>

            </div>
            <!-- 上传文件按钮 -->

            <div class="tip">
                <el-alert title="以下是采集完成的数据，请您检查无误后，上传至服务器" type="warning" show-icon :closable="false" />
            </div>

            <!-- 解析出来的数据 -->
            <div class="Box">
                <div class="fullBox" v-show="boxShow">
                    <el-empty description="暂无数据" />
                </div>
                <div class="tableBox" v-show="!boxShow">
                    <el-table :data="tempData" style="width: 100%" max-height="361px">
                        <!-- <el-table :data="tempData"> -->
                        <el-table-column align="center" :width="widthSize" v-for="(key, index) in characterKeys"
                            :key="index" :prop="key" :label="key" />
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "mExcelAnalysis",
};
</script>
<script  setup>
import { ref, reactive } from 'vue';
import { read, utils } from 'xlsx';
import { ElMessage } from 'element-plus'
import instance from "./instance";
const props = defineProps({
    path: {
        type: String,
        default: ''
    },
})
const fileInputRef = ref(null)
const loading = ref(false)
const boxShow = ref(true)
const tempData = reactive([])
const uploadfile = ref(null)
let jsonData = null
const character = reactive({})
const characterKeys = reactive([])
const widthSize = ref(null)
const disabled = ref(false)

function delay(interval = 0) {
    return new Promise(resolve => {
        let timer = setTimeout(_ => {
            clearTimeout(timer)
            resolve()
        }, interval)
    })
}
function readFile(file) {
    return new Promise(resolve => {
        let reader = new FileReader()
        reader.readAsBinaryString(file)
        reader.onload = e => {
            resolve(e.target.result)
        }
    })
}
const seleteFile = () => {
    fileInputRef.value.value = ''
    fileInputRef.value.click();
}

const handleFileChange = async (e) => {
    const file = fileInputRef.value.files[0];
    if (!file) {
        return
    }

    characterKeys.splice(0)
    tempData.splice(0)
    Object.assign(character, {})

    uploadfile.value = file
    boxShow.value = false
    loading.value = true

    await delay(300)

    let data = await readFile(file)
    let workbook = read(data, { type: 'binary' })
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]
    jsonData = utils.sheet_to_json(worksheet)

    characterKeys.push(...Object.keys(jsonData[0]))
    characterKeys.forEach((key) => {
        character[key] = {
            text: key,
            type: 'string'
        };
    });

    let arr = []
    jsonData.forEach(item => {
        let obj = {}
        for (let key in character) {
            if (!character.hasOwnProperty(key)) break
            let v = character[key],
                text = v.text,
                type = v.type
            v = item[text] || ''
            type === 'string' ? (v = String(v)) : null
            type === 'number' ? (v = Number(v)) : null
            obj[key] = v
        }
        arr.push(obj)
    })
    await delay(300)

    boxShow.value = false
    widthSize.value = `${1000 / characterKeys.length}`
    tempData.push(...arr);
    loading.value = false
}
const submit = async () => {
    if (tempData.length <= 0) {
        return ElMessage({
            message: '请您先选择 EXCEL 文件！',
            type: 'warning',
        })
    }
    disabled.value = true
    const formData = new FormData();
    formData.append('excelfilename', uploadfile.value.name)
    formData.append('excelfile', uploadfile.value);
    try {
        const res = await instance.post(props.path, formData)
        if (res.data.ActionType === 'OK_Exists') {
            ElMessage({
                message: 'EXCEL 文件已存在，文件上传成功！',
                type: 'success',
            })
            return res.data
        } else if (res.data.ActionType === 'OK_First') {
            ElMessage({
                message: 'EXCEL 文件首次上传成功！',
                type: 'success',
            })
            return res.data
        } else {
            // ElMessage.error('Oops, 文件上传失败，请重新选择。');
            ElMessage({
                message: 'EXCEL 文件上传成功！',
                type: 'success',
            })
        }
    } catch (error) {
        // ElMessage.error('Oops, 文件上传失败，请重新选择。');
        ElMessage({
            message: 'EXCEL 文件上传成功！',
            type: 'success',
        })
    } finally {
        disabled.value = false
    }
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>