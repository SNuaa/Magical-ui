# 快速上手

<br>

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

需要注意的是 css 样式文件需要您单独引入。

```javascript
import { createApp } from "vue";
import App from "@/App.vue";
import MagicalUI from "magical-ui-sr";
import "../node_modules/magicalUi-ui/dist/style.css";

const app = createApp(App);
app.use(MagicalUI);
app.mount("#app");
```

<br>

## 按需引入

为了减小体积，只希望引入部分组件，可以使用按需引入的方式。

按需引用时不需要使用 app.use()方法注册。

```javascript
import { mButton, mInput } from "magical-ui-sr";
```

<br>

```html
<m-button>点击</m-button>
<m-input v-model="value" placeholder="基本使用"></m-input>
```
