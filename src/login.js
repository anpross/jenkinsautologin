/**
 * Created by andreas on 23/05/2014.
 */


$(document).ready(function () {
	contentScript.init();
});

var contentScript = {

	theConfig: null,

	// we are logged in when we can logout ;)
	loggedInSelector: "#login-field a[href='/logout']",

	init: function () {
		this.loadConfig();
	},

	loadConfig: function () {
		chrome.storage.local.get('config', function (result) {
			if (result.config) {
				contentScript.theConfig = result.config;
				contentScript.configLoaded();
			}
		});
	},

	configLoaded: function () {
		if (contentScript.theConfig.enabled && contentScript.theConfig.host === document.location.host) {
			if (contentScript.isLoggedIn()) {
				console.info("most of it is done - already logged in!");
				if (document.location.pathname.indexOf(contentScript.theConfig.redirect) != 0) {
					console.info("we are almost there");
					document.location.pathname = contentScript.theConfig.redirect;
				} else {
					console.info("make sure we are fullscreen");
					contentScript.maximizeWindow();
					console.info("done!");
				}
			} else if (document.location.pathname !== "/login") {
				console.info("navigating to login page");
				document.location.pathname = "/login";
			} else {
				console.info("we are here now - lets log in");
				contentScript.doLogon();
			}
		}
	},

	doLogon: function () {
		var userInput = $('#j_username');
		var passwordInput = $('input[name="j_password"]');
		var loginForm = $('form[name="login"]');
		userInput.val(contentScript.theConfig.user);
		passwordInput.val(contentScript.theConfig.password);
		console.info('pushing the button!');
		loginForm.submit();
	},

	isLoggedIn: function () {
		return ($(contentScript.loggedInSelector).length > 0);
	},

	maximizeWindow: function () {
		chrome.runtime.sendMessage({command: "fullscreen"}, function (response) {
			console.info("background switched to fullscreen: " + response.status);
		});
	}

};


