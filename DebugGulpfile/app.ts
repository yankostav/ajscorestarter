let tl = require("./tasklist.js");

tl.displayTaskList();

import net = require("net");
var server = net.createServer((socket) => {
    socket.on("data", data => {
        var task = data.toString("utf8");
        console.log(`Executing task: ${task}`);
        tl.execute(task);
    });
});

server.listen(1337, "127.0.0.1");