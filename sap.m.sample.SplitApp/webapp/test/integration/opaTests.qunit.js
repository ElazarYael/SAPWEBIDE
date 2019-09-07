/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/m/sample/SplitApp/sap/m/sample/SplitApp/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});