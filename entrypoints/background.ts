import { processMessage } from '../src/core/services/openaiService';

export default defineBackground(() => {
  // 拡張機能起動時にサイドパネルを設定
  browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  // メッセージハンドラーの設定
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SEND_MESSAGE') {
      // OpenAI APIを使用してメッセージを処理
      (async () => {
        const response = await processMessage(message);
        sendResponse(response);
      })();
      return true; // 非同期レスポンスを示す
    }
  });

  // アイコンクリック時にサイドパネルを開く（フォールバック）
  browser.action.onClicked.addListener(async () => {
    try {
      const currentWindow = await browser.windows.getCurrent();
      if (currentWindow.id === undefined) {
        throw new Error('Window ID is undefined');
      }
      await browser.sidePanel.open({
        windowId: currentWindow.id
      });
    } catch (error) {
      console.error('Failed to open side panel:', error);
    }
  });
});
