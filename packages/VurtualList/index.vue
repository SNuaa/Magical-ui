<template>
        <div shadow="hover" class="box-card">
            <!-- <div class="title">
                <el-page-header content="虚拟列表" icon="" title="超长列表优化" />
            </div> -->
            <div class="Bottom">
                <div v-show="items.length === 0" class="description">
                    <el-empty description="暂无模拟数据" />
                </div>
                <!-- 每一项的高度是35+6+6=47 所以size的值设置成47  -->
                <virtual_list v-if="items.length !== 0" :size="47" :remain="8" :items="items" :variable="variable">
                </virtual_list>
            </div>
            <div class="Top">
                <div class="box-top">
                    <el-radio-group v-model="radio" @change="handlechange">
                        <el-radio :label="false" size="large" border>点击生成模拟数据-列表项高度固定</el-radio>
                        <el-radio :label="true" size="large" border class="button">点击生成模拟数据-列表项高度不固定</el-radio>
                    </el-radio-group>
                    <el-button type="success" size="large" class="button" @click="vurtualList">点击生成虚拟列表</el-button>
                </div>
                <!-- <div class="box-top">
                <el-progress class="progress" :percentage="datapercentage" />
            </div> -->
            </div>
            <div class="description">
                <el-alert show-icon title="虚拟列表渲染机制: 主要原理是只渲染可视区域" type="warning" :closable="false" />
            </div>
        </div>
</template>
<script>
import { reactive, ref } from 'vue'
export default {
    name: "mVurtualList"
}
</script>
<script  setup>
// 不固定高度的虚拟列表抖动的问题  前面还有一个需求没有解决！！！！！！！！！！！！
import virtual_list from "./components/virtual_list.vue";
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import Mock from 'mockjs'
const items = reactive([]);
const items_temp = reactive([]);
const total = 10000
// const total = 10000
const datapercentage = ref(0)
const radio = ref(null)
const variable = reactive({ value: false })
const handlechange = () => {
    mockData()
}
const mockData = () => {
    let mockdata = null
    items_temp.splice(0)
    items.splice(0)
    for (let i = 0; i < total; i++) {
        mockdata = radio.value === false ? Mock.mock('@guid') : Mock.mock('@sentence(3, 55)')
        items_temp.push({ id: i, value: mockdata });
        datapercentage.value = i / 10
    }
    datapercentage.value = 100
    ElMessage({
        message: '10000条模拟数据已经生成',
        type: 'success',
    })
}
const vurtualList = () => {
    if (items_temp.length === 0) {
        ElMessage({
            message: '请先生成模拟数据',
            type: 'warning',
        })
        return
    }
    items_temp.map((el) => {
        items.push(el)
    })
    variable.value = radio.value
    ElMessage({
        message: '请滑动查看超长列表',
        type: 'success',
    })
}
</script>
<style lang="scss" scoped>
.box-card {
    // background-color: #ecabab;
    height: 510px;
    color: #606266;
    border-radius: 10px;
    padding-top: 5px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .title {
        margin-bottom: 20px;
    }

    .Top {
        .box-top {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 20px;

            .button {
                margin-right: 32px;
            }

            .progress {
                flex: 1;
            }
        }
    }


    .Bottom {
        border: 1px solid #ddd;
        border-radius: 1px;
        height: 375px;
        position: relative;
        margin-bottom: 20px;

        .description {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>