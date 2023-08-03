import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import magicalUI from "../packages/index";
import router from "@/router";
import hljs from "highlight.js";
// import mzlUI from "magical-ui-sr";
import ElementPlus from 'element-plus'// 引入element-plus组件库
import 'element-plus/dist/index.css'// 引入样式

const app = createApp(App);
app.use(magicalUI);
app.use(router);

hljs.configure({
    ignoreUnescapedHTML: true,
    languages: [
        "javascript",
        "css",
        "python",
        "html",
        "bash",
        "java",
        "sql",
        "json",
        "http",
        "go",
        "c++",
        "c#",
        "",
    ],
});
app.directive("highlight", function (el) {
    const blocks = el.querySelectorAll("pre code");
    blocks.forEach((block) => {
        hljs.highlightBlock(block);
    });
});

app.mount("#app");