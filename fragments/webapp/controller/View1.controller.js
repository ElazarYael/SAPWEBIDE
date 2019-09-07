sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("fragments.fragments.controller.View1", {
		onInit: function () {

		},
		onClick:function(){
			alert("click")
		}
	});
});