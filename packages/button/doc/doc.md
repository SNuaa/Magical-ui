<script setup>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import demo4 from './demo4.vue'
import demo5 from './demo5.vue'
import demo6 from './demo6.vue'
import Attributes from './Attributes.vue'
import preview from '@/components/preview.vue'
</script>

# Button 按钮

#### 小小的按钮，大大的作用

<br/>

## 基本使用

####  _type_ 属性可以配置不同的按钮类型，展示不同的颜色状态；_round_ 属性可以将按钮变成圆角风格的按钮；_leftIcon_，_rightIcon_ 属性可配置内容前后的图标

<br/>

<div class="componetnsBox">
  <demo1/>
</div>
<preview compName="button" demoName="demo1"/>

## 不同大小

#### _size_ 属性可以配置不同尺寸的按钮

<br/>
<div class="componetnsBox">
  <demo3/>
</div>
<preview compName="button" demoName="demo3"/>

## 图标按钮

#### _leftIcon_ 或 _rightIcon_ 属性可配置内容前后的图标

<br/>
<div class="componetnsBox">
  <demo4/>
</div>
<preview compName="button" demoName="demo4"/>

## 禁用状态

#### _disabled_ 属性可以将按钮变成禁用状态

<br/>
<div class="componetnsBox">
  <demo2/>
</div>
<preview compName="button" demoName="demo2"/>


## 加载状态

#### _loading_ 和 _leftIcon_ 或者 _rightIcon_ 属性可配置按钮正在加载状态，并可配置图标出现的位置

<br/>
<div class="componetnsBox">
  <demo5/>
</div>
<preview compName="button" demoName="demo5"/>

## 自定义颜色

####  _type_ 为 _custom_ 和 _customColor_ 属性设置实现自定义按钮颜色。 tips：需要注意的是 _type_ 为 _default_、_dashed_、_text_ 类型的按钮不支持自定义

<br/>
<div class="componetnsBox">
  <demo6/>
</div>
<preview compName="button" demoName="demo6"/>

## Attributes 参数

<Attributes/>
<br/>
