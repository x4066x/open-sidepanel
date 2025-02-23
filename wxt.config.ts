import { defineConfig } from 'wxt';
import { defineConfig as defineViteConfig } from 'vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  manifestVersion: 3,
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['sidePanel', 'windows', 'host_permissions'],
    host_permissions: [
      'https://api.example.com/*',
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
    reloadPages: false
    // MEMO: reloadPagesの設定をしないとサイドパネルアイコンが開かないため記入
  },
  vite: () => defineViteConfig({
    define: {
      'process.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY)
    }
  })
});
