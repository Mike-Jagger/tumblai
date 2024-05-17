/* eslint-disable no-undef */
var tabID;

chrome.runtime.onInstalled.addListener(() => { // Fire on install or update
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && tab.url && tab.url.includes('tumblr.com')) {
            tabID = tabId;
            console.log('New Page Opened')
            setTimeout (() => {
                const isLoaded = true;
                chrome.tabs.sendMessage(tabId, {
                    type: "NEW",
                    pageLoaded: isLoaded,
                });
            }, 1500); // Wait a few seconds for complete DOM to load
            
        }
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'UPDATE') {
        console.log('DOM updated');
        const isLoaded = true;
        chrome.tabs.sendMessage(tabID, {
            type: "NEW",
            pageLoaded: isLoaded,
        });
    }
  });