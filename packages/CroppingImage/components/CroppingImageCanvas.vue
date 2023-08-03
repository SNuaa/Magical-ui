<template>
    <div class="item">
        <div class="clipImageBox">
            <!-- <div class="canvasBox" @touchstart="startFunc" @touchmove="moveFunc"> -->
            <div class="canvasBox">
                <canvas :width="canvasW" :height="canvasH" ref="canvas"></canvas>
                <!-- 鼠标移动的事件区域 -->
                <div class="event" @mouseup="EndFunc" @mousedown="startFunc" @mousemove="moveFunc">
                    <div class="block" v-if="disabledButton">
                        <el-image>
                            <template #error>
                                <div class="image-slot">
                                    <el-icon><icon-picture /></el-icon>
                                </div>
                            </template>
                        </el-image>
                    </div>
                </div>
                <!-- 遮罩层 -->
                <div class="mark" v-show="isMark"
                    :style="{ width: markW + 'px', height: markH + 'px', left: markL + 'px', top: markT + 'px' }">
                    <el-icon class="markIcon">
                        <Search />
                    </el-icon>
                </div>
                <!-- 放大的图片 -->
                <div class="bigImgBox" v-show="isShowBigImg">
                    <img :src="imgBase" :style="{ left: bigImgL + 'px', top: bigImgT + 'px' }" />
                </div>
            </div>
            <div class="buttonBox">
                <input type="file" accept="image/*" class="file" ref="fileInputRef" @change="changeFunc" />
                <m-button type="primary" @click="clickFunc">选择图片</m-button>
                <m-button type="warning" @click="scaleFunc(1)" :disabled="disabledButton">放大图片</m-button>
                <m-button type="danger" @click="scaleFunc(0)" :disabled="disabledButton">缩小图片</m-button>
                <m-button type="success" @click="saveFunc" :disabled="disabledButton">保存图片</m-button>
            </div>
        </div>
    </div>
</template>

