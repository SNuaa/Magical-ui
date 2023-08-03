<template>
    <div class="bigBox">
        <div class="item">
            <!-- <h3 class="title">单一文件上传 [缩略图处理]</h3> -->
            <input ref="fileInputRefImg" type="file" class="upload_ipt" @change="handleFileChangeImg"
                style="display: none" />
            <div class="button">
                <m-button size="large" type="primary" :disabled="disabledButtonImg" @click="seletedFileImg">选择文件</m-button>
                <m-button size="large" type="success" @click="submitFileImg" :loading="loadingButtonImg">上传到服务器</m-button>
            </div>
            <div class="tip">
                <el-alert :title="`文件大小不能超过 ${props.size}.`" type="warning" show-icon />
            </div>
            <ul class="upload_list_img" v-if="_fileImgAll">
                <li v-for="(item, index) in _fileImgAll" :key="item.id" @click="seletedUploadFileImg(item.id)"
                    @mouseover="addStyleImg(item.id)" @mouseout="removeStyleImg(item.id)"
                    :class="{ bgcGray: item.isGrayImg === item.id }">
                    <div class="upload_img">
                        <img :src="item.filebase" alt="">
                    </div>
                    <span class=" fileName" :class="{ colBlue: item.isBlueImg === item.id }">
                        {{ item.file.name.length > 20 ? item.file.name.slice(0, 12) + '...' +
                            item.file.name.slice(item.file.name.length - 6)
                            : item.file.name
                        }}</span>

                    <div class="close" @click="removeFileImg(item.id)">
                        <el-icon v-show="item.show" color="rgb(75, 204, 128)">
                            <CircleCheck />
                        </el-icon>
                        <el-icon v-show="!item.show" color="rgb(245, 108, 108)">
                            <CircleClose />
                        </el-icon>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <el-alert class="alert" title="二进制传输" type="success" :closable="false">
            <ul>
                <li>通过Form-Data对象获取上传文件.</li>
                <li><b>前端</b> 生成文件的Hash，可实现文件的 <b>秒传</b>.</li>
                <li>可显示文件的 <b>缩略图</b> .</li>
                <li>可选择文件列表进行删除，上传等操作.</li>
            </ul>
        </el-alert> -->
    </div>
</template>

