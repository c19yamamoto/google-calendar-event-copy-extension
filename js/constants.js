/**
 * Google Calendarイベントコピー拡張機能の定数
 */

// DOM要素の識別子
const DOM_SELECTORS = {
  // イベントモーダルのID
  EVENT_MODAL_ID: 'xDetDlg',
  // 挿入するコンテナのクラス
  HEAD_CLASS: '.pPTZAe',
  // タイトル情報を持つクラス
  TITLE_CLASS: '.UfeRlc',
  // 追加するSVGボタンのID
  COPY_BUTTON_ID: 'copy-event-svg',
};

// SVG関連の定数
const SVG_CONSTANTS = {
  // SVG名前空間
  NAMESPACE: 'http://www.w3.org/2000/svg',
};

// アニメーション関連の定数
const ANIMATION = {
  // クリックアニメーションの持続時間（ミリ秒）
  CLICK_DURATION: 200,
};

// URL関連の定数
const URL = {
  // Google Calendarイベントの基本URL
  EVENT_BASE_URL: 'https://www.google.com/calendar/event?eid=',
};

// ストレージキー
const STORAGE_KEYS = {
  // タイトル付きコピー機能の有効/無効設定キー
  WITH_TITLE_ENABLED: 'withTitleEnabled',
};
