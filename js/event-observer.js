/**
 * イベントモーダルにコピーボタンを追加
 */
const addCopyButtonToModal = () => {
  // ボタンを追加するコンテナを取得
  const container = document.querySelector(
    GOOGLE_CALENDAR_DOM_SELECTORS.HEAD_CLASS
  );

  // コンテナが存在し、かつまだボタンが追加されていない場合
  if (container && !container.querySelector(`#${COPY_BUTTON_ID}`)) {
    // コピーボタンを作成
    const copyButton = createCopyButton(copyEventUrlToClipboard);

    // コンテナの最後から2番目に挿入（「閉じる」ボタンの前）
    container.insertBefore(
      copyButton,
      container.children[container.children.length - 1]
    );
  }
};

/**
 * DOM変更を監視するコールバック関数
 */
const observerCallback = (mutationsList) => {
  // イベントモーダルが表示されたかチェック
  const isEventModalVisible = mutationsList.some(
    (mutation) =>
      mutation.type === "childList" &&
      document.getElementById(GOOGLE_CALENDAR_DOM_SELECTORS.EVENT_MODAL_ID)
  );

  // イベントモーダルが表示された場合、コピーボタンを追加
  if (isEventModalVisible) addCopyButtonToModal();
};

/**
 * DOM変更を監視するオブザーバーを初期化
 */
const initObserver = () => {
  try {
    const observer = new MutationObserver(observerCallback);

    // body要素の子要素の変更を監視
    observer.observe(document.body, { childList: true, subtree: true });

    logInfo("DOM observation started");

    return observer;
  } catch (error) {
    logError("Failed to initialize observer:", error);
    return null;
  }
};
