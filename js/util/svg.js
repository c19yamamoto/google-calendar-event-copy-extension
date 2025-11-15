// NOTE: svg ファイルに切り出したらスタイルが上手く適用されなくなった
const createCopyIcon = () => {
  const svgContainer = document.createElement("div");
  svgContainer.classList.add("svg-icon");
  svgContainer.style.width = `${SVG_ICONS.SIZE}px`;
  svgContainer.style.height = `${SVG_ICONS.SIZE}px`;

  svgContainer.innerHTML = `
    <svg xmlns="${SVG_ICONS.NAMESPACE}" viewBox="0 0 640 512" width="${SVG_ICONS.SIZE}" height="${SVG_ICONS.SIZE}">
      <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4-6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
    </svg>
  `;

  // クリックイベントを親要素 (ボタン) に伝播させる
  svgContainer.style.pointerEvents = "none";

  return svgContainer;
};

const animateCopyButtonClick = (element) => {
  // クリックアニメーションを適用
  element.style.animation = `clickAnimation ${CLICK_DURATION / 1000}s ease`;

  // アニメーション終了後にリセット
  setTimeout(() => {
    element.style.animation = "";
  }, CLICK_DURATION);
};

const createCopyButton = (onClickHandler, onRightClickHandler) => {
  const button = document.createElement("button");
  button.id = COPY_BUTTON_ID;

  const copyIcon = createCopyIcon();
  button.addEventListener("click", () => onClickHandler(copyIcon));

  // 右クリックでオプションをトグル
  button.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    onRightClickHandler(button);
  });

  button.appendChild(copyIcon);

  return button;
};
