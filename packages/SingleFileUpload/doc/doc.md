<script setup>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import Attributes from './Attributes.vue'
import preview from '@/components/preview.vue'
</script>

# SingleFileUpload 单文件上传

#### 提供三种格式的单文件上传操作，持续开发完善中......

<br/>

## 二进制传输

#### 通过Form-Data对象获取上传文件，仅支持选择单个文件进行上传。

<br/>

<div class="componetnsBox">
  <demo1/>
</div>
<preview compName="SingleFileUpload" demoName="demo1"/>

## Base64传输

#### 把文件转为Base64的字符串进行传输；选择文件即可自动上传；实时显示文件的上传进度；实时显示已上传的文件列表。

<br/>
<div class="componetnsBox">
  <demo2/>
</div>
<preview compName="SingleFileUpload" demoName="demo2"/>

## 二进制传输

#### 通过Form-Data对象获取上传文件，并生成文件的Hash；可显示文件的缩略图；可选择文件列表进行删除，上传等操作。
<br/>
<div class="componetnsBox">
  <demo3/>
</div>
<preview compName="SingleFileUpload" demoName="demo3"/>

## Attributes 参数

<Attributes/>
<br/>
