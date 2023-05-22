chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url && tab.url.includes("https://www.figma.com/file/")) {
    setTimeout(function () {
      chrome.tabs.remove(tabId);
    }, 10000);
  }
});
