/**
 * SVG要素の作成と操作に関するユーティリティ
 */

/**
 * リンクアイコンのSVG要素を作成
 */
const createSvgElement = () => {
  // SVG要素を作成
  const svgWrapper = document.createElementNS(SVG_CONSTANTS.NAMESPACE, "svg");
  svgWrapper.setAttribute("xmlns", SVG_CONSTANTS.NAMESPACE);
  svgWrapper.setAttribute("viewBox", "0 0 640 512");
  svgWrapper.setAttribute("width", "20");
  svgWrapper.setAttribute("height", "20");
  
  // パス要素を作成
  const path = document.createElementNS(SVG_CONSTANTS.NAMESPACE, "path");
  path.setAttribute("d", SVG_CONSTANTS.LINK_ICON_PATH);
  
  // SVG要素にパスを追加
  svgWrapper.appendChild(path);
  return svgWrapper;
};

/**
 * SVG要素にクリックアニメーションを適用
 */
const animateSvgClick = (element) => {
  // クリックアニメーションを適用
  element.style.animation = "clickAnimation 0.2s ease";
  
  // アニメーション終了後にリセット
  setTimeout(() => {
    element.style.animation = "";
  }, 200);
};

/**
 * コピーボタン用のコンテナ要素を作成
 */
const createSvgContainer = (onClickHandler) => {
  // ボタン要素を作成
  const button = document.createElement("button");
  button.id = DOM_SELECTORS.COPY_BUTTON_ID;
  
  // SVG要素を作成してボタンに追加
  const svgElement = createSvgElement();
  button.addEventListener("click", () => onClickHandler(svgElement));
  button.appendChild(svgElement);

  return button;
};