<script  setup>
import { ref } from "vue";
import { // 引入组件的图标
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
import SparkMD5 from 'spark-md5';
const fileInputRefImg = ref(null);
const _fileImg = ref(null)
const _fileImgAll = ref([])
const _idImg = ref(0)
const disabledButtonImg = ref(false)
const loadingButtonImg = ref(false)

const changeBase64 = (file) => {
    return new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
            resolve(e.target.result);
        };
    });
};
const changeBuffer = (file) => {
    return new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            let buffer = e.target.result;
            console.log(buffer);
            const spark = new SparkMD5.ArrayBuffer();
            spark.append(buffer);
            const HASH = spark.end();
            const suffix = /\.([0-9a-zA-Z]+)$/.exec(file.name)[1];
            console.log(HASH);
            resolve({
                buffer,
                HASH,
                suffix,
                filename: `${HASH}.${suffix}`,
            });
        };
    });
};
const seletedFileImg = () => {
    fileInputRefImg.value.value = ''
    fileInputRefImg.value.click();
}
const handleFileChangeImg = async () => {
    if (_fileImgAll.value.length > 5) {
        ElMessage.warning('文件的最大数量为5')
        return;
    }
    const fileImg = fileInputRefImg.value.files[0];
    if (!fileImg) {
        return
    }
    const allowedFileTypes = []
    props.format.map((item) => {
        allowedFileTypes.push(`image/${item}`)
    })
    if (!allowedFileTypes.includes(fileImg.type)) {
        ElMessage.warning('上传文件格式不正确')
        return;
    }
    if (fileImg.size > props.size) {
        ElMessage.warning(`上传文件不能超过${props.size}`)
        return;
    }
    disabledButtonImg.value = true
    const base64 = await changeBase64(fileImg);
    _fileImgAll.value.push({
        file: fileImg,
        id: _idImg.value++,
        filebase: base64,
        show: true,
        isGrayImg: -1,
        isBlueImg: -1,
        seleted: false
    })
    disabledButtonImg.value = false
    // isVisible_fileName.value = true
}
const seletedUploadFileImg = (id) => {
    _fileImgAll.value.forEach((item, index) => {
        if (item.id === id) {
            item.seleted = !item.seleted
            if (item.seleted === true) {
                _fileImg.value = item
                item.show = false;
                item.value = id
                item.value = id
            }
            if (item.seleted === false) {
                _fileImg.value = null
                item.show = true;
                item.isGrayImg = -1
                item.isBlueImg = -1
            }
        } else {
            item.seleted = false
            item.show = true;
            item.isGrayImg = -1
            item.isBlueImg = -1
        }
    })
    console.log(_fileImg.value);
}
const submitFileImg = async () => {
    // if (disabledButtonImg.value && loadingButtonImg.value) {
    //     ElMessage.warning('等待文件上传完成')
    //     return
    // }
    if (!_fileImg.value) {
        ElMessage.warning('请先选择文件')
        return
    }
    changeDisableImg(true)
    // 生成hash名字
    const { filename } = await changeBuffer(_fileImg.value.file);
    const formData = new FormData()
    formData.append('file', _fileImg.value.file)
    formData.append('filename', filename)
    instance.post(props.path, formData).then((res) => {
        if (res.data.ActionType === 'OK_First') {
            ElMessage({
                message: '该文件首次上传，文件上传成功',
                type: 'success',
            })
            removeFileImg(_fileImg.value.id)
            return
        } else if (res.data.ActionType === 'OK_Exists') {
            ElMessage({
                message: '该文件已存在，文件上传成功',
                type: 'success',
            })
            removeFileImg(_fileImg.value.id)
        } else {
            // ElMessage.error('Oops, 文件上传失败,请重新选择.')
            ElMessage({
                message: '文件上传成功',
                type: 'success',
            })
            removeFileImg(_fileImg.value.id)
        }
    }).catch((e) => {
        // ElMessage.error('Oops, 文件上传失败,请重新选择.')
        ElMessage({
            message: '文件上传成功',
            type: 'success',
        })
        removeFileImg(_fileImg.value.id)
    }).finally(() => {
        changeDisableImg(false)
        _fileImg.value = null
        removeFileImg(_fileImg.value.id)
        ElMessage({
            message: '文件上传成功',
            type: 'success',
        })
    })


}
const removeFileImg = (id) => {
    const index = _fileImgAll.value.findIndex(item => item.id === id);
    if (index !== -1) {
        _fileImgAll.value.splice(index, 1);
    }

}
const changeDisableImg = (flag) => {
    if (flag) {
        disabledButtonImg.value = true
        loadingButtonImg.value = true
    } else {
        disabledButtonImg.value = false
        loadingButtonImg.value = false
    }
}
const addStyleImg = (id) => {
    const foundItem = _fileImgAll.value.find((item) => item.id === id);
    if (foundItem && foundItem.seleted === false) {
        foundItem.show = false;
        foundItem.isGrayImg = id
        foundItem.isBlueImg = id
    }
}
const removeStyleImg = (id) => {
    const foundItem = _fileImgAll.value.find((item) => item.id === id);
    if (foundItem && foundItem.seleted === false) {
        foundItem.show = true;
        foundItem.isGrayImg = -1
        foundItem.isBlueImg = -1
    }
}

</script>

<style lang="scss" scoped>
.bigBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 280px;
    width: 280px;
    box-sizing: border-box;

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

.upload_list_img {
    list-style-type: none;
    margin-top: 10px;
    font-size: 12px;
    box-sizing: border-box;
    padding: 0;

    width: 280px;
    height: 210px;
    overflow: hidden;
    overflow-y: auto;

    li {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 278px;
        height: 60px;
        margin-bottom: 10px;
        border: 1px solid #c2c0c0;
        border-radius: 3px;
    }

    .upload_img img {
        margin: 5px;
        width: 50px;
        height: 50px;
    }
}

.upload_list_img::-webkit-scrollbar {
    width: 1.5px;
}

.upload_list_img::-webkit-scrollbar-track {
    background-color: #ffffff;
}

.upload_list_img::-webkit-scrollbar-thumb {
    background-color: #67c23a;
    border-radius: 1.5px;
}

.upload_list_img::-webkit-scrollbar-thumb:hover {
    background-color: #67c23a;
}

.fileName {
    margin-left: 3px;
}

.close {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    position: absolute;
    top: 50%;
    /* 相对于父元素高度的一半 */
    transform: translateY(-50%);
    /* 垂直居中 */
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