/**
 * クリップボード操作に関するユーティリティ
 */

/**
 * イベントIDからイベントURLを生成
 */
const generateEventUrl = eventId => `${EVENT_BASE_URL}${eventId}`;

/**
 * イベントのタイトルを取得
 */
const getEventTitle = () =>
  document.querySelector(DOM_SELECTORS.TITLE_CLASS)?.dataset.text || "";

/**
 * イベントURLをクリップボードにコピー
 * タイトルが提供された場合はリッチテキストとしてコピー、そうでない場合はURLのみをコピー
 */
const copyToClipboard = async (eventUrl, svgElement, title = "") => {
  try {
    // タイトルが提供されている場合はリッチテキストとしてコピー
    if (title) {
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
    } else {
      // タイトルがない場合はURLのみをコピー
      await navigator.clipboard.writeText(eventUrl);
    }

    // コピー成功時のアニメーション
    animateSvgClick(svgElement);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);

    // リッチテキストコピーに失敗した場合、URLのみをコピーを試みる
    if (title) {
      try {
        await navigator.clipboard.writeText(eventUrl);
        animateSvgClick(svgElement);
      } catch (fallbackError) {
        console.error("Failed to copy URL as fallback:", fallbackError);
      }
    }
  }
};

/**
 * 現在表示されているイベントのURLをクリップボードにコピー
 * ユーザー設定に基づき、タイトル付きまたはURLのみをコピー
 */
const copyEventUrlToClipboard = svgElement => {
  // イベントIDを取得
  const eventModal = document.getElementById(DOM_SELECTORS.EVENT_MODAL_ID);
  if (!eventModal) {
    console.error("Event modal not found");
    return;
  }

  const eventId = eventModal.dataset.eventid;
  if (!eventId) {
    console.error("Event ID not found");
    return;
  }

  const eventUrl = generateEventUrl(eventId);

  // ユーザー設定を取得してコピー方法を決定
  chrome.storage.sync.get(STORAGE_KEYS.WITH_TITLE_ENABLED, data => {
    const title = data[STORAGE_KEYS.WITH_TITLE_ENABLED] ? getEventTitle() : "";
    copyToClipboard(eventUrl, svgElement, title);
  });
};