<script  setup>
import { ref, defineEmits } from 'vue';
import { // 引入组件的图标
    Search
} from "@element-plus/icons-vue";
import { Picture as IconPicture } from '@element-plus/icons-vue'
// 获取一屏幕的宽度
let winW = document.documentElement.clientWidth;
//获取font-size的大小 
let font = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
// let canvasWBase = winW - 0.3125 * 2 * font;
let canvasWBase = 400;
// 遮罩层的大小等于canvasW的70
let markWBase = canvasWBase * 0.5;
//画布宽高
const canvasW = ref(canvasWBase);
console.log('画布宽高');
console.log(canvasW.value);
const canvasH = ref(canvasWBase);
// 遮罩层mark宽高
const markW = ref(markWBase);
const markH = ref(markWBase);
// 遮罩层mark位置marginL，marginT
const markL = ref((canvasWBase - markWBase) / 2);
const markT = ref((canvasWBase - markWBase) / 2);
// 上传图片的大小位置
const imageW = ref(0);
const imageH = ref(0);
const imageL = ref(0);
const imageT = ref(0);
const bigImgL = ref(0);
const bigImgT = ref(0);
// 是否显示mark
const isMark = ref(true);
const fileInputRef = ref(null)
const IMAGE = ref(null)
const CTX = ref(null)
const canvas = ref(null)
const startX = ref(0)
const startY = ref(0)
const isMousedown = ref(false)
const isShowBigImg = ref(false)
const imgBase = ref(null)
const emit = defineEmits(['saveImage']); // 声明自定义事件
const disabledButton = ref(true);
const clickFunc = () => {
    // 触发file选择文件的操作,就是触发input点击事件 然后就触发change事件
    fileInputRef.value.click();
}
const changeFunc = () => {
    // 选择了图片
    // 获得这个图片 把它绘制到画布中
    //1：就是遮罩层就要出来
    isMark.value = true;
    // 2:获取上传后的图片
    // console.log(this.$refs.file); 这个获取的表单元素 上传图片的表单元素
    // console.dir(this.$refs.file); 
    // 里面的一个属性 是一个集合 files : FileList { 0: File, length: 1 }
    let file = fileInputRef.value.files[0];
    console.log('上传的图片');
    console.log(file);
    //选择后取消了 则需要进行判断
    // 如果没有选择文件，files是个空集合
    if (!file) return;
    //把上传的文件绘制到canvas里面
    // 1：先基于fileReader（内置的进行文件处理的类）进行文件读取 把文件读取成计算机能识别的base64编码
    //2：把上传的文件 变成图片绘制canvas里面
    //3：把它转换为对应的base64编码
    let fileExample = new FileReader();
    fileExample.readAsDataURL(file);
    // 在onload中读取完毕
    fileExample.onload = ev => {
        // console.dir(ev.target);
        // target: FileReader {readyState: 2, result: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//Z
        // 创建新的图片把 base64编码给它，最后把生成的图片绘制到canvas里

        // 创建新图片 挂载到this实例上，方便全局使用
        IMAGE.value = new Image();
        IMAGE.value.src = ev.target.result;
        imgBase.value = ev.target.result;
        console.log("imgBase.value");
        console.log(imgBase.value);
        // console.log(IMAGE.value);
        // this.IMAGE.crossOrigin = 'Anonymous'; 解决跨域问题
        // 当前的图片已经创建好了
        IMAGE.value.onload = () => {
            // console.dir(this.IMAGE);
            // 在这里创建完成 然后获取图片的大小 位置等信息

            imageW.value = IMAGE.value.width;
            imageH.value = IMAGE.value.height;
            // 重新按照比例计算宽高,n为缩放比例，分为横向图片和纵向图片
            // console.log('初始图片的大小' + imageW.value + "~" + imageH.value);
            // console.log('画布的大小' + canvasW.value + "~" + canvasH.value);
            let n = 1;
            if (imageW.value > imageH.value) {
                n = imageW.value / canvasW.value;
                imageW.value = canvasW.value;
                imageH.value = imageH.value / n;
            } else {
                n = imageH.value / canvasH.value;
                imageH.value = canvasH.value;
                imageW.value = imageW.value / n;
            }
            // 图片位置
            imageL.value = (canvasW.value - imageW.value) / 2;
            imageT.value = (canvasH.value - imageH.value) / 2;
            // 绘制图片 绘制的方法写成函数
            console.log('图片的大小' + imageW.value + "~" + imageH.value);
            console.log('图片的位置' + imageL.value + "~" + imageT.value);
            drawImage();
            disabledButton.value = false
        };
    };
}
const scaleFunc = (flag) => {
    //首先得图片
    if (!IMAGE.value) return;
    let n = imageW.value / imageH.value;
    // 增加的宽
    let n1 = 20;
    // 增加的高
    let n2 = n1 / n;
    if (flag) {
        imageW.value += n1;
        imageH.value += n2;
    } else {
        imageW.value -= n1;
        imageH.value -= n2;
    }
    //宽高改变之后重新进行绘制 
    drawImage();
}
const startFunc = (ev) => {
    if (!IMAGE.value) return;
    isMousedown.value = true
    isShowBigImg.value = true
    console.log('鼠标按下了');
    document.body.style.cursor = 'pointer';
}
const EndFunc = () => {
    isMousedown.value = false
    isShowBigImg.value = false
    console.log('鼠标抬起了');
    document.body.style.cursor = 'default';
}
const moveFunc = (e) => {
    console.log('鼠标移动了');
    if (isMousedown.value) {
        console.log('鼠标移动了了了了了');
        if (!IMAGE.value) return;
        //2.计算定位的left和top
        let x = e.offsetX - markW.value / 2;
        let y = e.offsetY - markH.value / 2;
        console.log('偏移x:' + e.offsetX);
        console.log('偏移y:' + e.offsetX);
        //3.约束条件防止盒子跑出去
        if (x < 0) x = 0; //防止从左边跑出去
        if (x > markW.value) x = markW.value; //防止从右边跑出去
        if (y < 0) y = 0; //防止从上边跑出去
        if (y > markH.value) y = markH.value; //防止从下边跑出去
        console.log('x:' + x);
        console.log('y:' + y);
        markL.value = x;
        markT.value = y;
        bigImgL.value = - 2 * x;
        bigImgT.value = - 2 * y;
        drawImage();
    }
}
//绘制图片
const drawImage = () => {
    //绘制图片的思路
    //通过画布元素获取画布中指定画笔对象[上下文对象]
    //创建2D渲染的画布
    CTX.value = canvas.value.getContext("2d");
    //防止画布里面有东西，清除一个矩形范围所有元素
    //参数为清除范围的左上角坐标 (0, 0)，以及画布的宽度和高度
    CTX.value.clearRect(0, 0, canvasW.value, canvasH.value);
    // 绘制图片
    //使用 drawImage 方法将图像绘制到画布上
    // 参数为要绘制的图像（this.IMAGE），以及图像在画布上的位置和尺寸
    CTX.value.drawImage(
        IMAGE.value,
        imageL.value,
        imageT.value,
        imageW.value,
        imageH.value
    );
    imgBase.value = canvas.value.toDataURL("image/png");

}
const saveFunc = () => {
    if (!IMAGE.value) return;
    // 获取指定区域的像素信息 是canvas里面的像素点
    //各种轴
    let imageData = CTX.value.getImageData(
        markL.value,
        markT.value,
        markW.value,
        markH.value
    );
    // 创建第二张画布，通过第二张画布来帮我们生成图片
    let canvas2 = document.createElement("canvas");
    //将得到的像素点放到canvas里面
    //每一个canvas画布有了之后  想绘制东西 要绘制其上下文
    let canvas2CTX = canvas2.getContext("2d");
    //最终的canvas要绘制成一张图片 给其指定的宽高
    canvas2.width = markW.value;
    canvas2.height = markH.value;
    // 把像素信息放置到画布当中
    //最终像素点的大小
    canvas2CTX.putImageData(
        imageData,
        0,
        0,
        0,
        0,
        markW.value,
        markH.value
    );
    // 把画布的内容生成最终的图片的base64
    let imageBase64 = canvas2.toDataURL("image/png");
    //自定义事件
    emit('saveImage', imageBase64);
}
</script>
<style lang="scss" scoped>
.item {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 480px;

    .clipImageBox {


        .canvasBox {
            position: relative;

            .event {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 21;

            }

            canvas {
                display: block;
                box-sizing: border-box;
                margin: 0 auto;
                width: 400px;
                height: 400px;
                border: 1px solid #ddd;
            }

            .mark {
                box-sizing: border-box;
                position: absolute;
                z-index: 20;
                border: 1px dashed #eee;
                background: rgba(0, 0, 0, 0.2);
                display: flex;
                justify-content: center;
                align-items: center;

                .markIcon {
                    margin: 0 auto;
                    color: #ffffff;
                    font-size: 25px;
                }
            }

            .bigImgBox {
                position: absolute;
                width: 100%;
                height: 100%;
                top: -1px;
                left: 100%;
                // transform: translateX(-100%);
                // margin-left: 40px;
                margin-left: 20px;

                border: 1px solid #ddd;
                overflow: hidden;
                background: #f0f9eb;

                img {
                    width: 200%;
                    max-width: 200%;
                    height: 200%;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }


        .buttonBox {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;

            .file {
                display: none;
            }

            button {
                cursor: pointer;
            }
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
            border: 1px solid #ddd;

            .el-image {
                // padding: 0 5px;
                max-width: 400px;
                max-height: 400px;
                width: 100%;
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
}
</style>