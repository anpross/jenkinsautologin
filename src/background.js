/**
 * Created by andreas on 25/05/2014.
 */

if (!chrome.runtime) {
	// Chrome 20-21
	chrome.runtime = chrome.extension;
} else if(!chrome.runtime.onMessage) {
	// Chrome 22-25
	chrome.runtime.onMessage = chrome.extension.onMessage;
	chrome.runtime.sendMessage = chrome.extension.sendMessage;
	chrome.runtime.onConnect = chrome.extension.onConnect;
	chrome.runtime.connect = chrome.extension.connect;
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.command == "fullscreen") {
			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { state: "fullscreen" });
			sendResponse({status: "ok"});
		}
	});