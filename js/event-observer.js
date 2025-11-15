/**
 * ボタンのツールチップを更新
 */
const updateButtonTooltip = (button, withTitleEnabled) => {
  const status = withTitleEnabled ? "ON" : "OFF";
  button.title = `Copy event URL to clipboard\nCopy with title: ${status}\n(Right-click to toggle)`;
};

/**
 * オプションをトグルする
 */
const toggleCopyWithTitleOption = (button) => {
  chrome.storage.sync.get(STORAGE_KEYS.WITH_TITLE_ENABLED, (data) => {
    const currentValue = data[STORAGE_KEYS.WITH_TITLE_ENABLED] || false;
    const newValue = !currentValue;

    chrome.storage.sync.set(
      { [STORAGE_KEYS.WITH_TITLE_ENABLED]: newValue },
      () => {
        updateButtonTooltip(button, newValue);
        logInfo(`Copy with title option toggled: ${newValue}`);
      }
    );
  });
};

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
    const copyButton = createCopyButton(
      copyEventUrlToClipboard,
      toggleCopyWithTitleOption
    );

    // 初期のツールチップを設定
    chrome.storage.sync.get(STORAGE_KEYS.WITH_TITLE_ENABLED, (data) => {
      updateButtonTooltip(
        copyButton,
        data[STORAGE_KEYS.WITH_TITLE_ENABLED] || false
      );
    });

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
