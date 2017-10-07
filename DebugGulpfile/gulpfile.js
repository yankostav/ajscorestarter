var gulp = require("gulp");
var net = require("net");
var client = new net.Socket();

var tl = require("./tasklist");
var debugging = true;

gulp.task("reloadApplication", function () {
    execute("reloadApplication");
});

gulp.task("printTime", function () {
    execute("printTime");
});

gulp.task("squash", function () {
    execute("squash");  
});

gulp.task("unSquash", function () {
        execute("unSquash");
});

gulp.task("addProdMode", function () {
    execute("addProdMode");
});

gulp.task("removeProdMode", function () {
    execute("removeProdMode");
});

gulp.task("incrementProjectVersion", function () {
    execute("incrementProjectVersion");
});

gulp.task("createAppManifest", function () {
    execute("createAppManifest");
});

gulp.task("preCommit", function () {
    execute("preCommit");
});

gulp.task("exit", function () {
    execute("exit");
});

function execute(task) {
    if (debugging)
        client.connect(1337, "127.0.0.1", function() { client.write(task); });
    else
        tl.execute(task);
}