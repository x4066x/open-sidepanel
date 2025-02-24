import { defineConfig } from 'wxt';
import { defineConfig as defineViteConfig } from 'vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  extensionApi: 'chrome',
  manifestVersion: 3,
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['sidePanel', 'storage', 'scripting', 'host_permissions'],
    host_permissions: [
      'https://api.openai.com/*'
    ],
    side_panel: {
      default_path: '/sidepanel/index.html'
    },
    action: {}
  },
  dev: {
    server: {
      port: 8080
    },
    // MEMO: reloadPagesの設定をしないとサイドパネルアイコンが開かないため記入
    reloadPages: false
  },
  // MEMO: この行がサイドパネルのボタンアクションを左右している。viteConfigが必要みたいだ。
  // 根本的にはViteをラップしているWXTのバグか仕様で、ViteConfigをこのように更新しようと
  // した場合に動作する部分が生成したコードにより、出来るできないが変わるんじゃないかと思う
  vite: () => defineViteConfig({
    define: {
      'process.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY)
    }
  })
});
