sap.ui.define([
			"sap/ui/core/mvc/Controller"
		], function (Controller) {
			"use strict";

			return Controller.extend("TestWEbconctioon.TestWEbconctioon.controller.View1", {
				onInit: function () {

					
					var crose = "https://translate.google.co.il/?hl=iw&tab=rT&authuser=0";
					

					/*var aData = jQuery.ajax({
							type: "GET",
							contentType: "application/xml",
							url: crose,
							dataType: "xml",
							async: true,
							success: function (data, textStatus, jqXHR) {

							}
					});*/

						jQuery.sap.require("sap.ui.core.ws.WebSocket");

							var connection = new sap.ui.core.ws.WebSocket("wss://javascript.info/article/websocket/demo/hello");
							connection.attachOpen(function (oControlEvent) {
								sap.m.MessageToast.show("connection opened");

								connection.send("Hi!!");
							});
							/*hbox vbox
							object page layout*/

						}
					});
			});