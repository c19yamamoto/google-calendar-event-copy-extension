// Google Calendar の DOM要素の識別子
const GOOGLE_CALENDAR_DOM_SELECTORS = {
  // イベントモーダルのID
  EVENT_MODAL_ID: "xDetDlg",
  // 挿入するコンテナのクラス
  HEAD_CLASS: ".pPTZAe",
  // Google Calendar の タイトル情報を持つクラス
  TITLE_CLASS: ".UfeRlc",
};

// 追加するボタンのID
const COPY_BUTTON_ID = "copy-event-svg";

// SVG 関連の定数
const SVG_ICONS = {
  // 名前空間
  NAMESPACE: "http://www.w3.org/2000/svg",
  // アイコンのサイズ（ピクセル）
  SIZE: 20,
};

// クリックアニメーションの持続時間（ミリ秒）
const CLICK_DURATION = 200;

// ステータスメッセージの表示時間（ミリ秒）
const OPTION_STATUS_MESSAGE_DURATION = 750;

// Google Calendarイベントの基本URL
const GOOGLE_CALENDAR_EVENT_BASE_URL =
  "https://www.google.com/calendar/event?eid=";

// ストレージキー
const STORAGE_KEYS = {
  // タイトル付きコピー機能の有効/無効設定キー
  WITH_TITLE_ENABLED: "withTitleEnabled",
};
