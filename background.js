var tiempoCierre = 6; // Valor predeterminado

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "actualizarTiempoCierre") {
    tiempoCierre = message.tiempoCierre;
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url && tab.url.includes("https://www.figma.com/file/")) {
    setTimeout(function () {
      chrome.tabs.remove(tabId);
    }, tiempoCierre * 1000);
  }
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.browserAction.setPopup({ popup: "popover.html" });
  chrome.browserAction.openPopup();
});
