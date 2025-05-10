const generateEventUrl = (eventId) =>
  `${GOOGLE_CALENDAR_EVENT_BASE_URL}${eventId}`;

const getEventTitle = () =>
  document.querySelector(GOOGLE_CALENDAR_DOM_SELECTORS.TITLE_CLASS)?.dataset
    .text || "";

/**
 * イベントURLをクリップボードにコピー
 * ※ タイトルが提供された場合はリッチテキストとしてコピー
 */
const copyToClipboard = async (eventUrl, svgElement, title = "") => {
  try {
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
      await navigator.clipboard.writeText(eventUrl);
    }

    // コピー成功時のアニメーション
    animateCopyButtonClick(svgElement);
  } catch (error) {
    logError("Failed to copy to clipboard:", error);

    // リッチテキストコピーに失敗した場合、URLのみをコピーを試みる
    if (title) {
      try {
        await navigator.clipboard.writeText(eventUrl);
        animateCopyButtonClick(svgElement);
      } catch (error) {
        logError("Failed to copy URL:", error);
      }
    }
  }
};

/**
 * 現在表示されているイベントのURLをクリップボードにコピー
 * ユーザー設定に基づき、タイトル付きまたはURLのみをコピー
 */
const copyEventUrlToClipboard = (svgElement) => {
  // イベントIDを取得
  const eventModal = document.getElementById(
    GOOGLE_CALENDAR_DOM_SELECTORS.EVENT_MODAL_ID
  );
  if (!eventModal) {
    logError("Event modal not found");
    return;
  }

  const eventId = eventModal.dataset.eventid;
  if (!eventId) {
    logError("Event ID not found");
    return;
  }

  const eventUrl = generateEventUrl(eventId);

  // ユーザー設定を取得してコピー方法を決定
  chrome.storage.sync.get(STORAGE_KEYS.WITH_TITLE_ENABLED, (data) => {
    const title = data[STORAGE_KEYS.WITH_TITLE_ENABLED] ? getEventTitle() : "";
    copyToClipboard(eventUrl, svgElement, title);
  });
};
