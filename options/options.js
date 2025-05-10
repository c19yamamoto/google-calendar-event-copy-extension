const saveOptions = () => {
  const iswithTitleEnabled =
    document.getElementById("with-title-toggle").checked;

  chrome.storage.sync.set({ withTitleEnabled: iswithTitleEnabled }, () => {
    const status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(() => {
      status.textContent = "";
    }, OPTION_STATUS_MESSAGE_DURATION);
  });
};

const restoreOptions = () => {
  chrome.storage.sync.get({ withTitleEnabled: false }, (items) => {
    document.getElementById("with-title-toggle").checked =
      items.withTitleEnabled;
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
