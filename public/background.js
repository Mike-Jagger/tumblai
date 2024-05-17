/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => { // Fire on install or update
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && tab.url && tab.url.includes('tumblr.com')) {
            console.log('New Page Opened');
            chrome.tabs.sendMessage(tabId, {
                type: "NEW",
                isPageLoaded: true,
            });
        }
    });
});