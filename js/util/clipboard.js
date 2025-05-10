/**
 * クリップボード操作に関するユーティリティ
 */

/**
 * イベントIDからイベントURLを生成
 */
const generateEventUrl = (eventId) => {
  return `${URL.EVENT_BASE_URL}${eventId}`;
};

/**
 * イベントのタイトルを取得
 */
const getEventTitle = () => {
  const titleElement = document.querySelector(DOM_SELECTORS.TITLE_CLASS);
  return titleElement?.dataset.text || "";
};

/**
 * イベントURLをクリップボードにコピー（タイトルなし）
 */
const copyUrlOnly = async (eventUrl, svgElement) => {
  try {
    await navigator.clipboard.writeText(eventUrl);
    animateSvgClick(svgElement);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
  }
};

/**
 * イベントURLとタイトルをリッチテキストとしてクリップボードにコピー
 */
const copyUrlWithTitle = async (eventUrl, title, svgElement) => {
  try {
    const eventData = {
      title: title,
      html: `<a href="${eventUrl}">${title}</a>`,
    };

    await navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([eventData.title], { type: "text/plain" }),
        "text/html": new Blob([eventData.html], { type: "text/html" }),
      }),
    ]);
    
    animateSvgClick(svgElement);
  } catch (error) {
    console.error('Failed to copy rich text:', error);
    // フォールバック: プレーンテキストのみをコピー
    await copyUrlOnly(eventUrl, svgElement);
  }
};

/**
 * 現在表示されているイベントのURLをクリップボードにコピー
 * ユーザー設定に基づき、タイトル付きまたはURLのみをコピー
 */
const copyEventUrlToClipboard = (svgElement) => {
  // イベントIDを取得
  const eventModal = document.getElementById(DOM_SELECTORS.EVENT_MODAL_ID);
  if (!eventModal) {
    console.error('Event modal not found');
    return;
  }
  
  const eventId = eventModal.dataset.eventid;
  if (!eventId) {
    console.error('Event ID not found');
    return;
  }
  
  const eventUrl = generateEventUrl(eventId);
  
  // ユーザー設定を取得してコピー方法を決定
  chrome.storage.sync.get(STORAGE_KEYS.WITH_TITLE_ENABLED, (data) => {
    if (data[STORAGE_KEYS.WITH_TITLE_ENABLED]) {
      const title = getEventTitle();
      copyUrlWithTitle(eventUrl, title, svgElement);
    } else {
      copyUrlOnly(eventUrl, svgElement);
    }
  });
};
