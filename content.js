// ボタンを挿入したい部分のクラス名 (デフォルトではヘッダー部分)
const headClass = ".DmDTHe";
// イベント選択時に表示されるモーダルっぽいコンテンツのID
const eventModalId = "xDetDlg";

const buttonStyles = {
  borderRadius: "10px",
  margin: "0 10px",
  backgroundColor: "#1A73E8",
  color: "white",
  cursor: "pointer",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.3s, color 0.3s",
};

const applyStyles = (element, styles) => {
  Object.entries(styles).forEach(([key, value]) => {
    element.style[key] = value;
  });
};

const createCopyButton = () => {
  const button = document.createElement("button");
  button.id = "copy-event-id";
  applyStyles(button, buttonStyles);
  const buttonText = document.createElement("p");
  buttonText.textContent = "Copy URL";
  button.appendChild(buttonText);
  addCopyEventListener(button);
  return button;
};

const addCopyEventListener = (button) => {
  button.addEventListener("click", () => {
    const eventElement = document.getElementById(eventModalId);
    if (!eventElement) {
      window.alert("コピーしたいイベントを選択してください");
      return;
    }
    const eventId = eventElement.dataset.eventid;
    const eventUrl = "https://www.google.com/calendar/event?eid=" + eventId;
    navigator.clipboard
      .writeText(eventUrl)
      .then(() => {
        // ボタンの色変更
        applyStyles(button, { backgroundColor: "green", color: "white" });
        button.querySelector("p").textContent = "Copied!";

        setTimeout(() => {
          applyStyles(button, buttonStyles);
          button.querySelector("p").textContent = "Copy URL";
        }, 2000);
      })
      .catch((err) => {
        window.alert("Error: " + err);
      });
  });
};

const init = () => {
  const container = document.querySelector(headClass);
  if (container) {
    const button = createCopyButton();
    container.appendChild(button);
  }
};

init();
