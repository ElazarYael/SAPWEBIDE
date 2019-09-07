/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/m/sample/InputListItem/sap/m/sample/InputListItem/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});