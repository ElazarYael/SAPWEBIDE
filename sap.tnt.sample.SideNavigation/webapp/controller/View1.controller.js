sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global"
], function (Controller,jQuery) {
	"use strict";

	return Controller.extend("sap.tnt.sample.SideNavigation.sap.tnt.sample.SideNavigation.controller.View1", {
			onCollapseExpandPress: function () {
			var oSideNavigation = this.byId('sideNavigation');
			var bExpanded = oSideNavigation.getExpanded();

			oSideNavigation.setExpanded(!bExpanded);
		},

		onHideShowSubItemPress: function () {
			var navListItem = this.byId("subItem3");

			navListItem.setVisible(!navListItem.getVisible());
		}
	});
});