/*sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Table.Table.controller.app", {
		onInit: function () {

		}
	});
});*/
sap.ui.controller("Table.Table.controller.app",
        {
            /**
             * Called when a controller is instantiated and its View controls
             * (if available) are already created. Can be used to modify the
             * View before it is displayed, to bind event handlers and do other
             * one-time initialization.
             *
             * @memberOf sapui5_fragment_xml.empDetails
             */
            onInit : function() {
                // instantiating the model of type json
                var oModel = new sap.ui.model.json.JSONModel();
                // load data into model
                oModel.loadData("https://services.odata.org/Northwind/Northwind.svc/Employees?$format=json");
                // Set the model to Table
                var oTable = this.getView().byId("idTable");
                oTable.setModel(oModel);
                // Template
                var oTemplate = new sap.m.ColumnListItem({
                    cells : [ new sap.m.Text({
                        text : "{EmployeeID}"
                    }), new sap.m.Text({
                        text : "{FirstName}"
                    }), new sap.m.Text({
                        text : "{LastName}"
                    }), new sap.m.Text({
                        text : "{Country}"
                    }), new sap.m.Text({
                        text : "{BirthDate}"
                    })
                    ]
                });
                oTable.bindAggregation("items", {
                    path : "/value",
                    template : oTemplate
                })
            },
            onUpdate : function() {
                // get selected data from table (reference of table)
                var oTable = this.getView().byId("idTable");
                var EmployeeIDVal = oTable.getSelectedItem().getBindingContext().getProperty("EmployeeID");
                var firstnameVal = oTable.getSelectedItem().getBindingContext().getProperty("FirstName");
                var lastnameVal = oTable.getSelectedItem().getBindingContext().getProperty("LastName");
                var deptVal = oTable.getSelectedItem().getBindingContext().getProperty("Country");   
                var BirthDate = oTable.getSelectedItem().getBindingContext().getProperty("BirthDate");
                // get the fragment
                this._getDialog().open()
             
                // get the reference of input fields of fragment and set the values
                sap.ui.getCore().byId("idFragment--idEmployeeID").setValue(EmployeeIDVal);
                sap.ui.getCore().byId("idFragment--idFirstName").setValue(firstnameVal);
                sap.ui.getCore().byId("idFragment--idLastName").setValue(lastnameVal);
                sap.ui.getCore().byId("idFragment--idCountry").setValue(deptVal);               
                sap.ui.getCore().byId("idFragment--idBirthDate").setValue(BirthDate);
            },
            _getDialog : function() {
                // create a fragment with dialog, and pass the selected data
                if (!this.dialog) {
                    // This fragment can be instantiated from a controller as follows:
                    this.dialog = sap.ui.xmlfragment("idFragment","Table.Table.view.getEmpDetails", this);
                    //debugger;
                }
                //debugger;
                return this.dialog;
            },
            closeDialog : function() {
                this._getDialog().close()
            },
            onSave : function() {
                //debugger;
             
                var oEmployeeID = sap.ui.getCore().byId("idFragment--idEmployeeID").getValue();
                var oFirstName = sap.ui.getCore().byId("idFragment--idFirstName").getValue();
                var oLastName = sap.ui.getCore().byId("idFragment--idLastName").getValue();
                var oCountry = sap.ui.getCore().byId("idFragment--idCountry").getValue();
                var oBirthDate = sap.ui.getCore().byId("idFragment--idBirthDate").getValue();
             
                var finalData ={
                        "EmployeeID": oEmployeeID,
                        "FirstName": oFirstName,
                        "LastName": oLastName,
                        "Country": oCountry,
                        "BirthDate": oBirthDate
                }           
             
            },
            onCREATE:function(){
            	this._getDialog().open()
            	
            },
            onDelete:function(){
            	var oTable = this.getView().byId("idTable");
                var EmployeeIDVal = oTable.getSelectedItem().getBindingContext().getProperty("EmployeeID");
                var firstnameVal = oTable.getSelectedItem().getBindingContext().getProperty("FirstName");
                var lastnameVal = oTable.getSelectedItem().getBindingContext().getProperty("LastName");
                var deptVal = oTable.getSelectedItem().getBindingContext().getProperty("Country");   
                var BirthDate = oTable.getSelectedItem().getBindingContext().getProperty("BirthDate");
                
                
            	
            	
            	
            }
     
        });