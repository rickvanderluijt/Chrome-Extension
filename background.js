chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "open_calendar") {
        chrome.tabs.create({ url: message.url });
    }
});
