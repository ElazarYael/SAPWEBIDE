"use strict";

module.exports = function(app,server) {
	app.use("/node", require("./routes/myNode")());
	app.use("/node/excAsync", require("./routes/exerciseAsync")(server));
	app.use("/node/textBundle", require("./routes/textBundle")());
	app.use("/node/chat", require("./routes/chatServer")(server));
};

