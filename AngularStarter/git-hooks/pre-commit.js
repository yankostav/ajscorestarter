#!/usr/bin/env node
"use strict";

exports.preCommit = function(libraryPath, appPath) {
    try {
        require(libraryPath + "node_modules/promatrix-gulpfile/exports/common");
        const cl = require(libraryPath + "node_modules/promatrix-gulpfile/exports/concat-libraries");
        const publish = require(libraryPath + "node_modules/promatrix-gulpfile/exports/publish");
        realtime.projectPath = appPath;
        publish.incrementProjectVersion();
        cl.bundleAppProdRelease();
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};
