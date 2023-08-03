<script setup>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import demo4 from './demo4.vue'
import demo5 from './demo5.vue'
import Attributes from './Attributes.vue'
import Event from './Events.vue'
import preview from '@/components/preview.vue'
</script>

# Pagination 分页

#### 对数据进行分页展示（不完善，持续开发中......）

<br/>

## 基本使用

#### Pagination 组件基本使用示例。

<div class="componetnsBox">
  <demo1/>
</div>
<preview compName="pagination" demoName="demo1"/>

## 控制当前显示的页数

#### 通过 _pageNo_ 属性设置当前显示的页数

<div class="componetnsBox">
  <demo2/>
</div>
<preview compName="pagination" demoName="demo2"/>

## 每一页展示的数据量

#### 通过 _pageSize_ 设置每一页展示的多少条数据

<div class="componetnsBox">
  <demo3/>
</div>
<preview compName="pagination" demoName="demo3"/>

## 设置数据总数

#### 通过 _total_ 设置数据总数

<div class="componetnsBox">
  <demo4/>
</div>
<preview compName="pagination" demoName="demo4"/>

## 分页器的连续页码数

#### 通过 _continues_ 设置分页器的连续页码数

<div class="componetnsBox">
  <demo5/>
</div>
<preview compName="pagination" demoName="demo5"/>


## attributes 参数

<Attributes/>
<br/>

## ActiveColors 配置项

<ActiveColors/>
<br/>

## Event 事件

<Event/>
<br/>
