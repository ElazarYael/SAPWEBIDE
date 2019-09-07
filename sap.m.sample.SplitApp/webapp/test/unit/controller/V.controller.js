/*global QUnit*/

sap.ui.define([
	"sap/m/sample/SplitApp/sap/m/sample/SplitApp/controller/V.controller"
], function (Controller) {
	"use strict";

	QUnit.module("V Controller");

	QUnit.test("I should test the V controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});