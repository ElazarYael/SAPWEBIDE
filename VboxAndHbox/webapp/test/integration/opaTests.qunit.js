/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"VboxAndHbox/VboxAndHbox/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});