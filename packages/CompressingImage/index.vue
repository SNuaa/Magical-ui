<template>
    <!-- <h3>图片压缩处理 </h3> -->
    <div class="item">
        <div class="Img1">
            <img :src="orgimg" alt="" v-show="orgimg" class="ImgShow">
            <div class="block ImgShow" v-show="!orgimg">
                <el-image>
                    <template #error>
                        <div class="image-slot">
                            <el-icon><icon-picture /></el-icon>
                        </div>
                    </template>
                </el-image>
            </div>
            <div class="title">
                <el-alert title="压缩前的图片" type="success" center :closable="false" />
            </div>
        </div>
        <div class="Tas">
            <input type="file" accept="image/*" class="file" ref="fileInputRef" @change="changeFunc" />
            <m-button type="success" :icon="Promotion" size="large" @click="uploadFunc">上传图片并压缩</m-button>
        </div>
        <div class="Img1">
            <img :src="blobImg" alt="" v-show="blobImg" class="ImgShow">
            <div class="block ImgShow" v-show="!blobImg">
                <el-image>
                    <template #error>
                        <div class="image-slot">
                            <el-icon><icon-picture /></el-icon>
                        </div>
                    </template>
                </el-image>
            </div>
            <div class="title">
                <el-alert title="压缩后的图片" type="error" center :closable="false" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "mCompressingImage",
};
</script>
<script setup>
import { ref } from 'vue';
import { // 引入组件的图标
    Promotion
} from "@element-plus/icons-vue";
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
    quality: {
        type: Number,
        default: 0.2,
    },
});
const orgimg = ref(null)
const blobImg = ref(null)
const fileInputRef = ref(null)
const MAX_WIDTH = 450;
const uploadFunc = () => {
    fileInputRef.value.click();
}
const changeFunc = () => {
    let file = fileInputRef.value.files[0];
    if (!file) {
        return
    }
    blobImg.value = null
    orgimg.value = null
    fileToBase64(file, props.quality);
}
const fileToBase64 = (file, quality) => {
    //图片对象      图片质量
    console.log("将file文件通过FileReader转化为base64格式");
    let fileReader = new FileReader();
    let type = file.type; //"image/png"
    // 对文件进行读取
    fileReader.readAsDataURL(file);
    console.log("-----------fileReader----------");
    console.log(fileReader);
    fileReader.onload = function (e) {
        console.log("原始二进制字符串：", this.result.toString());
        orgimg.value = fileReader.result
        ElMessage({
            message: '文件上传成功',
            type: 'success',
        });
        compress(fileReader.result, quality, type);
    };
};

const compress = (base64, quality, mimeType) => {
    //mimeType 图片类型，例如 mimeType='image/png'
    console.log(
        "处理base64数据，通过canvas(toDataURL)进行压缩绘制，然后输出压缩后的base64图片数据"
    );
    let cvs = document.createElement("canvas");
    let img = document.createElement("img");
    // CORS 策略，会存在跨域问题
    img.crossOrigin = "anonymous";
    return new Promise((resolve, reject) => {
        img.src = base64;
        // 图片偏移值
        let offetX = 0;
        img.onload = () => {
            if (img.width > MAX_WIDTH) {
                // 做适配
                cvs.width = MAX_WIDTH;
                cvs.height = (img.height * MAX_WIDTH) / img.width;
                offetX = (img.width - MAX_WIDTH) / 2;
            } else {
                cvs.width = img.width;
                cvs.height = img.height;
            }
            // 重点！ 将图片插入画布并开始绘制
            let ctx = cvs
                .getContext("2d")
                .drawImage(img, 0, 0, cvs.width, cvs.height);

            let imageData = cvs.toDataURL(mimeType, quality);
            console.log("canvas图片压缩", imageData);
            // 我想转成blob格式看看
            let blobData = converrBase64UrlToBlob(imageData, mimeType);
            console.log("我想转成blob格式看看", blobData);
            //利用FormData传输数据
            // let formData = new window.FormData();
            // formData.append("file", _blob);
            resolve(imageData);
        };
    });
};
// base64数据转成blob文件流
const converrBase64UrlToBlob = (base64, mimeType) => {
    //mimeType 图片类型，例如 mimeType='image/png'
    console.log("base64数据转成blob文件流");
    let bytes = window.atob(base64.split(",")[1]); //atob方法用于解码base64
    console.log("bytes:");
    console.log(bytes);
    // 创建一个长度为 bytes.length 的 buffer(一个二进制文件), 它会分配一个 16 字节（byte）的连续内存空间，并用 0 进行预填充。
    let ab = new ArrayBuffer(bytes.length);
    console.log("ab:");
    console.log(ab);
    // Uint8Array —— 将 ArrayBuffer 中的每个字节视为 0 到 255 之间的单个数字（每个字节是 8 位）。这称为 “8 位无符号整数”。
    let ia = new Uint8Array(ab);
    console.log("ia:" + ia);
    for (let i = 0; i < bytes.length; i++) {
        // 更改里面的初始化内容
        ia[i] = bytes.charCodeAt(i);
    }
    console.log("ia:" + ia);
    // 创建blob格式数据，并传入二进制文件和文件原本类型
    let _blob = new Blob([ia], { type: mimeType });
    console.log("_blob：");
    console.log(_blob);
    toImg(_blob);
    return _blob;
};

// 尝试操作成功转化的blob文件
// 利用createObjectURL转化为DataUrl格式
const toImg = function (blobObj) {
    console.log("尝试操作成功转化的blob文件");
    // 两种方法都可以将Blob数据转化为DataUrl格式
    let imgSrc = window.URL.createObjectURL(blobObj);
    //let imgSrc = window.webkitURL.createObjectURL(blobObj);
    blobImg.value = imgSrc;
    ElMessage({
        message: '文件压缩成功',
        type: 'success',
    });
};

</script>
<style scoped lang="scss">
// background-color: #f3dbdb;
.item {
    // background-color: #c98e8e;
    width: 880px;
    height: 320px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 40px;
    // border: 1px solid red;

    .Img1 {
        border: 1px solid #ddd;
        // border: 1px solid #e43d3d;
        width: 300px;
        height: 300px;
        // overflow: hidden;

        .ImgShow {
            width: 100%;
            height: 100%;
        }

        .title {
            margin-top: 10px;
        }

        .block {
            // padding: 30px 0;
            text-align: center;
            // border-right: solid 1px var(--el-border-color);
            display: inline-block;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            vertical-align: top;
            // border: 1px solid #ddd;

            .el-image {
                // padding: 0 5px;
                max-width: 300px;
                max-height: 300px;
                width: 100%;
                // height: 200px;
                height: 100%;

                .image-slot {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    background: var(--el-fill-color-light);
                    color: var(--el-text-color-secondary);
                    font-size: 30px;

                    .image-slot .el-icon {
                        font-size: 30px;
                    }
                }
            }
        }

    }

    .file {
        display: none;
    }
}
</style>