<template>
    <div ref="viewportRef" class="viewport" @scroll="handleScroll">
        <div ref="scrollBarRef" class="scrollBar"></div>
        <div class="scroll-list" :style="{ transform: `translate3d(0,${offset}px,0)` }">
            <div class="item" v-for="(item, index) in visibleData" :key="item.id" :ref="el => itemsRef[index] = el"
                :vid="item.index">
                <div class="item_value">
                    {{ item.value }}
                </div>
            </div>
        </div>
    </div>
</template>

<script  setup>
import { ref, defineProps, onMounted, onUpdated, reactive, computed, nextTick } from 'vue'
import { throttle } from 'lodash';
const { items, size, remain, variable } = defineProps({
    items: Array,
    size: Number,
    remain: Number,
    // variable必须是一个响应式的属性
    variable: Object,
});
const start = ref(0)
const end = ref(0)
const offset = ref(0)
const viewportRef = ref(null)
const scrollBarRef = ref(null)
const itemsRef = reactive([])
const positions = reactive([])
const formatData = computed(() => {
    return items.map((item, index) => ({ ...item, index }))
})
const visibleData = computed(() => {
    let startData = start.value - prevCount.value;
    let endData = end.value + nextCount.value;
    return formatData.value.slice(startData, endData);
})
const prevCount = computed(() => {
    return Math.min(start.value, remain);
})
const nextCount = computed(() => {
    return Math.min(items.length - end.value, remain);
})

onMounted(() => {
    viewportRef.value.style.height = remain * size + "px";
    scrollBarRef.value.style.height = items.length * size + "px";
    end.value = start.value + remain;
    if (variable.value) {
        initPosition();
    }
    // console.log(itemsRef[0].getBoundingClientRect().height);
    // console.log(document.querySelector(".viewport").getBoundingClientRect());
})

onUpdated(() => {
    nextTick(() => {
        if (variable.value) {
            let nodes = itemsRef;
            if (!(nodes && nodes.length > 0)) {
                return
            }
            nodes.forEach((node, index) => {
                // console.log(node);
                if (node !== null) {
                    let rect = node.getBoundingClientRect();
                    // console.log(rect);
                    let height = rect.height;
                    let index = +node.getAttribute('vid');
                    let oldHeight = positions[index].height;
                    let val = oldHeight - height;
                    if (val) {
                        positions[index].bottom = positions[index].bottom - val;
                        positions[index].height = height;
                        for (let i = index + 1; i < positions.length; i++) {
                            positions[i].top = positions[i - 1].bottom;
                            positions[i].bottom = positions[i].bottom - val;
                        }
                    }
                }
            })
            scrollBarRef.value.style.height = positions[positions.length - 1].bottom + 'px';
        }
    });
});

const initPosition = () => {
    for (let index = 0; index < items.length; index++) {
        positions.push({
            index,
            height: size,
            top: index * size,
            bottom: (index + 1) * size,
        })
    }
}
const getStartIndex = (value) => {
    let start = 0;
    let end = positions.length;
    let temp = null;
    while (start < end) {
        let middleIndex = parseInt((start + end) / 2);
        let middleValue = positions[middleIndex].bottom;
        if (value == middleValue) {
            return middleIndex + 1;
        } else if (middleValue < value) {
            start = middleIndex + 1;
        } else if (middleValue > value) {
            if (temp == null || temp > middleIndex) {
                temp = middleIndex;
            }
            end = middleIndex - 1;
        }
    }
    return temp;
}
const handleScroll = throttle((event) => {
    let scrollTop = viewportRef.value.scrollTop;
    console.log("滚动条的高度：" + scrollTop);
    if (variable.value) {
        start.value = getStartIndex(scrollTop);
        end.value = start.value + remain;
        console.log('开始的位置:' + start.value);
        console.log('开始的位置:' + prevCount.value);
        console.log('positions:' + positions[start.value].top);
        console.log('positions:' + positions[prevCount.value].top);
        console.log('positions:' + positions[start.value - prevCount.value].top);
        offset.value = positions[start.value - prevCount.value] ? positions[start.value - prevCount.value].top : 0;
        console.log('偏移的位置:' + offset.value);
    } else {
        start.value = Math.floor(scrollTop / size);
        end.value = start.value + remain;
        offset.value = (start.value - prevCount.value) * size;
    }
}, 200, { leading: false });

</script>
<style lang="scss" scoped>
.viewport {
    overflow-y: scroll;
    position: relative;
    height: 100%;
}

//调一下高度~~~~~~~~~~~~~~~~~~~~~~~
.scroll-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    // 每一项的高度是35+6+6=47
    .item {
        // font-size: 18px;
        padding: 6px 0;
        margin: 0 20px;
        box-sizing: border-box;

        .item_value {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            padding: 6px 0;

            &:hover {
                background-color: #ddd;
            }

        }

    }
}

/* 自定义滚动条样式 */
.viewport::-webkit-scrollbar {
    width: 6px;
    // width: 15px;
    /* 设置滚动条的宽度 */
}

.viewport::-webkit-scrollbar-track {
    background-color: #ffffff;
    /* 设置滚动条背景颜色 */
}

.viewport::-webkit-scrollbar-thumb {
    background-color: #409eff;
    /* 设置滚动条滑块颜色 */
    border-radius: 3px;
    /* 设置滚动条滑块的圆角 */
}

/* 鼠标悬停在滚动条上的样式 */
.viewport::-webkit-scrollbar-thumb:hover {
    background-color: #67c23a;
    /* 设置滚动条滑块在悬停时的颜色 */
}
</style>