"use strict";
exports.__esModule = true;
var next = require("next"), app = require("express")(), server = require("http").createServer(app), io = require("socket.io")(server);
var dev = process.env.NODE_ENV !== "production", PORT = 3000 || process.env.PORT, nextApp = next({ dev: dev }), handle = nextApp.getRequestHandler();
nextApp.prepare().then(function () {
    app.get("*", function (req, res) {
        return handle(req, res);
    });
    io.on("connect", function (socket) {
        socket.emit("Welcome", { message: "Welcome" });
    });
    server.listen(PORT, function () {
        console.log("> Server listening on port http://localhost/" + PORT);
    });
});
