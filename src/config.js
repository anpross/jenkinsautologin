/**
 * Created by andreas on 24/05/2014.
 */


$(document).ready(function () {
	autoLogin.init();
});

var autoLogin = {

	theConfig: {},

	configFields: {
		enabled: {type: "checkbox", selector: "#config-enabled"},
		host: {type: "text", selector: "#config-host"},
		user: {type: "text", selector: "#config-user"},
		password: {type: "text", selector: "#config-password"},
		context: {type: "text", selector: "#config-context"},
		redirect: {type: "text", selector: "#config-redirect"}
	},

	configEnabled: null,

	init: function () {
		console.log("config:");

		var saveButton = $('#button-done');
		saveButton.bind('click', this.saveChanges);

		this.loadConfig();
		this.bindInputs();


		chrome.runtime.onMessage.addListener(
			function (request, sender, sendResponse) {
				console.log(sender.tab ?
					"from a content script:" + sender.tab.url :
					"from the extension");
				if (request.greeting == "hello")
					sendResponse({farewell: "goodbye"});
			});
	},

	restoreValues: function () {
		for (var item in this.configFields) {
			if (this.configFields.hasOwnProperty(item)) {
				var field = this.configFields[item];
				if (field.type === "checkbox") {
					$(field.selector).prop('checked', this.theConfig[item]);
				} else if (field.type === "text") {
					$(field.selector).val(this.theConfig[item] ? this.theConfig[item] : "");
				}
			}
		}
	},

	bindInputs: function () {
		for (var item in this.configFields) {
			if (this.configFields.hasOwnProperty(item)) {
				var field = this.configFields[item];
				if (field.type === "checkbox") {
					var proxyCheckbox = $.proxy(function (item, event) {
						autoLogin.theConfig[item] = event.originalEvent.srcElement.checked;
					}, this, item);
					$(field.selector).on("click", proxyCheckbox);
				} else if (field.type === "text") {
					var proxyText = $.proxy(function (item, event) {
						autoLogin.theConfig[item] = event.originalEvent.srcElement.value;
					}, this, item);
					$(field.selector).on("input propertychange paste", proxyText);
				}
			}
		}
	},

	loadConfig: function () {
		chrome.storage.local.get('config', function (result) {
			if (result.config) {
				autoLogin.theConfig = result.config;
				autoLogin.restoreValues();
			}
		});
	},

	saveChanges: function () {
		console.log('save changes');
		chrome.storage.local.set({'config': autoLogin.theConfig}, function () {
			console.info('Settings saved');
			window.close();
		});
	}
};