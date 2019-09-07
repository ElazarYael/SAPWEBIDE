/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"MasterPage/MasterPage/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});