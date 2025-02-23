import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  manifestVersion: 3,
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['sidePanel', 'windows', 'host_permissions'],
    host_permissions: ['https://api.example.com/*'],
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
  }
});
