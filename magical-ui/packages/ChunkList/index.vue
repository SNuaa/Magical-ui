<template>
    <div shadow="hover" class="box-card">
        <!-- <div class="title">
            <el-page-header content="分片渲染机制" icon="" title="超长列表优化" />
        </div> -->
        <div class="Top">
            <!-- <div class="box-top">
                <m-button type="primary" size="large" class="button" @click="mockData">点击生成模拟数据</m-button>
                <el-progress class="progress" :percentage="datapercentage" />
            </div> -->
            <div class="box-top">
                <m-button type="success" size="large" class="button" @click="chunkList">点击进行分片渲染</m-button>
                <el-progress class="progress" :percentage="chunkpercentage" status="success" />
            </div>
        </div>
        <!-- <div class="description">
            <el-alert show-icon title="分片渲染机制" type="warning" :description="descriptionText" :closable="false" />
        </div> -->
        <div class="Bottom">
            <div>
                <el-empty description="暂无模拟数据" v-show="items.length === 0" />
            </div>
            <ul ref="listRef" v-show="items.length != 0">
            </ul>
        </div>
    </div>
</template>
<script>
import { reactive, ref } from 'vue'
export default {
    name: "mChunkList"
}
</script>
<script  setup>
import { ref, reactive, watch } from 'vue'

import { ElMessage } from 'element-plus'
import Mock from 'mockjs'

const props = defineProps({
    Data: {
        type: Array,
        default: []
    },
})
const items = reactive([]);
const total = 10000
const index = ref(0)
const datapercentage = ref(0)
const chunkpercentage = ref(0)
const listRef = ref(null)
const descriptionText = '主要原理是通过浏览器的事件循环机制，分割渲染时间。与分片加载之前对比，确实快了许多。但这种方案会导致页面的 dom 元素过多，依旧容易造成卡顿。'
watch(index, () => {
    chunkpercentage.value = (index.value / total) * 100;
});
watch(chunkpercentage, () => {
    if (chunkpercentage.value === 100) {
        ElMessage({
            message: '分片渲染完成',
            type: 'success',
        })
    }
});

const mockData = () => {
    let mockdata = null
    items.splice(0)
    for (let i = 0; i < total; i++) {
        mockdata = Mock.Random.guid()
        mockdata = Mock.mock('@color')
        console.log(mockdata);
        items.push({ id: i, value: mockdata });
        datapercentage.value = i / 10
    }
    datapercentage.value = 100
    ElMessage({
        message: '未传入数据,为您模拟10000条数据',
        type: 'success',
    })
}

const chunkList = () => {
    if (props.Data.length === 0) {
        mockData()
    } else {
        items.splice(0)
        props.Data.map((data,index) => {
            items.push({ id: index, value: data });
        })
    }
    if (items.length === 0) {
        ElMessage({
            message: '请先传入数据',
            type: 'warning',
        })
        return
    }
    load()
}

const load = () => {
    index.value += 20;
    if (index.value < total) {
        requestAnimationFrame(() => {
            let fragment = document.createDocumentFragment();
            for (let i = 0; i < 20; i++) {
                let li = document.createElement('li');
                li.innerHTML = items[i].value;
                li.style.padding = '3px';
                li.style.margin = '3px';
                if (props.Data.length === 0) {
                    li.style.backgroundColor = items[i].value;
                }
                li.style.width = '70px';
                fragment.appendChild(li);
            }
            listRef.value.appendChild(fragment);
            load();
        });
    }
}

</script>
<style lang="scss" scoped>
.box-card {
    height: 350px;
    color: #606266;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // background-color: #d02020;

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
                margin-right: 20px;
            }

            .progress {
                flex: 1;
            }
        }
    }

    .description {
        margin-bottom: 20px;
    }

    .Bottom {
        border: 1px solid #ddd;
        border-radius: 10px;
        height: 275px;
        display: flex;
        justify-content: center;
        align-items: center;

        ul {
            width: 100%;
            height: 100%;
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: auto;
        }
    }

    /* 自定义滚动条样式 */
    ul::-webkit-scrollbar {
        height: 6px;
        /* 设置滚动条的宽度 */
    }

    ul::-webkit-scrollbar-track {
        background-color: #ffffff;
        /* 设置滚动条背景颜色 */
    }

    ul::-webkit-scrollbar-thumb {
        background-color: #0e80eb;
        /* 设置滚动条滑块颜色 */
        border-radius: 3px;
        /* 设置滚动条滑块的圆角 */
    }

    /* 鼠标悬停在滚动条上的样式 */
    ul::-webkit-scrollbar-thumb:hover {
        background-color: #09b63d;
        /* 设置滚动条滑块在悬停时的颜色 */
    }
}
</style>