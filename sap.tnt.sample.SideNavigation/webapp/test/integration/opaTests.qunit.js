/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/tnt/sample/SideNavigation/sap/tnt/sample/SideNavigation/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});