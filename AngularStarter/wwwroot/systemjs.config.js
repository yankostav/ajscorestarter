/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
        "npm:": "projectroot/node_modules/"
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: "app",

      // angular bundles
      "@angular/core": "npm:@angular/core/bundles/core.umd.js",
      "@angular/common": "npm:@angular/common/bundles/common.umd.js",
      "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.js",
      "@angular/platform-browser": "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
      "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
      "@angular/http": "npm:@angular/http/bundles/http.umd.js",
      "@angular/router": "npm:@angular/router/bundles/router.umd.js",
      "@angular/forms": "npm:@angular/forms/bundles/forms.umd.js",
      "@angular/animations": "npm:@angular/animations/bundles/animations.umd.js",
      "@angular/animations/browser": "npm:@angular/animations/bundles/animations-browser.umd.js",
      "@angular/platform-browser/animations": "npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js",   
      // other libraries
      "ng2-toastr": "npm:ng2-toastr",
      "rxjs": "npm:rxjs",
      "angular-in-memory-web-api": "npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js",
      "file-saver": "npm:file-saver",
      "moment": "npm:moment",
      "lodash": "npm:lodash"
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: "./bootstrap.js",
        defaultExtension: "js"
      },
      rxjs: {
        defaultExtension: "js"
      },
      "file-saver": {
          main: "./FileSaver.js",
          defaultExtension: "js",
          "format": "cjs"
      },
      "moment": {
          main: "moment.js",
          defaultExtension: "js",
          "format": "cjs"
      },
      "ng2-toastr": {
          main: "bundles/ng2-toastr.js",
          defaultExtension: "js"
      },
      "lodash": {
          main: "lodash.js",
          defaultExtension: "js"
      }

    }
  });
})(this);
