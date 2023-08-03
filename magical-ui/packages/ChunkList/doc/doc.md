<script setup>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import Attributes from './Attributes.vue'
import preview from '@/components/preview.vue'
</script>

# ChunkList 分片渲染列表

#### 主要原理是通过浏览器的事件循环机制，分割渲染时间。与分片加载之前对比，确实快了许多。但这种方案会导致页面的 dom 元素过多，依旧容易造成卡顿。(持续开发中......)

<br/>

## 基本用法

#### 默认情况下，会自动模拟10000条数据

<div class="componetnsBox">
  <demo1/>
</div>
<preview compName="ChunkList" demoName="demo1"/>

## 传参

#### 设置 _Data_ 属性传入要渲染的数据

<div class="componetnsBox">
  <demo2/>
</div>
<preview compName="ChunkList" demoName="demo2"/>

## Attributes 参数

<Attributes/>
<br/>
