/**
 * Created by andreas on 25/05/2014.
 */


chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.command == "fullscreen") {
			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { state: "fullscreen" });
			sendResponse({status: "ok"});
		}
	});