/*sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("PopulationAuthority.PopulationAuthority.controller.App", {
		onInit: function () {

		}
	});
});*/

sap.ui.define([
		'jquery.sap.global',
		'sap/m/MessageToast',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter',
		'sap/ui/model/json/JSONModel',
		'sap/base/Log'
	], function(jQuery, MessageToast, Fragment, Controller, Filter, JSONModel, Log) {
	"use strict";

	var CController = Controller.extend("PopulationAuthority.PopulationAuthority.controller.App", {

		onInit: function(){
			this.getSplitAppObj().setHomeIcon({
				'phone':'phone-icon.png',
				'tablet':'tablet-icon.png',
				'icon':'desktop.ico'
			});
			
			
			
		
		},

		onOrientationChange: function(oEvent) {
			var bLandscapeOrientation = oEvent.getParameter("landscape"),
				sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
			MessageToast.show(sMsg, {duration: 5000});
		},

		onPressNavToDetail : function(oEvent) {
			this.getSplitAppObj().to(this.createId("detailDetail"));
		},

		onPressDetailBack : function() {
			this.getSplitAppObj().backDetail();
		},

		onPressMasterBack : function() {
			this.getSplitAppObj().backMaster();
		},

		onPressGoToMaster : function() {
			this.getSplitAppObj().toMaster(this.createId("master2"));
		},

		onListItemPress : function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitAppObj().toDetail(this.createId(sToPageId));
		},

		onPressModeBtn : function(oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

			this.getSplitAppObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
		},

		getSplitAppObj : function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				Log.info("SplitApp object can't be found");
			}
			return result;
		},
		OnselectItem:function(oEvent){
			this.getSplitAppObj().to(this.createId("detail2"));
		},
		onCollapseExpandPress: function () {
			var oSideNavigation = this.byId('sideNavigation');
			var bExpanded = oSideNavigation.getExpanded();

			oSideNavigation.setExpanded(!bExpanded);
		},

		onHideShowSubItemPress: function () {
			var navListItem = this.byId("subItem2");
			navListItem.setVisible(!navListItem.getVisible());
			
			navListItem = this.byId("subItem3");
			navListItem.setVisible(!navListItem.getVisible());
			navListItem = this.byId("subItem4");
			navListItem.setVisible(!navListItem.getVisible());
			navListItem = this.byId("detail2subItem2");
			navListItem.setVisible(!navListItem.getVisible());
			
		}

	});


	return CController;

});