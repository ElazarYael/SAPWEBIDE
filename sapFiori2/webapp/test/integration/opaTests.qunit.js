/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapFiori2/sapFiori2/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});