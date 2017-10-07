"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tl = require("./tasklist.js");
tl.displayTaskList();
var net = require("net");
var server = net.createServer(function (socket) {
    socket.on("data", function (data) {
        var task = data.toString("utf8");
        console.log("Executing task: " + task);
        tl.execute(task);
    });
});
server.listen(1337, "127.0.0.1");
//# sourceMappingURL=app.js.map