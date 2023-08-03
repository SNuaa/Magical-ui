<script setup>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import Attributes from './Attributes.vue'
import preview from '@/components/preview.vue'
</script>

# Space 间距

#### 在多个组件或元素之间设置间距

<br/>

## 基本用法

#### space 的基本用法

<div class="componetnsBox">
  <demo1/>
</div>
<preview compName="Space" demoName="demo1"/>

## 纵向间距

#### 设置 _inline_ 为 _false_ 即可

<div class="componetnsBox">
  <demo2/>
</div>
<preview compName="Space" demoName="demo2"/>

## 自定义间距大小

#### 通过设置 _size_ 属性，您可以自定义间距大小。_size_ 属性接受一个数组，其中第一个值代表垂直间距，第二个值代表水平间距。如果 _inline_ 属性为 _false_，则只会应用第一个值作为间距。

<div class="componetnsBox">
  <demo3/>
</div>
<preview compName="Space" demoName="demo3"/>

## Attributes 参数

<Attributes/>
<br/>
