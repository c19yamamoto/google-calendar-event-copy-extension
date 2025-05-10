/**
 * SVG要素の作成と操作に関するユーティリティ
 */

/**
 * リンクアイコンのSVG要素を作成
 */
const createSvgElement = () => {
  // object要素を作成してSVGファイルを読み込み
  const obj = document.createElement('object');
  obj.data = chrome.runtime.getURL('assets/images/link-icon.svg');
  obj.type = 'image/svg+xml';
  obj.width = 20;
  obj.height = 20;
  obj.classList.add('svg-icon');
  
  return obj;
};

/**
 * SVG要素にクリックアニメーションを適用
 */
const animateSvgClick = element => {
  // クリックアニメーションを適用
  element.style.animation = 'clickAnimation 0.2s ease';

  // アニメーション終了後にリセット
  setTimeout(() => {
    element.style.animation = '';
  }, 200);
};

/**
 * コピーボタン用のコンテナ要素を作成
 */
const createSvgContainer = onClickHandler => {
  // ボタン要素を作成
  const button = document.createElement('button');
  button.id = DOM_SELECTORS.COPY_BUTTON_ID;

  // SVG要素を作成してボタンに追加
  const svgElement = createSvgElement();
  button.addEventListener('click', () => onClickHandler(svgElement));
  button.appendChild(svgElement);

  return button;
};
