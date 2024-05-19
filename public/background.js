/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => { // Fire on install or update
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && tab.url && tab.url.includes('tumblr.com')) {
            console.log("New page opened");
            chrome.tabs.sendMessage(tabId, {
                type: "NEW_PAGE_LOAD",
                url: tab.url,
            });
        } else if (changeInfo.url && tab.url.includes('tumblr.com')) {
          console.log('URL Changed:', changeInfo.url);
          chrome.tabs.sendMessage(tabId, {
              type: "URL_CHANGED",
              newUrl: changeInfo.url
          });
      }
    });
});

// Add a listener for active tab changes to detect route changes within the same tab
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {
        console.log("Check route changes");
        chrome.tabs.sendMessage(tabId, {
          type: "NEW_PAGE_LOAD",
          url: tab.url,
        });
      }
});

// Add a listener for window focus changes to detect route changes when the tab is revisited
chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId !== chrome.windows.WINDOW_ID_NONE) {
      chrome.windows.get(windowId, { populate: true }, window => {
        const activeTab = window.tabs.find(tab => tab.active);
        console.log("Check for tab focus");
        if (activeTab && activeTab.url.includes('tumblr.com')) {
          chrome.tabs.sendMessage(activeTab.id, {
            type: "NEW_PAGE_LOAD",
            url: activeTab.url,
          });
        }
      });
    }
  });