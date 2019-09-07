sap.ui.define([
	'jquery.sap.global',
	'sap/m/MessageBox',
	'sap/m/MessageToast',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException',
	'sap/ui/model/json/JSONModel',
	"sap/ui/core/routing/Route"

], function (jQuery, MessageBox, MessageToast, Controller, SimpleType, ValidateException, JSONModel) {
	"use strict";

	return Controller.extend("ibm.ibm.controller.app", {
		onInit: function () {
			var wizardProgress = this.getView().byId('_id_wizard').getProgress();
			this.getView().byId("_id_wizard").setShowNextButton(true); //Shows Next Button

			this.oView = this.getView();

			this.oView.setModel(new JSONModel({
				name: "",
				email: ""
			}));
			sap.ui.getCore().getMessageManager().registerObject(this.oView.byId("nameInput"), true);
			sap.ui.getCore().getMessageManager().registerObject(this.oView.byId("emailInput"), true);

		},
		_validateInput: function (oInput) {
			var oBinding = oInput.getBinding("value");
			var sValueState = "None";
			var bValidationError = false;

			try {
				oBinding.getType().validateValue(oInput.getValue());
			} catch (oException) {
				sValueState = "Error";
				bValidationError = true;
			}

			oInput.setValueState(sValueState);

			return bValidationError;
		},

		onContinue: function () {

		
			// collect input controls
			var that = this;
			var oView = this.getView();
			var aInputs = [
				oView.byId("nameInput"),
				oView.byId("emailInput")
			];
			var bValidationError = false;

			// check that inputs are not empty
			// this does not happen during data binding as this is only triggered by changes
			jQuery.each(aInputs, function (i, oInput) {
				bValidationError = that._validateInput(oInput) || bValidationError;
			});

			// output result
			if (!bValidationError) {
				MessageToast.show("The input is validated. You could now continue to the next screen");
			} else {
				MessageBox.alert("A validation error has occured. Complete your input first");
			}
		},

		onChange: function (oEvent) {
			var oInput = oEvent.getSource();
			this._validateInput(oInput);
		},
		customEMailType: SimpleType.extend("email", {
			formatValue: function (oValue) {
				return oValue;
			},
			parseValue: function (oValue) {
				return oValue;
			},
			validateValue: function (oValue) {
				var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
				if (!oValue.match(rexMail)) {
					throw new ValidateException("'" + oValue + "' is not a valid email address");
				}
			}

		})
	});
});