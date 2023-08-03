// vite.config.js
import { defineConfig } from "file:///E:/Front/%E7%BB%84%E4%BB%B6%E5%BA%93/Study/Magical-ui/magical-ui/node_modules/vite/dist/node/index.js";
import Vue from "file:///E:/Front/%E7%BB%84%E4%BB%B6%E5%BA%93/Study/Magical-ui/magical-ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Markdown from "file:///E:/Front/%E7%BB%84%E4%BB%B6%E5%BA%93/Study/Magical-ui/magical-ui/node_modules/vite-plugin-md/dist/index.js";
import { resolve } from "path";
import AutoImport from "file:///E:/Front/%E7%BB%84%E4%BB%B6%E5%BA%93/Study/Magical-ui/magical-ui/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/Front/%E7%BB%84%E4%BB%B6%E5%BA%93/Study/Magical-ui/magical-ui/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///E:/Front/%E7%BB%84%E4%BB%B6%E5%BA%93/Study/Magical-ui/magical-ui/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "E:\\Front\\\u7EC4\u4EF6\u5E93\\Study\\Magical-ui\\magical-ui";
var vite_config_default = defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
      // <--
    }),
    Markdown(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  build: {
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ["vue", "highlight.js", "jest", "pinia", "sass", "sass-loader", "vite-plugin-md", "vue-router", "@babel/preset-env", "@vitejs/plugin-vue", "@vue/reactivity", "@vue/test-utils", "babel-jest", "babel-preset-vite", "eslint", "eslint-plugin-vue", "vite", "vue-jest", "commitizen", "cz-conventional-changelog"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue"
        }
      }
    },
    lib: {
      entry: "./packages/index.js",
      name: "magical-ui-sr"
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/styles/style.scss" as *;'
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxGcm9udFxcXFxcdTdFQzRcdTRFRjZcdTVFOTNcXFxcU3R1ZHlcXFxcTWFnaWNhbC11aVxcXFxtYWdpY2FsLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxGcm9udFxcXFxcdTdFQzRcdTRFRjZcdTVFOTNcXFxcU3R1ZHlcXFxcTWFnaWNhbC11aVxcXFxtYWdpY2FsLXVpXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9Gcm9udC8lRTclQkIlODQlRTQlQkIlQjYlRTUlQkElOTMvU3R1ZHkvTWFnaWNhbC11aS9tYWdpY2FsLXVpL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBWdWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IE1hcmtkb3duIGZyb20gXCJ2aXRlLXBsdWdpbi1tZFwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBWdWUoe1xuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLCAvLyA8LS1cbiAgICB9KSxcbiAgICBNYXJrZG93bigpLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gXHU4QkY3XHU3ODZFXHU0RkREXHU1OTE2XHU5MEU4XHU1MzE2XHU5MEEzXHU0RTlCXHU0RjYwXHU3Njg0XHU1RTkzXHU0RTJEXHU0RTBEXHU5NzAwXHU4OTgxXHU3Njg0XHU0RjlEXHU4RDU2XG4gICAgICBleHRlcm5hbDogW1widnVlXCIsIFwiaGlnaGxpZ2h0LmpzXCIsIFwiamVzdFwiLCBcInBpbmlhXCIsIFwic2Fzc1wiLCBcInNhc3MtbG9hZGVyXCIsIFwidml0ZS1wbHVnaW4tbWRcIiwgXCJ2dWUtcm91dGVyXCIsIFwiQGJhYmVsL3ByZXNldC1lbnZcIiwgXCJAdml0ZWpzL3BsdWdpbi12dWVcIiwgXCJAdnVlL3JlYWN0aXZpdHlcIiwgXCJAdnVlL3Rlc3QtdXRpbHNcIiwgXCJiYWJlbC1qZXN0XCIsIFwiYmFiZWwtcHJlc2V0LXZpdGVcIiwgXCJlc2xpbnRcIiwgXCJlc2xpbnQtcGx1Z2luLXZ1ZVwiLCBcInZpdGVcIiwgXCJ2dWUtamVzdFwiLCBcImNvbW1pdGl6ZW5cIiwgXCJjei1jb252ZW50aW9uYWwtY2hhbmdlbG9nXCJdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIFx1NTcyOCBVTUQgXHU2Nzg0XHU1RUZBXHU2QTIxXHU1RjBGXHU0RTBCXHU0RTNBXHU4RkQ5XHU0RTlCXHU1OTE2XHU5MEU4XHU1MzE2XHU3Njg0XHU0RjlEXHU4RDU2XHU2M0QwXHU0RjlCXHU0RTAwXHU0RTJBXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6IFwiVnVlXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogXCIuL3BhY2thZ2VzL2luZGV4LmpzXCIsXG4gICAgICBuYW1lOiBcIm1hZ2ljYWwtdWktc3JcIixcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0B1c2UgXCIuL3NyYy9zdHlsZXMvc3R5bGUuc2Nzc1wiIGFzICo7JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VSxTQUFTLG9CQUFvQjtBQUMzVyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxjQUFjO0FBQ3JCLFNBQVMsZUFBZTtBQUV4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQVBwQyxJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsVUFBVSxPQUFPO0FBQUE7QUFBQSxJQUM3QixDQUFDO0FBQUEsSUFDRCxTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBO0FBQUEsTUFFYixVQUFVLENBQUMsT0FBTyxnQkFBZ0IsUUFBUSxTQUFTLFFBQVEsZUFBZSxrQkFBa0IsY0FBYyxxQkFBcUIsc0JBQXNCLG1CQUFtQixtQkFBbUIsY0FBYyxxQkFBcUIsVUFBVSxxQkFBcUIsUUFBUSxZQUFZLGNBQWMsMkJBQTJCO0FBQUEsTUFDMVQsUUFBUTtBQUFBO0FBQUEsUUFFTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
