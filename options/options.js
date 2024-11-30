// Saves options to chrome.storage
const saveOptions = () => {
  const iswithTitleEnabled = document.getElementById("feature-toggle").checked;

  chrome.storage.sync.set({ withTitleEnabled: iswithTitleEnabled }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(() => {
      status.textContent = "";
    }, 750);
  });
};

// Restores checkbox state using the preferences stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get({ withTitleEnabled: false }, (items) => {
    document.getElementById("feature-toggle").checked = items.withTitleEnabled;
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
