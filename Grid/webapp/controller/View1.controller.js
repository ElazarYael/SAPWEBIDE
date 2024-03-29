/*sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Grid.Grid.controller.View1", {
		onInit: function () {

		}
	});
});*/
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("Grid.Grid.controller.View1", {
		onInit: function () {
			var oModel = new JSONModel({
				"cities": [
					{
						"text": "Berlin",
						"key": "BR"
					},
					{
						"text": "London",
						"key": "LN"
					},
					{
						"text": "Madrid",
						"key": "MD"
					},
					{
						"text": "Prague",
						"key": "PR"
					},
					{
						"text": "Paris",
						"key": "PS"
					},
					{
						"text": "Sofia",
						"key": "SF"
					},
					{
						"text": "Vienna",
						"key": "VN"
					}
				],
				"productItems": [
					{
						"title": "Notebook HT",
						"subtitle": "ID23452256-D44",
						"revenue": "27.25K EUR",
						"status": "success",
						"statusSchema": "Success"
					},
					{
						"title": "Notebook XT",
						"subtitle": "ID27852256-D47",
						"revenue": "7.35K EUR",
						"status": "exceeded",
						"statusSchema": "Error"
					},
					{
						"title": "Notebook ST",
						"subtitle": "ID123555587-I05",
						"revenue": "22.89K EUR",
						"status": "warning",
						"statusSchema": "Warning"
					}
				]
			});
			this.getView().setModel(oModel);
		},
		onSnapToRowChange: function (oEvent) {
			this.getView().byId("demoGrid").setSnapToRow(oEvent.getParameter("state"));
		},
		onAllowDenseFillChange: function (oEvent) {
			this.getView().byId("demoGrid").setAllowDenseFill(oEvent.getParameter("state"));
		},
		onInlineBlockLayoutChange: function (oEvent) {
			this.getView().byId("demoGrid").setInlineBlockLayout(oEvent.getParameter("state"));
		}
	});
});