export default defineBackground(() => {
  // 拡張機能起動時にサイドパネルを設定
  browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

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
