// イベントモーダルのID
const eventModalId = "xDetDlg";

// 挿入するコンテナのクラス
const headClass = ".pPTZAe";

// タイトル情報を持つクラス
const titleClass = ".UfeRlc";

const svgNamespace = "http://www.w3.org/2000/svg";

const createSvgElement = () => {
  // font-awesome の link アイコンを使用
  const svgWrapper = document.createElementNS(svgNamespace, "svg");
  svgWrapper.setAttribute("xmlns", svgNamespace);
  svgWrapper.setAttribute("viewBox", "0 0 640 512");
  svgWrapper.setAttribute("width", "20");
  svgWrapper.setAttribute("height", "20");
  const path = document.createElementNS(svgNamespace, "path");
  path.setAttribute(
    "d",
    "M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4-6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
  );

  svgWrapper.appendChild(path);
  return svgWrapper;
};

const applyStyles = (element, styles) => {
  Object.entries(styles).forEach(([key, value]) => {
    element.style[key] = value;
  });
};

const animateSvgClick = (svgElement) => {
  svgElement.style.animation = "clickAnimation 0.2s ease";
  setTimeout(() => {
    svgElement.style.animation = "";
  }, 200);
};

const copyEventUrlToClipboard = (svgElement) => {
  const eventId = document.getElementById(eventModalId).dataset.eventid;
  const eventUrl = `https://www.google.com/calendar/event?eid=${eventId}`;
  chrome.storage.sync.get("withTitleEnabled", (data) => {
    if (data.withTitleEnabled) {
      const title = document.querySelector(titleClass)?.dataset.text || "";
      const eventData = {
        title: title,
        html: `<a href="${eventUrl}">${title}</a>`,
      };

      navigator.clipboard
        .write([
          new ClipboardItem({
            "text/plain": new Blob([eventData.title], { type: "text/plain" }),
            "text/html": new Blob([eventData.html], { type: "text/html" }),
          }),
        ])
        .then(() => animateSvgClick(svgElement));
    } else {
      navigator.clipboard
        .writeText(eventUrl)
        .then(() => animateSvgClick(svgElement));
    }
  });
};

const createSvgContainer = () => {
  const button = document.createElement("button");
  applyStyles(button, {
    all: "unset",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    zIndex: "1",
  });

  const svgElement = createSvgElement();
  button.addEventListener("click", () => copyEventUrlToClipboard(svgElement));
  button.appendChild(svgElement);

  return button;
};

const observerCallback = (mutationsList) => {
  let shouldReAddListener = false;

  for (let mutation of mutationsList) {
    if (
      mutation.type === "childList" &&
      document.getElementById(eventModalId)
    ) {
      shouldReAddListener = true;
      break;
    }
  }

  if (shouldReAddListener) {
    const container = document.querySelector(headClass);
    if (container && !container.querySelector("#copy-event-svg")) {
      const svgContainer = createSvgContainer();
      svgContainer.id = "copy-event-svg";
      // コンテナの最後から2番目に挿入
      container.insertBefore(
        svgContainer,
        container.children[container.children.length - 1]
      );
    }
  }
};

const initObserver = () => {
  const observer = new MutationObserver(observerCallback);
  observer.observe(document.body, { childList: true, subtree: true });
};

const style = document.createElement("style");
style.innerHTML = `
@keyframes clickAnimation {
  0% { transform: scale(1); }
  50% { transform: scale(0.8); }
  100% { transform: scale(1); }
}
#copy-event-svg svg {
  transition: transform 0.2s ease;
}
`;
document.head.appendChild(style);

initObserver();
