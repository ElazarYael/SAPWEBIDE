/*sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("WizardBranching.WizardBranching.controller.App", {
		onInit: function () {

		}
	});
});*/
sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (jQuery, Controller, JSONModel, MessageToast, MessageBox) {
	"use strict";

	var history = {
		prevPaymentSelect: null,
		prevDiffDeliverySelect: null
	};

	var WizardController = Controller.extend("WizardBranching.WizardBranching.view.App", {
		onInit: function () {

			this._wizard = this.byId("ShoppingCartWizard");
			this._oNavContainer = this.byId("app");
			this._oWizardContentPage = this.byId("wizardContentPage");
			this._oWizardReviewPage = sap.ui.xmlfragment("WizardBranching.WizardBranching.view.ReviewPage", this);

			this._oNavContainer.addPage(this._oWizardReviewPage);
			var oData = "https://sapui5.hana.ondemand.com/sdk/test-resources/sap/ui/demokit/explored/products.json"
			this.model = new sap.ui.model.json.JSONModel(oData);
			
			this.model.attachRequestCompleted(null, function () {
				this.model.getData().ProductCollection.splice(5, this.model.getData().ProductCollection.length);
				this.model.setProperty("/selectedPayment", "Credit Card");
				this.model.setProperty("/selectedDeliveryMethod", "Standard Delivery");
				this.model.setProperty("/differentDeliveryAddress", false);
				this.model.setProperty("/CashOnDelivery", {});
				this.model.setProperty("/BillingAddress", {});
				this.model.setProperty("/CreditCard", {});
				this.calcTotal();
				this.model.updateBindings();
			}.bind(this));
			

			

		
			/*this.model.loadData(sap.ui.require.toUrl(oData));*/
			this.getView().setModel(this.model);
		},
		calcTotal: function () {
			var data = this.model.getData().ProductCollection;
			if (data) {
				var total = data.reduce(function (prev, current) {
					prev = prev.Price || prev;
					return prev + current.Price;
				});
				this.model.setProperty("/ProductsTotalPrice", total.Price || total);
			} else {
				this.model.setProperty("/ProductsTotalPrice", 0);
			}
		},
		handleDelete: function (listItemBase) {
			var listItem = listItemBase.mParameters.listItem;
			var data = this.model.getData().ProductCollection;
			if (data.length <= 1) {
				return;
			}

			for (var i = 0; i < data.length; i++) {
				if (data[i].Name === listItem.getTitle()) {
					data.splice(i, 1);
					this.calcTotal();
					this.model.updateBindings();
					break;
				}
			}
		},
		goToPaymentStep: function () {
			var selectedKey = this.model.getProperty("/selectedPayment");

			switch (selectedKey) {
			case "Credit Card":
				this.byId("PaymentTypeStep").setNextStep(this.getView().byId("CreditCardStep"));
				break;
			case "Bank Transfer":
				this.byId("PaymentTypeStep").setNextStep(this.getView().byId("BankAccountStep"));
				break;
			case "Cash on Delivery":
			default:
				this.byId("PaymentTypeStep").setNextStep(this.getView().byId("CashOnDeliveryStep"));
				break;
			}
		},
		setPaymentMethod: function () {
			this.setDiscardableProperty({
				message: "Are you sure you want to change the payment type ? This will discard your progress.",
				discardStep: this.byId("PaymentTypeStep"),
				modelPath: "/selectedPayment",
				historyPath: "prevPaymentSelect"
			});
		},
		setDifferentDeliveryAddress: function () {
			this.setDiscardableProperty({
				message: "Are you sure you want to change the delivery address ? This will discard your progress",
				discardStep: this.byId("BillingStep"),
				modelPath: "/differentDeliveryAddress",
				historyPath: "prevDiffDeliverySelect"
			});
		},
		setDiscardableProperty: function (params) {
			if (this._wizard.getProgressStep() !== params.discardStep) {
				MessageBox.warning(params.message, {
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.YES) {
							this._wizard.discardProgress(params.discardStep);
							history[params.historyPath] = this.model.getProperty(params.modelPath);
						} else {
							this.model.setProperty(params.modelPath, history[params.historyPath]);
						}
					}.bind(this)
				});
			} else {
				history[params.historyPath] = this.model.getProperty(params.modelPath);
			}
		},
		billingAddressComplete: function () {
			if (this.model.getProperty("/differentDeliveryAddress")) {
				this.byId("BillingStep").setNextStep(this.getView().byId("DeliveryAddressStep"));
			} else {
				this.byId("BillingStep").setNextStep(this.getView().byId("DeliveryTypeStep"));
			}
		},
		handleWizardCancel: function () {
			this._handleMessageBoxOpen("Are you sure you want to cancel your purchase?", "warning");
		},
		handleWizardSubmit: function () {
			this._handleMessageBoxOpen("Are you sure you want to submit your report?", "confirm");
		},
		backToWizardContent: function () {
			this._oNavContainer.backToPage(this._oWizardContentPage.getId());
		},
		checkCreditCardStep: function () {
			var cardName = this.model.getProperty("/CreditCard/Name") || "";
			if (cardName.length < 3) {
				this._wizard.invalidateStep(this.byId("CreditCardStep"));
			} else {
				this._wizard.validateStep(this.byId("CreditCardStep"));
			}
		},
		checkCashOnDeliveryStep: function () {
			var firstName = this.model.getProperty("/CashOnDelivery/FirstName") || "";
			if (firstName.length < 3) {
				this._wizard.invalidateStep(this.byId("CashOnDeliveryStep"));
			} else {
				this._wizard.validateStep(this.byId("CashOnDeliveryStep"));
			}
		},
		checkBillingStep: function () {
			var address = this.model.getProperty("/BillingAddress/Address") || "";
			var city = this.model.getProperty("/BillingAddress/City") || "";
			var zipCode = this.model.getProperty("/BillingAddress/ZipCode") || "";
			var country = this.model.getProperty("/BillingAddress/Country") || "";

			if (address.length < 3 || city.length < 3 || zipCode.length < 3 || country.length < 3) {
				this._wizard.invalidateStep(this.byId("BillingStep"));
			} else {
				this._wizard.validateStep(this.byId("BillingStep"));
			}
		},
		completedHandler: function () {
			this._oNavContainer.to(this._oWizardReviewPage);
		},
		_handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
						this._wizard.discardProgress(this._wizard.getSteps()[0]);
						this._navBackToList();
					}
				}.bind(this)
			});
		},
		_navBackToList: function () {
			this._navBackToStep(this.byId("ContentsStep"));
		},
		_navBackToPaymentType: function () {
			this._navBackToStep(this.byId("PaymentTypeStep"));
		},
		_navBackToCreditCard: function () {
			this._navBackToStep(this.byId("CreditCardStep"));
		},
		_navBackToCashOnDelivery: function () {
			this._navBackToStep(this.byId("CashOnDeliveryStep"));
		},
		_navBackToBillingAddress: function () {
			this._navBackToStep(this.byId("BillingStep"));
		},
		_navBackToDeliveryType: function () {
			this._navBackToStep(this.byId("DeliveryTypeStep"));
		},
		_navBackToStep: function (step) {
			var fnAfterNavigate = function () {
				this._wizard.goToStep(step);
				this._oNavContainer.detachAfterNavigate(fnAfterNavigate);
			}.bind(this);

			this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
			this._oNavContainer.to(this._oWizardContentPage);
		}
	});

	return WizardController;
});