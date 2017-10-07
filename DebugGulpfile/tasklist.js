var gfp = "../AngularStarter/node_modules/promatrix-gulpfile/exports/";
var appPath = "../AngularStarter/";
var gitHooks = "../.git/hooks/";

var pc = require(gitHooks + "pre-commit.js");
var sq = require(gfp + "squash.js");
var ac = require(gfp + "app-manifest.js");
var common = require(gfp + "common.js");
var prod = require(gfp + "prod-ready.js");
var pub = require(gfp + "publish.js");
require(gfp + "common.js");
realtime.localHostPort = "55419";
realtime.projectPath = appPath;


var index = 1;
var crlf = "\r\n";
var tasks = crlf + "";

exports.displayTaskList = function() {
    listTasks(common);
    listTasks(sq);
    listTasks(prod);
    listTasks(ac);
    listTasks(pub);
    listTasks(pc);
    console.log(tasks);
};

var listTasks = function(obj) {
    const keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        tasks += `(${index}) ${keys[i]}${crlf}`;
        index++;
    }
};
exports.execute = function(task) {
    switch (task) {
        case "createAppManifest":
            ac.createAppManifest();
        break;
        case "incrementProjectVersion":
            pub.incrementProjectVersion();
        break;
        case "reloadApplication":
        common.reloadApplication();
        break;
    case "printTime":
        common.printTime();
        break;
    case "squash":
        sq.squash(appPath + "wwwroot/app");
        break;
    case "unSquash":
        sq.unSquash(appPath + "wwwroot/app");
        break;
    case "addProdMode":
        prod.addProdMode(appPath + "wwwroot/app/bootstrap.ts",
            appPath + "wwwroot/app/bootstrap.ts",
            "enableProdMode();",
            "platformBrowserDynamic");
        prod.addProdMode(appPath + "wwwroot/app/bootstrap.js",
            appPath + "wwwroot/app/bootstrap.js",
            "var core_1 = require('@angular/core');core_1.enableProdMode();",
            "platform_browser_dynamic_1");
        break;
    case "removeProdMode":
        prod.removeProdMode(appPath + "wwwroot/app/bootstrap.ts",
            appPath + "wwwroot/app/bootstrap.ts",
            "enableProdMode();");
        prod.removeProdMode(appPath + "wwwroot/app/bootstrap.js",
            appPath + "wwwroot/app/bootstrap.js",
            "var core_1 = require('@angular/core');core_1.enableProdMode();");
        break;
    case "preCommit":
            pc.preCommit("../../AngularStarter/", "../AngularStarter/");
            break;
    case "exit":
        process.exit(0);
        break;
    }
};

