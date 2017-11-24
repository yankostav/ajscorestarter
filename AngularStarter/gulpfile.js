/// <binding BeforeBuild='before-build' AfterBuild='after-build' ProjectOpened='watch-source-debug, update-app-packages, update-git-hooks' />
var requireDir = require("require-dir");
requireDir("./node_modules/promatrix-gulpfile", false);
require("./node_modules/promatrix-gulpfile/exports/common");

realtime.localHostPort = "65528";
realtime.projectPath = "./";