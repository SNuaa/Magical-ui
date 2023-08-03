<script setup>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import demo4 from './demo4.vue'
import demo5 from './demo5.vue'
import demo6 from './demo6.vue'
import demo7 from './demo7.vue'
import demo8 from './demo8.vue'
import Attributes from './Attributes.vue'
import Event from './Events.vue'
import preview from '@/components/preview.vue'
</script>

# Input 输入框

#### 通过鼠标或键盘输入字符

<br/>

## 基本用法

#### 通过 _v-model_ 绑定一个值

<div class="componetnsBox">
  <demo1/>
</div>
<preview compName="input" demoName="demo1"/>

## 禁用状态

#### 通过 _disabled_ 属性指定是否禁用 input 组件

<div class="componetnsBox">
  <demo2/>
</div>
<preview compName="input" demoName="demo2"/>

## 带图标

#### 通过 _leftIcon_ 或者 _rightIcon_ 属性在 _input_ 组件的首尾显示图标。若定义了右侧显示图标，那 _clearable_ 将不再起作用

<div class="componetnsBox">
  <demo4/>
</div>
<preview compName="input" demoName="demo4"/>

## 不同大小

#### 通过用 _size_ 属性改变输入框大小。

<div class="componetnsBox">
  <demo5/>
</div>
<preview compName="input" demoName="demo5"/>

## 可清空数据

#### 通过 _clearable_ 属性可一键清空输入框

<div class="componetnsBox">
  <demo3/>
</div>
<preview compName="input" demoName="demo3"/>


## 密码类型

#### 通过 _showPassword_ 来启用是否开启显示密码。

<div class="componetnsBox">
  <demo7/>
</div>
<preview compName="input" demoName="demo7"/>

## 自定义 Focus 颜色

#### 通过 _focusColor_ 属性自定义 input 在获取焦点后的颜色

<div class="componetnsBox">
  <demo8/>
</div>
<preview compName="input" demoName="demo8"/>

## 组合输入

#### 通过插槽完成组合输入，插槽名默认为 _btn_

<div class="componetnsBox">
  <demo6/>
</div>
<preview compName="input" demoName="demo6"/>

## Attributes 参数

<Attributes/>
<br/>

## Event 事件

<Event/>
<br/>
