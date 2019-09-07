/*sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("GridCSS.GridCSS.controller.View1", {
		onInit: function () {

		}
	});
});*/
sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller'],
	function(jQuery, Controller) {
		"use strict";

		var NestedGrids = Controller.extend("GridCSS.GridCSS.controller.View1", {
			onSliderMoved: function (oEvent) {
				var value = oEvent.getParameter("value");
				this.byId("panelCSSGrid").setWidth(value + "%");
			},
		
		});

		return NestedGrids;
	});
