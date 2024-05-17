/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => { // Fire on install or update
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && tab.url && tab.url.includes('tumblr.com')) {
            tabID = tabId;
            console.log('New Page Opened');
            const isLoaded = true;
            chrome.tabs.sendMessage(tabId, {
                type: "NEW",
                pageLoaded: isLoaded,
            })   
        }
    });
});