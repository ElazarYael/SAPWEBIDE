sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("MasterPage.MasterPage.controller.app", {
		onInit: function () {

		},
		onClick:function(){
			
		var router =	sap.ui.core.UIComponent.getRouterFor(this);
		router.navTo("splita");
		
			//	this.getOwnerComponent().getRouter().navTo("splita",true);
			
		}
	});
});