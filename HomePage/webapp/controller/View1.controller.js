sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("HomePage.HomePage.controller.View1", {
		onInit: function () {
			var Data = "https://sapui5.hana.ondemand.com/sdk/test-resources/sap/ui/demokit/explored/products.json"
			this.oModel = new sap.ui.model.json.JSONModel(Data);

			var oView = this.getView();
			oView.setModel(this.oModel);
			this.oSF = oView.byId("searchField");
			oView.byId("searchField").removeStyleClass('sapMSF');

			//.removeStyleClass('sapMSF');

		},
		onPressLogo: function () {
			alert("Logo");

		},
		onHomePress: function () {
			var iconTabHeader = this.byId('iconTabHeader');
			iconTabHeader.setSelectedKey('invalidKey');

			var label = this.byId('labelId');
			label.setText('Home Screen');
		},

		onSelectTab: function (event) {
			var label = this.byId('labelId');
			var tab = event.getParameter('item');

			label.setText(tab.getText());
		},
		onSearch: function (event) {
			var item = event.getParameter("suggestionItem");
			if (item) {
				this.getOwnerComponent().getTargets().display("GoToSomePage");
			//	this.getOwnerComponent().getRouter().navTo("GoToSomePage");
				sap.m.MessageToast.show("Search for: " + item.getText());
			} else {
				sap.m.MessageToast.show("Search is fired!");
			}
		},

		onSuggest: function (event) {
			var value = event.getParameter("suggestValue");
			var filters = [];
			if (value) {
				filters = [
					new sap.ui.model.Filter([
						new sap.ui.model.Filter("ProductId", function (sText) {
							return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
						}),
						new sap.ui.model.Filter("Name", function (sDes) {
							return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
						})
					], false)
				];
			}

			this.oSF.getBinding("suggestionItems").filter(filters);
			this.oSF.suggest();
		},

		Onclick: function () {
			alert("msg")
			this.getOwnerComponent().getRouter().navTo("GoToSomePage");
		//	this.getOwnerComponent().getTargets().display("GoToSomePage");
		
		
		
		},
		onPressReview: function () {
			this.getOwnerComponent().getRouter().navTo("GoToSomePage");
		}

	});
});