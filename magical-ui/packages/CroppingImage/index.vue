<template>
    <div shadow="hover" class="box-card">
        <div class="box-card-content">
            <div class="items">
                <!-- 开发组件的时候，mark大小，调取组件的时候 通过传递属性的方式 
            指定画布大小 指定mark大小 控制图片能移动还是mark能移动 
        控制图片能放大缩小还是mark能放大缩小 就是通过传递这些不同的属性来进行控制的-->
                <div class=" uploadBox">
                    <CroppingImageCanvas @saveImage="saveImage"></CroppingImageCanvas>
                </div>
                <div class="listBox">
                    <div class="resultBox">
                        <div class="Img" v-for="(item, index) in ImgList" :key="index" @mouseenter="handleMouseEnter(index)"
                            @mouseleave="handleMouseLeave(index)">
                            <img :src="item" alt />
                            <div class="deleteStyle" v-show="deleteStyleShow === index">
                                <div class="icon1" @click="Plus(index)">
                                    <el-icon>
                                        <ZoomIn />
                                    </el-icon>
                                </div>

                                <div class="icon2" @click="Remove(index)">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                </div>
                            </div>
                        </div>
                        <!-- 空状态 -->
                        <el-empty :image-size="100" description="暂无裁剪的图片" v-show="ImgList.length === 0" />
                    </div>
                    <div class="title">
                        <el-alert title="已裁剪的图片列表" type="success" center :closable="false" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="alter" v-if="dialogVisible" @click="hideDialog">
        <div class=" alterBox" v-if="dialogVisible" @click="hideDialog">
            <el-icon class="alterClose">
                <Close />
            </el-icon>
            <img :src="ShowImg" />
        </div>
    </div>
</template>
<script>
export default {
    name: "mCroppingImage",
};
</script>
<script  setup>
import { ref } from 'vue';
import { // 引入组件的图标
    Delete, ZoomIn, Close
} from "@element-plus/icons-vue";
import CroppingImageCanvas from "./components/CroppingImageCanvas.vue";
import { ElMessage } from 'element-plus'
const props = defineProps({
    nums: {
        type: Number,
        default: 5
    },
})
const ImgList = ref([])
const dialogVisible = ref(false)
const ShowImg = ref(null)
const deleteStyleShow = ref(-1)

const saveImage = (payload) => {
    if (ImgList.value.length < 5) {
        ImgList.value.push(payload)
        ElMessage({
            message: '裁剪图片保存成功',
            type: 'success',
        })
    } else {
        ElMessage({
            message: '最多裁剪5张图片哦~',
            type: 'warning',
        })
    }
}
const Plus = (index) => {
    dialogVisible.value = true
    console.log(dialogVisible.value);
    ShowImg.value = ImgList.value[index]
}
const hideDialog = () => {
    dialogVisible.value = false
    ShowImg.value = null
}
const Remove = (index) => {
    console.log('删除元素');
    ImgList.value.splice(index, 1)
}
const handleMouseEnter = (index) => {
    deleteStyleShow.value = index
}
const handleMouseLeave = () => {
    deleteStyleShow.value = -1
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>