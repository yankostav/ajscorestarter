require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({361:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var mainFrame_1 = require("./mainFrame");
var core_1 = require('@angular/core');core_1.enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(mainFrame_1.AppModule);
},{"./mainFrame":376,"@angular/core":5,"@angular/platform-browser-dynamic":8}],376:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var core_2 = require("@angular/core");
var router_1 = require("@angular/router");
var animations_1 = require("@angular/platform-browser/animations");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var moment = require("moment");
// services
var appConfig_1 = require("./common/appConfig");
var appRouting_1 = require("./common/appRouting");
var bottomToastsManager_1 = require("./common/bottomToastsManager");
var appAnimation_1 = require("./common/node_modules/ng2-animation/appAnimation");
// features
var settings_1 = require("./features/settings");
var splash_1 = require("./features/splash");
var analytics_1 = require("./features/analytics");
var features_1 = require("./features/features");
// pipes & animation
var safeResource_1 = require("./common/safeResource");
var modalDialog_1 = require("./common/node_modules/ng2-animation/modalDialog");
var MainFrame = (function () {
    function MainFrame(route, router, ac, toastr, vRef) {
        this.route = route;
        this.router = router;
        this.ac = ac;
        this.toastr = toastr;
        this.appTitle = "Angular.Net Starter Application";
        this.titleBlinking = true;
        this.titleVisibleWhenNotBlinking = true;
        this.showModalDialog = false;
        this.versionNumber = "";
        this.appLoaded = false;
        this.toastr.setRootViewContainerRef(vRef);
        this.date = new Date();
        this.theWeekOf = moment().startOf("week").format("ddd MMM D YYYY");
        this.appHref = window.location.href.substr(0, window.location.href.lastIndexOf("/") + 1);
        this.appCache = this.appHref + "appcache.html";
    }
    MainFrame.prototype.ngOnInit = function () {
        var _this = this;
        this.ac.getDevConfig(function () {
            _this.versionNumber = _this.ac.devConfig.versionNumber;
            if (_this.ac.devConfig.testing && _this.ac.devConfig.debug)
                _this.synchronize();
            setTimeout(function () {
                _this.toastr.success("This application is operating online as normal.", "Success!");
                _this.navigateForward();
            });
        }, function (warningMessage) {
            _this.toastr.warning(warningMessage, "Please note!");
            _this.versionNumber = _this.ac.devConfig.versionNumber;
            _this.navigateForward();
        });
    };
    MainFrame.prototype.navigateForward = function () {
        var _this = this;
        setTimeout(function () {
            _this.titleBlinking = false;
            var navigateTo = _this.ac.getLocalStorage("navigateTo");
            if (navigateTo)
                _this.navigateTo(navigateTo.feature);
            else
                _this.navigateTo("/splash");
            _this.appLoaded = true;
        }, this.ac.devConfig.splashTime); // navigate away from splash view        
    };
    MainFrame.prototype.restartApp = function () {
        window.location.href = this.appHref;
    };
    MainFrame.prototype.setAppCache = function () {
        window.location.href = this.appCache;
    };
    MainFrame.prototype.navigateTo = function (feature) {
        var _this = this;
        this.selectedFeature = feature;
        if (feature === "/restart") {
            setTimeout(function () {
                _this.restartApp();
            }, 1000);
            return;
        }
        if (feature === "/appcache") {
            this.ac.setLocalStorage("appFeatures", { cached: true });
            this.toastr.info("This application will now perform offline, disconnected from the Internet.", "Success!");
            setTimeout(function () {
                _this.setAppCache();
            }, 5000);
            return;
        }
        this.ac.setLocalStorage("navigateTo", { feature: feature });
        this.router.navigate([feature]);
    };
    MainFrame.prototype.synchronize = function () {
        var _this = this;
        this.ac.synchronize("waitForSignal", function () {
            _this.restartApp();
        }, function () {
            // timed out so restart
            _this.synchronize();
        });
    };
    MainFrame.prototype.onClickAbout = function () {
        var _this = this;
        this.md.modalDialogTitle = "About: " + this.appTitle;
        this.md.owner = this;
        this.md.showOkButton = true;
        this.md.isClosable = true;
        this.md.desiredWidth = 530;
        this.md.desiredHeight = 200;
        this.showModalDialog = false;
        setTimeout(function () {
            _this.showModalDialog = true;
        });
    };
    MainFrame.prototype.dialogButtonClicked = function (buttonClicked) {
        if (buttonClicked === "ok")
            this.md.closeDialog();
    };
    return MainFrame;
}());
__decorate([
    core_1.ViewChild(modalDialog_1.ModalDialog),
    __metadata("design:type", modalDialog_1.ModalDialog)
], MainFrame.prototype, "md", void 0);
MainFrame = __decorate([
    core_2.Component({
        selector: "main-frame",
        //#region template:
        template: "\n<modal-dialog [isVisible]=\"showModalDialog\">\n    <div style=\"text-align: center; \">\n        <label >Version No.: {{versionNumber}}</label>\n        <br />\n        <div>The date is: {{date.toLocaleDateString()}}</div>\n        <div>The time is: {{date.toLocaleTimeString()}}</div>\n        <div>This is the week of: {{theWeekOf}}</div>        \n    </div>\n\n</modal-dialog>\n\n<div style=\"margin: 20px;\">\n    <view-fader [isViewVisible]=\"appLoaded\">    \n    <div *ngIf=\"appLoaded\" >\n        <a class=\"btn btn-default btn-sm\" style=\"float: right; margin-left: 50px; margin-top: 7px;\" (click)=\"onClickAbout();\">About</a>\n        <nav class=\"btn-group\" style=\"float: right; top: 7px; \">\n            <a class=\"btn btn-default btn-sm\" [ngClass]=\"{'btn-primary': selectedFeature == '/restart'}\" (click)=\"navigateTo('/restart')\">Restart</a>\n            <a class=\"btn btn-default btn-sm\" [ngClass]=\"{'btn-primary': selectedFeature == '/appcache'}\" (click)=\"navigateTo('/appcache')\">AppCache</a>\n            <a class=\"btn btn-default btn-sm\" [ngClass]=\"{'btn-primary': selectedFeature == '/splash'}\" (click)=\"navigateTo('/splash')\">Splash</a>\n            <a class=\"btn btn-default btn-sm\" [ngClass]=\"{'btn-primary': selectedFeature == '/settings'}\" (click)=\"navigateTo('/settings')\">Settings</a>\n            <a class=\"btn btn-default btn-sm\" [ngClass]=\"{'btn-primary': selectedFeature == '/features'}\" (click)=\"navigateTo('/features')\">Features</a>\n            <a class=\"btn btn-default btn-sm\" [ngClass]=\"{'btn-primary': selectedFeature == '/analytics'}\" (click)=\"navigateTo('/analytics')\">Analytics</a>\n        </nav>\n    </div>\n    </view-fader>\n    <view-blinker [blinking]=\"titleBlinking\" [visibleWhenNotBlinking]=\"titleVisibleWhenNotBlinking\">\n        <h1 style=\"text-align: center; overflow: hidden; \">{{appTitle}}</h1>\n    </view-blinker>\n\n    <router-outlet></router-outlet>\n</div>\n"/* this was squashed */,
        // #endregion
        providers: [appConfig_1.AppConfig]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, appConfig_1.AppConfig, ng2_toastr_1.ToastsManager, core_2.ViewContainerRef])
], MainFrame);
exports.MainFrame = MainFrame;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, appRouting_1.routing, ng2_toastr_1.ToastModule.forRoot(), animations_1.BrowserAnimationsModule, appAnimation_1.AppAnimation],
        declarations: [MainFrame, settings_1.Settings, splash_1.Splash, analytics_1.Analytics, features_1.Features, safeResource_1.SafeResource],
        providers: [{ provide: ng2_toastr_1.ToastsManager, useClass: bottomToastsManager_1.BottomToastsManager }],
        bootstrap: [MainFrame]
    })
], AppModule);
exports.AppModule = AppModule;
},{"./common/appConfig":362,"./common/appRouting":363,"./common/bottomToastsManager":365,"./common/node_modules/ng2-animation/appAnimation":366,"./common/node_modules/ng2-animation/modalDialog":368,"./common/safeResource":371,"./features/analytics":372,"./features/features":373,"./features/settings":374,"./features/splash":375,"@angular/core":5,"@angular/http":7,"@angular/platform-browser":10,"@angular/platform-browser/animations":9,"@angular/router":11,"moment":14,"ng2-toastr/ng2-toastr":15}],371:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var SafeResource = (function () {
    function SafeResource(sanitizer) {
        this.sanitizer = sanitizer;
        this.sanitizer = sanitizer;
    }
    SafeResource.prototype.transform = function (style) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(style);
    };
    return SafeResource;
}());
SafeResource = __decorate([
    core_1.Pipe({ name: "safeResource" }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
], SafeResource);
exports.SafeResource = SafeResource;
},{"@angular/core":5,"@angular/platform-browser":10}],365:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
;
var BottomToastsManager = (function (_super) {
    __extends(BottomToastsManager, _super);
    function BottomToastsManager(componentFactoryResolver, ngZone, appRef, options) {
        return _super.call(this, componentFactoryResolver, ngZone, appRef, Object.assign(options, {
            animate: "flyRight",
            positionClass: "toast-bottom-right",
            newestOnTop: true,
            toastLife: 5000
        })) || this;
    }
    return BottomToastsManager;
}(ng2_toastr_1.ToastsManager));
BottomToastsManager = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.NgZone, core_1.ApplicationRef, ng2_toastr_1.ToastOptions])
], BottomToastsManager);
exports.BottomToastsManager = BottomToastsManager;
},{"@angular/core":5,"ng2-toastr/ng2-toastr":15}],363:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var settings_1 = require("../features/settings");
var splash_1 = require("../features/splash");
var analytics_1 = require("../features/analytics");
var features_1 = require("../features/features");
var appRoutes = [
    { path: "settings", component: settings_1.Settings },
    { path: "", component: splash_1.Splash },
    { path: "splash", component: splash_1.Splash },
    { path: "analytics", component: analytics_1.Analytics },
    { path: "features", component: features_1.Features },
    { path: "**", redirectTo: "/splash", pathMatch: "full" }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
},{"../features/analytics":372,"../features/features":373,"../features/settings":374,"../features/splash":375,"@angular/router":11}],375:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// services
var appConfig_1 = require("../../app/common/appConfig");
var Splash = (function () {
    function Splash(config) {
        var _this = this;
        this.config = config;
        this.isViewVisible = false;
        this.image0Visible = false;
        this.image1Visible = false;
        this.image2Visible = false;
        this.image3Visible = false;
        this.image4Visible = false;
        this.image5Visible = false;
        this.image6Visible = false;
        this.sequence = 0;
        setTimeout(function () {
            _this.isViewVisible = true;
        });
    }
    Splash.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { _this.switchImages(); });
    };
    Splash.prototype.switchImages = function () {
        var _this = this;
        setInterval(function () {
            if (_this.sequence === 7)
                _this.sequence = 0;
            _this.image0Visible = false;
            _this.image1Visible = false;
            _this.image2Visible = false;
            _this.image3Visible = false;
            _this.image4Visible = false;
            _this.image5Visible = false;
            _this.image6Visible = false;
            switch (_this.sequence) {
                case 0:
                    _this.image0Visible = true;
                    break;
                case 1:
                    _this.image1Visible = true;
                    break;
                case 2:
                    _this.image2Visible = true;
                    break;
                case 3:
                    _this.image3Visible = true;
                    break;
                case 4:
                    _this.image4Visible = true;
                    break;
                case 5:
                    _this.image5Visible = true;
                    break;
                case 6:
                    _this.image6Visible = true;
                    break;
            }
            _this.sequence++;
        }, 2000);
    };
    return Splash;
}());
Splash = __decorate([
    core_1.Component({
        // #region template
        template: "\n<view-fader [isViewVisible]=\"isViewVisible\">\n    <h2 class=\"feature-title\">Technology Stack</h2>\n</view-fader>\n\n<expand-visible [isVisible] = \"image0Visible\" class=\"expand-visible\" >\n    <img alt=\"\" src=\"../../dist/images/visualstudio.png\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image1Visible\" class=\"expand-visible\">\n    <img alt=\"\" src=\"../../dist/images/angular4.png\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image2Visible\" class=\"expand-visible\">\n    <img alt=\"\" src=\"../../dist/images/git-octocat.png\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image3Visible\" class=\"expand-visible\">\n    <img alt=\"\" src=\"../../dist/images/gulp.png\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image4Visible\" class=\"expand-visible\">\n    <img alt=\"\" src=\"../../dist/images/node.png\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image5Visible\" class=\"expand-visible\">\n    <img alt=\"\" src=\"../../dist/images/npm.png\" class=\"feature-image\" />\n</expand-visible>\n\n<expand-visible [isVisible]=\"image6Visible\" class=\"expand-visible\">\n    <img alt=\"\" src=\"../../dist/images/netcore.png\" class=\"feature-image\" />\n</expand-visible>\n    "/* this was squashed */,
        styles: ["\n.feature-title {\n    color: rgba(51, 122, 183, 1);\n    background-color: rgba(223, 223, 223, 1);\n    padding: 10px;\n    width: 300px;\n    height: 50px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-image {\n    margin-top: 100px;\n    width: 100%;\n    height: 100%; \n}\n\n.expand-visible {\n    position: absolute;\n    top: 100px;\n    left: 100px;\n}"/* this was squashed */]
        // #endregion
    }),
    __metadata("design:paramtypes", [appConfig_1.AppConfig])
], Splash);
exports.Splash = Splash;
},{"../../app/common/appConfig":362,"@angular/core":5}],374:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// services
var appConfig_1 = require("../../app/common/appConfig");
var Settings = (function () {
    function Settings(config) {
        this.config = config;
        this.isViewVisible = false;
        this.isViewVisible = true;
    }
    return Settings;
}());
Settings = __decorate([
    core_1.Component({
        // #region template
        template: "\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n    <h2 class=\"feature-title\">SETTINGS</h2>\n    <br/>\n    <div style=\"font-size: 20px;\">\n        <div>Debug={{config.devConfig.debug}}</div>\n        <div>Testing={{config.devConfig.testing}}</div>\n        <div>Splash Time={{config.devConfig.splashTime}}ms</div>\n        <div>App Cached={{config.devConfig.appCached}}</div>\n        <div>Online Status={{config.devConfig.onlineStatus}}</div>        \n    </div>\n\n</view-fader>\n\n    "/* this was squashed */,
        styles: ["\n    .feature-title {\n        color: rgba(51, 122, 183, 1);\n        background-color: rgba(223, 223, 223, 1);\n        padding: 10px;\n        width: 200px;\n        height: 50px;\n        text-align: center;\n        border-radius: 25px;\n    }\n"/* this was squashed */]
        // #endregion
    }),
    __metadata("design:paramtypes", [appConfig_1.AppConfig])
], Settings);
exports.Settings = Settings;
},{"../../app/common/appConfig":362,"@angular/core":5}],373:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// services
var appConfig_1 = require("../../app/common/appConfig");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var Features = (function () {
    function Features(config, toastr) {
        this.config = config;
        this.toastr = toastr;
        this.isViewVisible = false;
        this.isViewVisible = true;
    }
    return Features;
}());
Features = __decorate([
    core_1.Component({
        // #region template
        template: "\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n    <h2 class=\"feature-title\">FEATURES</h2>\n\n    <div class=\"panel-group\">\n        <div class=\"feature-list panel panel-default\">\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"showOverview = !showOverview\">Overview</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"showOverview\" *ngIf=\"showOverview\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                This document details the features of the Angular.Net Starter App used in the course titled \"Angular and ASP.Net Core Productivity Playbook\". By using the techniques described in the course, you are already further ahead of where you would be by starting from scratch. In fact, in terms of a projects lifecycle, the techniques used in the Angular.Net Starter App will put you months beyond where you would be not knowing these techniques.\n                <br /><br />\n                Unlike many developer, I spend much time analyzing the workflow and looking for shortcuts to developing an application. The key is automation. A little upfront time, researching and analyzing the workflow, will save you months of development time later. And that is what I can share with you. I've spent months, not only looking for shortcuts to make the development quicker, but also to enhance the performance, and make the application easier to maintain.\n                <br /><br />\n                As a Microsoft developer, you have become used to not having the need to drop down to the command line to perform an operation. By automating the development process, you will become less fatigued, and be able to spend your attention doing development.\n                <br /><br />\n                The target audience for the course and the Angular.Net Starter App is the ASP.Net Core Developer that would like to use Angular, which is Google's well documented and robust client-side framework.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"prerequisites = !prerequisites\">Prerequisites and References</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"prerequisites\" *ngIf=\"prerequisites\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                In order to use the Angular.Net Starter App you will need to download and install NodeJS. By installing NodeJS you will automatically install NPM, the Node Package Manage. Here are some links:\n                <br />\n                <a href=\"https://nodejs.org/en\" target=\"_blank\" >NodeJs</a>\n                <br />\n                <a href=\"http://blog.npmjs.org/post/85484771375/how-to-install-npm\" target=\"_blank\" >How to Install</a>\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"compatibility = !compatibility\">Compatibility</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"compatibility\" *ngIf=\"compatibility\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                The most compatible web applications will perform with all modern browsers. To ensure that, this feature-set supports all browsers that support ECMAScript 5 (ES5).\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"template = !template\">Project Template</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"template\" *ngIf=\"template\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                When creating an ASP.Net Core project, you are given 2 chooses. The project template I have chosen is the ASP.Net Core Web Application with the .Net Core. This project template has the benefit of running on Linux, macOS as well as Windows using .Net Core. Then you have 2 more choses for what type of middleware, WebAPI or MVC. Since we have no need for MVC we will chose the WebAPI.\n                <br /><br />\n                By the way, since many Microsoft developer are coming from a background of MVC, you should know that Angular and MVC are mutually exclusive. As soon as you understand the full benefits of creating and allowing the Angular framework to handle the UI. Not only is it faster and easier to maintain, but it also embraces the web technologies. Sorry to say it, but you are going to have to understand web technologies to be a good, modern web developer.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"libraries = !libraries\">3rd Party Libraries</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"libraries\" *ngIf=\"libraries\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                There are many 3rd party libraries already integrated into the Angular.Net Starter App, but easy to remove if there is no need for them. Also, there is no need for SignalR, or jQuery or any other dependency libraries. Each library is self-contained.\n                Following is a list of integrated libraries:\n                <br /><br />\n                bootstrap\n                <br />\n                ng2-toastr\n                <br />\n                font-awesome\n                <br />\n                rxjs\n                <br />\n                lodash\n                <br />\n                moment\n                <br />\n                file-saver\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"abstracting = !abstracting\">Abstracting Debug from Release</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"abstracting\" *ngIf=\"abstracting\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                As an ASP.net Core developer you may not understand the significant difference between being in a debug development mode, or a release development mode. Well, guess what? There is a big difference! Once you realize that the sooner you will be productive. When you are developing your application, you are running locally with not too much latency. However, when you are running an application remotely there is a vast latency to be concerned about. This can be a rude awakening for many developer that are just getting into the technology.\n                <br /><br />\n                Visual Studio and ASP.Net Core make it easy to determine the development configuration mode that you are in and allow you to configure the outputting results according to the configuration mode. This is all handled in the Startup.cs file.\n                <br /><br />\n                Within the Startup.cs file we know what configuration mode we are in and this will determine which default.html file to serve up. Also there are some tricks you can play that will allow you to get to get to you node_modules without needing to copying them to the wwwroot folder.\n                <br /><br />\n                The Angular.Net Starter App already has these hooks and the course will detail these hooks.\n                <br />\n                &nbsp;&nbsp;&nbsp;&nbsp;1) Giving access to the node_modules in the Debug mode\n                <br />\n                &nbsp;&nbsp;&nbsp;&nbsp;2) Serving the appropriate default.html files depending on the configuration mode\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"restart = !restart\">Automatic Restart</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"restart\" *ngIf=\"restart\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                When you are developing with client-side technologies such as Angular, you realize the benefit to being able to restart your application just by changing and saving your files. Unfortunately, when you create an ASP.Net project without choosing an MVC project template, you will not get this for free. I have implemented a simple solution involving gulp and a WebAPI endpoint that will watch for files changing, then automatically restarting your application once it detects changes. This is another huge timesaver.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"gulp = !gulp\">Using Gulp to do the Heavy Lifting</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"gulp\" *ngIf=\"gulp\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                I would have never guessed that I was going to need NodeJS and Gulp to be an efficient application developer. Now I truly can't live without those 2 technologies. In case you didn't know, NodeJS comes with NPM, which is a repository for storing Node packages. And Gulp is a JavaScript task runner that lets you automate tasks. You can use Gulp tasks for everything from downloading any updated libraries to restarting your application anytime a file has changed. And you can bind these tasks to events, such as build events and Git event. In the course I will explore all the things that you can do to let NodeJS and Gulp do the heavy lifting.\n                <br /><br />\n                Also, as another feature of the Starter App, I have implemented an easier way to organize your gulpfile by breaking up into smaller, more manageable gulp files.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"streamline = !streamline\">Automation to Streamline the Workflow</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"streamline\" *ngIf=\"streamline\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                By using Gulp and the Task Runner Explorer, we can bind to these events:\n                <br /><br />\n                1) Before Build\n                <br />\n                2) After Build\n                <br />\n                3) Clean\n                <br />\n                4) Project Opens\n                <br /><br />\n                By using Node and the git hooks, we can bind to these events:\n                <br /><br />\n                1) applypatch-msg\n                <br />\n                2) pre-applypatch\n                <br />\n                3) post-applypatch\n                <br />\n                4) pre-commit\n                <br />\n                5) prepare-commit-msg\n                <br />\n                6) commit-msg\n                <br />\n                7) post-commit\n                <br />\n                8) pre-rebase\n                <br />\n                9) post-checkout\n                <br />\n                10) post-merge\n                <br />\n                11) pre-receive\n                <br />\n                12) update\n                <br />\n                13) post-receive\n                <br />\n                14) post-update\n                <br />\n                15) pre-auto-gc\n                <br />\n                16) post-rewrite\n                <br />\n                17) pre-push\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"release = !release\">Creating a Release Bundle</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"release\" *ngIf=\"release\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                The Angular.Net Starter App has many features that can make your application perform faster and make it easier to maintain. Creating a release bundle is one of them that does many things in one process. Within the Angular.Net Starter App, I am using the pre-commit git hook to automate the following tasks for the release bundle. Following is a list of all the benefits of creating a release bundle using the routines provided by the Angular.Net Starter App Release Bundler.\n                <br /><br />\n                1) Separates the framework from the application\n                <br />\n                2) Concatenate and bundle the framework with the 3rd party libraries\n                <br />\n                3) Minify the framework bundle\n                <br />\n                4) Squash the html and css into the components\n                <br />\n                5) Concatenate and bundle the application\n                <br />\n                6) Minify the application bundle\n                <br />\n                7) Creates the application manifest\n                <br />\n                8) Enabling the production mode\n                <br />\n                9) Creating an application manifest\n                <br />\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"bundling = !bundling\">Bundling Techniques</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"bundling\" *ngIf=\"bundling\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                There are many bundling techniques which can reduce the download payload which in turn will increase the performance of an application. The one I favor has a completely different concept that is closer to how a desktop application works. The simple explanation is that there are 2 bundles. One for the framework and 3rd party libraries that will seldom change, and the other for the application, which will probably change frequently.\n                <br /><br />\n                This approach gives favor to the user that is returning to the application, and not the first time user.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"squashing = !squashing\">Squashing the Html and Css</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"squashing\" *ngIf=\"squashing\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                With this technique it is possible to greatly reduce the download payload. Here is how it works. Most all Angular components have an associated html template URL and some have an associated css URL. These files are always easier to edit using you html and css editors. What the squashing process does is put a copy of the html and css into the component itself, and now there is no need to download the html and css files. Now you don't need to download the html and css files. This is a big performance gain.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"enableProdMode = !enableProdMode\">EnableProdMode</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"enableProdMode\" *ngIf=\"enableProdMode\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                If you enable prod mode, your application will perform faster, but without useful information such as assertions. It's easy to implement but only make sense for a release build. I've implemented a hook into the release build that will insert the \"EnableProdMode\" into the App Module. Just another automation technique that will allow you to spend your attention on development.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"manifest = !manifest\">Creating the Application Manifest</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"manifest\" *ngIf=\"manifest\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                I've given a lot of attention to the web technologies that enable applications to work off-line. This is something like have a web app that performs like a desktop app. The Angular.Net Starter App can perform most function while being complete disconnected from the Internet. This is currently implemented in the release build process and can be completely automated.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"reusingModules = !reusingModules\">Productivity by Reusing Modules</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"reusingModules\" *ngIf=\"reusingModules\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                I've created and attached an animation module to the Angular.Net Starter App. In the course I will show you how to publish a library in the form of a module that can be reused across your enterprise. This will be a huge productivity gain.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"reusingGulpFiles = !reusingGulpFiles\">Productivity by Using and Reusing Gulp Files</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"reusingGulpFiles\" *ngIf=\"reusingGulpFiles\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                As a proficient software developer, you are not going to want to start from scratch creating a new gulpfile, every time you start a new project. In the course I will show you how to organize your gulp task to be more maintainable, and how to publish your gulp files for reusing on other projects.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"debuggingGulp = !debuggingGulp\">Debugging Gulp Files</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"debuggingGulp\" *ngIf=\"debuggingGulp\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                I have made it easy to debug gulp files by creating a supporting project titled DebugGulpfile. This supporting project will allow you to step into and debug your gulp files. All you need to do is start the project, then set a break point in the tasklist.js files execute method, then double-click on one of the task in the Task Runner Explorer. Make sure that you select the DebugGulpfile in the Task Runner Explorer before double-clicking.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"versioning = !versioning\">Versioning the Application</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"versioning\" *ngIf=\"versioning\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                By using NodeJS, it possible bump up the version number. This can be automated by binding it a build event or to a git-hook. During the course I will demonstrate both bindings, and the technique for incrementing the version number using NodeJS and Gulp.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"exception = !exception\">Exception Handling</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"exception\" *ngIf=\"exception\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                ASP.Net Core applications need a different method for returning exception data back to the Angular service. The Angular.Net Starter App implements a technique to return useful exception information back to the client, which is later stored on the client for analysis.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"parameters = !parameters\">Passing Parameters to the Server</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"parameters\" *ngIf=\"parameters\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                ASP.Net Core applications use a different method for abstracting the application parameter. These type of parameter, such as connection string, used to be stored in the web.config. Now they are stored in the appsettings.json. This is also a good place to store the application version number.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"switches = !switches\">Software Switches to Automate the Development Workflow</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"switches\" *ngIf=\"switches\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                Test switches can make development quicker by setting up your code in such a way to quickly return to an area in the application that you are currently implementing. This eliminate the need for repetitive keystroke and mouse clicks, just to get you to where you need to be in the application to continue working. I'll show you how in the course to make this possible and not running the risk that this test switches affect the production build.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"ooTechniques = !ooTechniques\">Benefits using client-side OO Techniques</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"ooTechniques\" *ngIf=\"ooTechniques\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                Most ASP.Net developer understand the benefit of using object oriented techniques such as inheritance, and encapsulation, but don't understand how that is possible with JavaScript. With the advantage of TypeScript and transpilers this actually is pretty easy and give huge benefits to the integrity and maintainability of the application. The Angular.Net Starter App uses most of these object oriented techniques. Following is a list.\n                <br /><br />\n                1)	Strong data types\n                <br />\n                2)	Classes\n                <br />\n                3)	Modules\n                <br />\n                4)	Inheritance\n                <br />\n                5)	Accessibility (private/public)\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"performanceData = !performanceData\">Saving and Displaying Errors and Performance Data on the Client</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"performanceData\"  *ngIf=\"performanceData\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                The Angular.Net Starter App has a feature for displaying the error that where generated on the server. This feature also displays performance data that is inserted into the code as Performance Markers. During the course we are going to use Microsoft Edge to display the Performance Markers, and show how to use the Performance feature of Microsoft Edge to store and analyze timing information.\n            </view-fader>\n\n            <div class=\"feature-heading panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a href=\"javascript:void(0);\" style=\"font-size: 22px;\" (click)=\"lastFeature = !lastFeature\">Saving the Navigation to the Last Feature</a>\n                </h4>\n            </div>\n            <view-fader [isViewVisible]=\"lastFeature\" *ngIf=\"lastFeature\" class=\"list-group\" style=\"margin: 25px; font-size: 18px;\">\n                This may not seem like a big deal, but sometimes it is best to pick-up where you left off using an application. So by saving the last feature that was used before exiting, it's possible to return to that feature when the application is launched again. I don't intend on explaining this feature in the course, but you can see by examining the source that the technology used is local storage.\n            </view-fader>\n\n        </div>\n    </div>\n\n</view-fader>\n"/* this was squashed */,
        styles: ["\n.feature-title {\n    color: rgba(51, 122, 183, 1);\n    background-color: rgba(223, 223, 223, 1);\n    padding: 10px;\n    width: 200px;\n    height: 50px;\n    text-align: center;\n    border-radius: 25px;\n}\n\n.feature-list {\n    background-color: rgba(223, 223, 223, 1);\n    padding: 10px;\n    border-radius: 25px;\n}\n\n.feature-heading {\n    padding: 10px;\n    border-radius: 15px;\n}\n"/* this was squashed */]
        // #endregion
    }),
    __metadata("design:paramtypes", [appConfig_1.AppConfig, ng2_toastr_1.ToastsManager])
], Features);
exports.Features = Features;
},{"../../app/common/appConfig":362,"@angular/core":5,"ng2-toastr/ng2-toastr":15}],372:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// services
var appConfig_1 = require("../common/appConfig");
var Analytics = (function () {
    function Analytics(ac) {
        this.ac = ac;
        this.isViewVisible = false;
        this.isViewVisible = true;
        ac.updateAnalytics();
    }
    Analytics.prototype.onClickClearErrors = function () {
        this.ac.clearExceptions();
    };
    Analytics.prototype.onClickClearResponseTime = function () {
        this.ac.clearResponseTime();
    };
    Analytics.prototype.getAverageResponseTime = function () {
    };
    return Analytics;
}());
Analytics = __decorate([
    core_1.Component({
        // #region template
        template: "\n\n<view-fader [isViewVisible]=\"isViewVisible\">\n    <h2 class=\"feature-title\">Analytics</h2>\n    <span style=\"font-size: 25px;\">\n        <span style=\"margin-left: 40%; font-weight: bold; \">Exceptions</span>\n        <span style=\"float: right;\">\n            Errors Count: {{ac.analyticsData.exceptions.length}}\n            <button class=\"btn btn-primary\" [disabled]=\"ac.analyticsData.exceptions.length === 0\" style=\"width: 75px;\" (click)=\"onClickClearErrors()\">Clear</button>        \n        </span>&nbsp;&nbsp;\n    </span>\n    <div style=\"height: 10px;\"></div>\n    <div class=\"panel-group\">\n        <div class=\"panel-group\">\n            <div class=\"panel panel-default\" *ngFor=\"let exception of ac.analyticsData.exceptions\">\n                <div class=\"panel-heading\">\n                    <h4 class=\"panel-title\">\n                        <span>{{exception.dateString}}&nbsp;&nbsp;&nbsp;{{exception.timeString}}&nbsp;&nbsp;&nbsp;{{exception.errorMessage}}</span>\n                    </h4>\n                </div>\n\n            </div>\n        </div>\n    </div>\n    \n    <span style=\"font-size: 25px;\">\n        <span style=\"margin-left: 40%; font-weight: bold; \">Performance</span>\n        <span style=\"float: right;\">\n            Average Response Time: {{ac.analyticsData.averageResponseTime}}ms\n            <button class=\"btn btn-primary\" [disabled]=\"ac.analyticsData.performances.length === 0\" style=\"width: 75px;\" (click)=\"onClickClearResponseTime()\">Clear</button>\n        </span>&nbsp;&nbsp;\n    </span>\n    <div style=\"height: 10px;\"></div>\n    <div class=\"panel-group\">\n        <div class=\"panel-group\">\n            <div class=\"panel panel-default\" *ngFor=\"let performance of ac.analyticsData.performances\">\n                <div class=\"panel-heading\">\n                    <h4 class=\"panel-title\">\n                        <span>{{performance.dateString}}&nbsp;&nbsp;&nbsp;{{performance.timeString}}&nbsp;&nbsp;&nbsp;{{performance.responseTime}}ms</span>\n                    </h4>\n                </div>\n\n            </div>\n        </div>\n\n    </div>    \n    \n\n\n</view-fader>\n   "/* this was squashed */,
        styles: ["\n    .feature-title {\n        color: rgba(51, 122, 183, 1);\n        background-color: rgba(223, 223, 223, 1);\n        padding: 10px;\n        width: 200px;\n        height: 50px;\n        text-align: center;\n        border-radius: 25px;\n    }\n"/* this was squashed */]
        // #endregion
    }),
    __metadata("design:paramtypes", [appConfig_1.AppConfig])
], Analytics);
exports.Analytics = Analytics;
},{"../common/appConfig":362,"@angular/core":5}],362:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var devConfig_1 = require("../models/devConfig");
var baseServices_1 = require("./baseServices");
var analyticsData_1 = require("../models/analyticsData");
var moment = require("moment");
var _ = require("lodash");
var AppConfig = (function (_super) {
    __extends(AppConfig, _super);
    function AppConfig(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        return _this;
    }
    AppConfig.prototype.updateAnalytics = function () {
        this.analyticsData = this.getLocalStorage("analyticsData");
        this.analyticsData.exceptions = _.map(this.analyticsData.exceptions, function (a) {
            a.dateString = moment(a.date).format("YYYY-MM-DD");
            a.timeString = moment(a.date).format("HH:mm:ss");
            return a;
        });
        var totalResponseTime = 0;
        this.analyticsData.performances = _.map(this.analyticsData.performances, function (a) {
            a.dateString = moment(a.date).format("YYYY-MM-DD");
            a.timeString = moment(a.date).format("HH:mm:ss");
            totalResponseTime += a.responseTime;
            return a;
        });
        if (this.analyticsData.performances.length === 0)
            this.analyticsData.averageResponseTime = 0;
        else
            this.analyticsData.averageResponseTime = Math.round(totalResponseTime / this.analyticsData.performances.length);
    };
    AppConfig.prototype.clearExceptions = function () {
        this.analyticsData.exceptions.length = 0;
        this.setLocalStorage("analyticsData", this.analyticsData);
    };
    AppConfig.prototype.clearResponseTime = function () {
        this.analyticsData.performances.length = 0;
        this.setLocalStorage("analyticsData", this.analyticsData);
    };
    AppConfig.prototype.logResonseData = function (responseTime) {
        var analyticsData = this.getLocalStorage("analyticsData");
        if (analyticsData.performances.length > 9) {
            analyticsData.performances.pop();
        }
        var performance = new analyticsData_1.Performance();
        performance.date = new Date();
        performance.responseTime = responseTime;
        analyticsData.performances.unshift(performance);
        this.setLocalStorage("analyticsData", analyticsData);
    };
    AppConfig.prototype.getDevConfig = function (success, error) {
        var _this = this;
        this.beginRequest = new Date().getTime();
        performance.mark("BEGIN REQUEST");
        this.httpGet("sysInfo", function (devConfig) {
            _this.logResonseData(new Date().getTime() - _this.beginRequest);
            _this.setLocalStorage("devConfig", devConfig);
            performance.mark("REQUEST ENDED");
            (_this.getLocalStorage("appFeatures")) ? devConfig.appCached = true : devConfig.appCached = false;
            _this.devConfig = devConfig;
            _this.devConfig.onlineStatus = true;
            success();
        }, function (errorMessage) {
            _this.devConfig = _this.getLocalStorage("devConfig");
            if (!_this.devConfig) {
                _this.devConfig = new devConfig_1.DevConfig();
                _this.devConfig.debug = false;
                _this.devConfig.testing = false;
                _this.devConfig.appCached = false;
                _this.devConfig.versionNumber = "xx.xx.xx";
                _this.devConfig.splashTime = 5000;
                _this.devConfig.onlineStatus = true;
            }
            if (typeof errorMessage === "object") {
                errorMessage = "This application is offline and will continue running from the Application Cache!";
                _this.devConfig.onlineStatus = false;
                _this.devConfig.appCached = true;
            }
            error(errorMessage);
        });
    };
    AppConfig.prototype.synchronize = function (actionName, success, error) {
        this.httpPost({ action: actionName }, "sync", function () {
            success();
        }, function (errorMessage) {
            error(errorMessage);
        });
    };
    return AppConfig;
}(baseServices_1.BaseServices));
AppConfig = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AppConfig);
exports.AppConfig = AppConfig;
},{"../models/analyticsData":377,"../models/devConfig":378,"./baseServices":364,"@angular/core":5,"@angular/http":7,"lodash":13,"moment":14}],378:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DevConfig = (function () {
    function DevConfig() {
    }
    return DevConfig;
}());
exports.DevConfig = DevConfig;
},{}],364:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var analyticsData_1 = require("../models/analyticsData");
var BaseServices = (function () {
    function BaseServices(http) {
        this.http = http;
        if (!this.getLocalStorage("analyticsData")) {
            var analyticsData = new analyticsData_1.AnalyticsData();
            analyticsData.exceptions = new Array();
            analyticsData.performances = new Array();
            this.setLocalStorage("analyticsData", analyticsData);
        }
    }
    BaseServices.prototype.httpGet = function (controller, success, error) {
        this.get(controller)
            .subscribe(function (obj) { success(obj); }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BaseServices.prototype.get = function (controller) {
        return this.http.get("api/" + controller)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BaseServices.prototype.httpPost = function (object, controller, success, error) {
        this.post(object, controller)
            .subscribe(function (obj) { success(obj); }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BaseServices.prototype.post = function (object, controller) {
        return this.http.post("api/" + controller, object)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BaseServices.prototype.httpDelete = function (controller, success, error) {
        this.delete(controller)
            .subscribe(function (obj) { success(obj); }, function (errorMessage) {
            error(errorMessage);
        });
    };
    BaseServices.prototype.delete = function (controller) {
        return this.http.delete("api/" + controller)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BaseServices.prototype.handleError = function (error, caught) {
        if (error.status !== 502 && error.status !== 0) {
            var analyticsData = JSON.parse(localStorage.getItem("analyticsData"));
            if (analyticsData.exceptions.length > 99) {
                analyticsData.exceptions.pop();
            }
            var exception = new analyticsData_1.Exception();
            exception.date = new Date();
            exception.errorMessage = error._body;
            analyticsData.exceptions.unshift(exception);
            localStorage.setItem("analyticsData", JSON.stringify(analyticsData));
        }
        return Rx_1.Observable.throw(error._body);
    };
    BaseServices.prototype.setLocalStorage = function (name, anyObject) {
        if (anyObject instanceof Array) {
            anyObject = { array: anyObject };
        }
        if (typeof (anyObject) == "object") {
            var stringVal = JSON.stringify(anyObject);
            if (stringVal)
                localStorage.setItem(name, stringVal);
        }
    };
    BaseServices.prototype.getLocalStorage = function (name) {
        var value = localStorage.getItem(name);
        if (!value)
            return null;
        if (value.substring(0, 1) === "{") {
            var obj = JSON.parse(value);
            if ("array" in obj)
                return obj.array;
            return obj;
        }
        return null;
    };
    return BaseServices;
}());
exports.BaseServices = BaseServices;
},{"../models/analyticsData":377,"rxjs/Rx":29}],377:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exception = (function () {
    function Exception() {
    }
    return Exception;
}());
exports.Exception = Exception;
var Performance = (function () {
    function Performance() {
    }
    return Performance;
}());
exports.Performance = Performance;
var AnalyticsData = (function () {
    function AnalyticsData() {
    }
    return AnalyticsData;
}());
exports.AnalyticsData = AnalyticsData;
},{}]},{},[361])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ3d3dyb290XFxhcHBcXGJvb3RzdHJhcC50cyIsInd3d3Jvb3RcXGFwcFxcbWFpbkZyYW1lLnRzIiwid3d3cm9vdFxcYXBwXFxjb21tb25cXHNhZmVSZXNvdXJjZS50cyIsInd3d3Jvb3RcXGFwcFxcY29tbW9uXFxib3R0b21Ub2FzdHNNYW5hZ2VyLnRzIiwid3d3cm9vdFxcYXBwXFxjb21tb25cXGFwcFJvdXRpbmcudHMiLCJ3d3dyb290XFxhcHBcXGZlYXR1cmVzXFxzcGxhc2gudHMiLCJ3d3dyb290XFxhcHBcXGZlYXR1cmVzXFxzZXR0aW5ncy50cyIsInd3d3Jvb3RcXGFwcFxcZmVhdHVyZXNcXGZlYXR1cmVzLnRzIiwid3d3cm9vdFxcYXBwXFxmZWF0dXJlc1xcYW5hbHl0aWNzLnRzIiwid3d3cm9vdFxcYXBwXFxjb21tb25cXGFwcENvbmZpZy50cyIsInd3d3Jvb3RcXGFwcFxcbW9kZWxzXFxkZXZDb25maWcudHMiLCJ3d3dyb290XFxhcHBcXGNvbW1vblxcYmFzZVNlcnZpY2VzLnRzIiwid3d3cm9vdFxcYXBwXFxtb2RlbHNcXGFuYWx5dGljc0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLDhFQUEyRTtBQUUzRSx5Q0FBd0M7QUFFeEMsaURBQXNCLEVBQUUsQ0FBQyxlQUFlLENBQUMscUJBQVMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ0pwRCxzQ0FBMkM7QUFDM0Msc0NBQW9FO0FBQ3BFLDhEQUEwRDtBQUMxRCxzQ0FBNEQ7QUFDNUQsMENBQXlEO0FBQ3pELG1FQUErRTtBQUMvRSxvREFBaUY7QUFDakYsK0JBQWlDO0FBQ2pDLFdBQVc7QUFDWCxnREFBK0M7QUFDL0Msa0RBQThDO0FBQzlDLG9FQUFtRTtBQUNuRSxpRkFBZ0Y7QUFDaEYsV0FBVztBQUNYLGdEQUErQztBQUMvQyw0Q0FBMkM7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QUFDO1lBQ2hDLElBQU0sR0FBRyxHQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQztnQkFDZixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0E3RkEsQUE2RkMsSUFBQTtBQTdGWSxvQ0FBWTs7OztBQ0p6QjtJQUFBO0lBS0EsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FMQSxBQUtDLElBQUE7QUFMWSw4QkFBUztBQU90QjtJQUFBO0lBS0EsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FMQSxBQUtDLElBQUE7QUFMWSxrQ0FBVztBQU94QjtJQUFBO0lBSUEsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FKQSxBQUlDLElBQUE7QUFKWSxzQ0FBYSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pY1wiO1xyXG5pbXBvcnQgeyBlbmFibGVQcm9kTW9kZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gXCIuL21haW5GcmFtZVwiO1xyXG5cclxucGxhdGZvcm1Ccm93c2VyRHluYW1pYygpLmJvb3RzdHJhcE1vZHVsZShBcHBNb2R1bGUpOyIsImltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgZW5hYmxlUHJvZE1vZGUsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnNcIjtcclxuaW1wb3J0IHsgVG9hc3RNb2R1bGUsIFRvYXN0c01hbmFnZXIsIFRvYXN0T3B0aW9ucyB9IGZyb20gXCJuZzItdG9hc3RyL25nMi10b2FzdHJcIjtcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuLy8gc2VydmljZXNcclxuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSBcIi4vY29tbW9uL2FwcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyByb3V0aW5nIH0gZnJvbSBcIi4vY29tbW9uL2FwcFJvdXRpbmdcIjtcclxuaW1wb3J0IHsgQm90dG9tVG9hc3RzTWFuYWdlciB9IGZyb20gXCIuL2NvbW1vbi9ib3R0b21Ub2FzdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEFwcEFuaW1hdGlvbiB9IGZyb20gXCIuL2NvbW1vbi9ub2RlX21vZHVsZXMvbmcyLWFuaW1hdGlvbi9hcHBBbmltYXRpb25cIjtcclxuLy8gZmVhdHVyZXNcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi9mZWF0dXJlcy9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTcGxhc2ggfSBmcm9tIFwiLi9mZWF0dXJlcy9zcGxhc2hcIjtcclxuaW1wb3J0IHsgQW5hbHl0aWNzIH0gZnJvbSBcIi4vZmVhdHVyZXMvYW5hbHl0aWNzXCI7XHJcbmltcG9ydCB7IEZlYXR1cmVzIH0gZnJvbSBcIi4vZmVhdHVyZXMvZmVhdHVyZXNcIjtcclxuLy8gcGlwZXMgJiBhbmltYXRpb25cclxuaW1wb3J0IHsgU2FmZVJlc291cmNlIH0gZnJvbSBcIi4vY29tbW9uL3NhZmVSZXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZyB9IGZyb20gXCIuL2NvbW1vbi9ub2RlX21vZHVsZXMvbmcyLWFuaW1hdGlvbi9tb2RhbERpYWxvZ1wiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm1haW4tZnJhbWVcIixcclxuICAgIC8vI3JlZ2lvbiB0ZW1wbGF0ZTpcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tYWluRnJhbWUuaHRtbFwiLFxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG4gICAgcHJvdmlkZXJzOiBbQXBwQ29uZmlnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE1haW5GcmFtZSB7XHJcbiAgICBAVmlld0NoaWxkKE1vZGFsRGlhbG9nKSBtZDogTW9kYWxEaWFsb2c7XHJcbiAgICBcclxuICAgIHByaXZhdGUgYXBwVGl0bGUgPSBcIkFuZ3VsYXIuTmV0IFN0YXJ0ZXIgQXBwbGljYXRpb25cIjtcclxuICAgIHByaXZhdGUgZGF0ZTogRGF0ZTtcclxuICAgIHByaXZhdGUgdGhlV2Vla09mOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGFwcEhyZWY6IHN0cmluZztcclxuICAgIHByaXZhdGUgYXBwQ2FjaGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgdGl0bGVCbGlua2luZyA9IHRydWU7XHJcbiAgICBwcml2YXRlIHRpdGxlVmlzaWJsZVdoZW5Ob3RCbGlua2luZyA9IHRydWU7XHJcbiAgICBwcml2YXRlIHNob3dNb2RhbERpYWxvZyA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSB2ZXJzaW9uTnVtYmVyID0gXCJcIjtcclxuICAgIHByaXZhdGUgc2VsZWN0ZWRGZWF0dXJlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGFwcExvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGFjOiBBcHBDb25maWcsIHByaXZhdGUgdG9hc3RyOiBUb2FzdHNNYW5hZ2VyLCB2UmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICAgICAgdGhpcy50b2FzdHIuc2V0Um9vdFZpZXdDb250YWluZXJSZWYodlJlZik7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLnRoZVdlZWtPZiA9IG1vbWVudCgpLnN0YXJ0T2YoXCJ3ZWVrXCIpLmZvcm1hdChcImRkZCBNTU0gRCBZWVlZXCIpO1xyXG4gICAgICAgIHRoaXMuYXBwSHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnN1YnN0cigwLCB3aW5kb3cubG9jYXRpb24uaHJlZi5sYXN0SW5kZXhPZihcIi9cIikgKyAxKTtcclxuICAgICAgICB0aGlzLmFwcENhY2hlID0gdGhpcy5hcHBIcmVmICsgXCJhcHBjYWNoZS5odG1sXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmFjLmdldERldkNvbmZpZygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmVyc2lvbk51bWJlciA9IHRoaXMuYWMuZGV2Q29uZmlnLnZlcnNpb25OdW1iZXI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjLmRldkNvbmZpZy50ZXN0aW5nICYmIHRoaXMuYWMuZGV2Q29uZmlnLmRlYnVnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jaHJvbml6ZSgpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RyLnN1Y2Nlc3MoXCJUaGlzIGFwcGxpY2F0aW9uIGlzIG9wZXJhdGluZyBvbmxpbmUgYXMgbm9ybWFsLlwiLCBcIlN1Y2Nlc3MhXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZUZvcndhcmQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgKHdhcm5pbmdNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3RyLndhcm5pbmcod2FybmluZ01lc3NhZ2UsIFwiUGxlYXNlIG5vdGUhXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnNpb25OdW1iZXIgPSB0aGlzLmFjLmRldkNvbmZpZy52ZXJzaW9uTnVtYmVyO1xyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlRm9yd2FyZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF2aWdhdGVGb3J3YXJkKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlQmxpbmtpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGVUbyA9IHRoaXMuYWMuZ2V0TG9jYWxTdG9yYWdlKFwibmF2aWdhdGVUb1wiKTtcclxuICAgICAgICAgICAgaWYgKG5hdmlnYXRlVG8pXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG8obmF2aWdhdGVUby5mZWF0dXJlKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvKFwiL3NwbGFzaFwiKTtcclxuICAgICAgICAgICAgdGhpcy5hcHBMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH0sIHRoaXMuYWMuZGV2Q29uZmlnLnNwbGFzaFRpbWUpOyAvLyBuYXZpZ2F0ZSBhd2F5IGZyb20gc3BsYXNoIHZpZXcgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzdGFydEFwcCgpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuYXBwSHJlZjsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRBcHBDYWNoZSgpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuYXBwQ2FjaGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuYXZpZ2F0ZVRvKGZlYXR1cmUpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IGZlYXR1cmU7XHJcbiAgICAgICAgaWYgKGZlYXR1cmUgPT09IFwiL3Jlc3RhcnRcIikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdGFydEFwcCgpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZlYXR1cmUgPT09IFwiL2FwcGNhY2hlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5hYy5zZXRMb2NhbFN0b3JhZ2UoXCJhcHBGZWF0dXJlc1wiLCB7IGNhY2hlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy50b2FzdHIuaW5mbyhcIlRoaXMgYXBwbGljYXRpb24gd2lsbCBub3cgcGVyZm9ybSBvZmZsaW5lLCBkaXNjb25uZWN0ZWQgZnJvbSB0aGUgSW50ZXJuZXQuXCIsIFwiU3VjY2VzcyFcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBcHBDYWNoZSgpO1xyXG4gICAgICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hYy5zZXRMb2NhbFN0b3JhZ2UoXCJuYXZpZ2F0ZVRvXCIsIHsgZmVhdHVyZTogZmVhdHVyZSB9KTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbZmVhdHVyZV0pOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN5bmNocm9uaXplKCkge1xyXG4gICAgICAgIHRoaXMuYWMuc3luY2hyb25pemUoXCJ3YWl0Rm9yU2lnbmFsXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXN0YXJ0QXBwKCk7XHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyB0aW1lZCBvdXQgc28gcmVzdGFydFxyXG4gICAgICAgICAgICB0aGlzLnN5bmNocm9uaXplKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQWJvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5tZC5tb2RhbERpYWxvZ1RpdGxlID0gYEFib3V0OiAke3RoaXMuYXBwVGl0bGV9YDtcclxuICAgICAgICB0aGlzLm1kLm93bmVyID0gdGhpcztcclxuICAgICAgICB0aGlzLm1kLnNob3dPa0J1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tZC5pc0Nsb3NhYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1kLmRlc2lyZWRXaWR0aCA9IDUzMDtcclxuICAgICAgICB0aGlzLm1kLmRlc2lyZWRIZWlnaHQgPSAyMDA7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kYWxEaWFsb2cgPSBmYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TW9kYWxEaWFsb2cgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRpYWxvZ0J1dHRvbkNsaWNrZWQoYnV0dG9uQ2xpY2tlZDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGJ1dHRvbkNsaWNrZWQgPT09IFwib2tcIilcclxuICAgICAgICAgICAgdGhpcy5tZC5jbG9zZURpYWxvZygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0Jyb3dzZXJNb2R1bGUsIEh0dHBNb2R1bGUsIHJvdXRpbmcsIFRvYXN0TW9kdWxlLmZvclJvb3QoKSwgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsIEFwcEFuaW1hdGlvbl0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtNYWluRnJhbWUsIFNldHRpbmdzLCBTcGxhc2gsIEFuYWx5dGljcywgRmVhdHVyZXMsIFNhZmVSZXNvdXJjZV0sXHJcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IFRvYXN0c01hbmFnZXIsIHVzZUNsYXNzOiBCb3R0b21Ub2FzdHNNYW5hZ2VyIH1dLFxyXG4gICAgYm9vdHN0cmFwOiBbTWFpbkZyYW1lXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfSIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge0RvbVNhbml0aXplcn0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcclxuXHJcbkBQaXBlKHsgbmFtZTogXCJzYWZlUmVzb3VyY2VcIiB9KVxyXG5leHBvcnQgY2xhc3MgU2FmZVJlc291cmNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XHJcbiAgICAgICAgdGhpcy5zYW5pdGl6ZXIgPSBzYW5pdGl6ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtKHN0eWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChzdHlsZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBUb2FzdE9wdGlvbnMsIFRvYXN0c01hbmFnZXIgfSBmcm9tIFwibmcyLXRvYXN0ci9uZzItdG9hc3RyXCI7O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQm90dG9tVG9hc3RzTWFuYWdlciBleHRlbmRzIFRvYXN0c01hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIG5nWm9uZTogTmdab25lLCBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLCBvcHRpb25zOiBUb2FzdE9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcihjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIG5nWm9uZSwgYXBwUmVmLCBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgYW5pbWF0ZTogXCJmbHlSaWdodFwiLFxyXG4gICAgICAgICAgICBwb3NpdGlvbkNsYXNzOiBcInRvYXN0LWJvdHRvbS1yaWdodFwiLFxyXG4gICAgICAgICAgICBuZXdlc3RPblRvcDogdHJ1ZSxcclxuICAgICAgICAgICAgdG9hc3RMaWZlOiA1MDAwXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBTZXR0aW5ncyB9ICBmcm9tIFwiLi4vZmVhdHVyZXMvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU3BsYXNoIH0gICAgZnJvbSBcIi4uL2ZlYXR1cmVzL3NwbGFzaFwiO1xyXG5pbXBvcnQgeyBBbmFseXRpY3MgfSBmcm9tIFwiLi4vZmVhdHVyZXMvYW5hbHl0aWNzXCI7XHJcbmltcG9ydCB7IEZlYXR1cmVzIH0gZnJvbSBcIi4uL2ZlYXR1cmVzL2ZlYXR1cmVzXCI7XHJcblxyXG5jb25zdCBhcHBSb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHsgcGF0aDogXCJzZXR0aW5nc1wiLCBjb21wb25lbnQ6IFNldHRpbmdzIH0sXHJcbiAgICB7IHBhdGg6IFwiXCIsIGNvbXBvbmVudDogU3BsYXNoIH0sXHJcbiAgICB7IHBhdGg6IFwic3BsYXNoXCIsIGNvbXBvbmVudDogU3BsYXNoIH0sXHJcbiAgICB7IHBhdGg6IFwiYW5hbHl0aWNzXCIsIGNvbXBvbmVudDogQW5hbHl0aWNzIH0sXHJcbiAgICB7IHBhdGg6IFwiZmVhdHVyZXNcIiwgY29tcG9uZW50OiBGZWF0dXJlcyB9LFxyXG4gICAgeyBwYXRoOiBcIioqXCIsIHJlZGlyZWN0VG86IFwiL3NwbGFzaFwiLCBwYXRoTWF0Y2g6IFwiZnVsbFwiIH1cclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0aW5nID0gUm91dGVyTW9kdWxlLmZvclJvb3QoYXBwUm91dGVzKTsiLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tIFwiLi4vLi4vYXBwL2NvbW1vbi9hcHBDb25maWdcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgLy8gI3JlZ2lvbiB0ZW1wbGF0ZVxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwL2ZlYXR1cmVzL3NwbGFzaC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImFwcC9mZWF0dXJlcy9zcGxhc2guY3NzXCJdXHJcbiAgICAvLyAjZW5kcmVnaW9uXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGxhc2gge1xyXG4gICAgcHJpdmF0ZSBpc1ZpZXdWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGltYWdlMFZpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaW1hZ2UxVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpbWFnZTJWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGltYWdlM1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaW1hZ2U0VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpbWFnZTVWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGltYWdlNlZpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgc2VxdWVuY2UgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBBcHBDb25maWcpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc1ZpZXdWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5zd2l0Y2hJbWFnZXMoKTsgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3dpdGNoSW1hZ2VzKCkge1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VxdWVuY2UgPT09IDcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcXVlbmNlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UwVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlMVZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZTJWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlNFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZTVWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2U2VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc2VxdWVuY2UpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlMFZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UxVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZTJWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlM1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2U0VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZTVWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlNlZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VxdWVuY2UrKztcclxuICAgICAgICB9LCAyMDAwKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbi8vIHNlcnZpY2VzXHJcbmltcG9ydCB7IEFwcENvbmZpZyB9IGZyb20gXCIuLi8uLi9hcHAvY29tbW9uL2FwcENvbmZpZ1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICAvLyAjcmVnaW9uIHRlbXBsYXRlXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAvZmVhdHVyZXMvc2V0dGluZ3MuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJhcHAvZmVhdHVyZXMvc2V0dGluZ3MuY3NzXCJdXHJcbiAgICAvLyAjZW5kcmVnaW9uXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XHJcbiAgICBwcml2YXRlIGlzVmlld1Zpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogQXBwQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5pc1ZpZXdWaXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gc2VydmljZXNcclxuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2FwcC9jb21tb24vYXBwQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRvYXN0c01hbmFnZXIgfSBmcm9tIFwibmcyLXRvYXN0ci9uZzItdG9hc3RyXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIC8vICNyZWdpb24gdGVtcGxhdGVcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC9mZWF0dXJlcy9mZWF0dXJlcy5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImFwcC9mZWF0dXJlcy9mZWF0dXJlcy5jc3NcIl1cclxuICAgIC8vICNlbmRyZWdpb25cclxufSlcclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVzIHtcclxuICAgIHByaXZhdGUgaXNWaWV3VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBjb25maWc6IEFwcENvbmZpZywgcHJpdmF0ZSByZWFkb25seSB0b2FzdHI6IFRvYXN0c01hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLmlzVmlld1Zpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbi8vIHNlcnZpY2VzXHJcbmltcG9ydCB7IEFwcENvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vYXBwQ29uZmlnXCI7XHJcbmltcG9ydCB7IEFuYWx5dGljc0RhdGEsIEV4Y2VwdGlvbiwgUGVyZm9ybWFuY2UgfSBmcm9tIFwiLi4vbW9kZWxzL2FuYWx5dGljc0RhdGFcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgLy8gI3JlZ2lvbiB0ZW1wbGF0ZVxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwL2ZlYXR1cmVzL2FuYWx5dGljcy5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImFwcC9mZWF0dXJlcy9hbmFseXRpY3MuY3NzXCJdXHJcbiAgICAvLyAjZW5kcmVnaW9uXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmFseXRpY3Mge1xyXG4gICAgcHJpdmF0ZSBpc1ZpZXdWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0RhdGE7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhYzogQXBwQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5pc1ZpZXdWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBhYy51cGRhdGVBbmFseXRpY3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrQ2xlYXJFcnJvcnMoKSB7XHJcbiAgICAgICAgdGhpcy5hYy5jbGVhckV4Y2VwdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrQ2xlYXJSZXNwb25zZVRpbWUoKSB7XHJcbiAgICAgICAgdGhpcy5hYy5jbGVhclJlc3BvbnNlVGltZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEF2ZXJhZ2VSZXNwb25zZVRpbWUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgRGV2Q29uZmlnIH0gZnJvbSBcIi4uL21vZGVscy9kZXZDb25maWdcIjtcclxuaW1wb3J0IHsgQmFzZVNlcnZpY2VzIH0gZnJvbSBcIi4vYmFzZVNlcnZpY2VzXCI7XHJcbmltcG9ydCB7IEFuYWx5dGljc0RhdGEsIEV4Y2VwdGlvbiwgUGVyZm9ybWFuY2UgfSBmcm9tIFwiLi4vbW9kZWxzL2FuYWx5dGljc0RhdGFcIjtcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSBcImZpbGUtc2F2ZXJcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBcHBDb25maWcgZXh0ZW5kcyBCYXNlU2VydmljZXMge1xyXG4gICAgZGV2Q29uZmlnOiBEZXZDb25maWc7XHJcbiAgICBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NEYXRhO1xyXG4gICAgYmVnaW5SZXF1ZXN0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGh0dHA6IEh0dHApIHtcclxuICAgICAgICBzdXBlcihodHRwKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBbmFseXRpY3MoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXRpY3NEYXRhID0gdGhpcy5nZXRMb2NhbFN0b3JhZ2UoXCJhbmFseXRpY3NEYXRhXCIpO1xyXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YS5leGNlcHRpb25zID0gXy5tYXAodGhpcy5hbmFseXRpY3NEYXRhLmV4Y2VwdGlvbnMsIChhKSA9PiB7XHJcbiAgICAgICAgICAgIGEuZGF0ZVN0cmluZyA9IG1vbWVudChhLmRhdGUpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgICAgICAgIGEudGltZVN0cmluZyA9IG1vbWVudChhLmRhdGUpLmZvcm1hdChcIkhIOm1tOnNzXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHRvdGFsUmVzcG9uc2VUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzID0gXy5tYXAodGhpcy5hbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcywgKGEpID0+IHtcclxuICAgICAgICAgICAgYS5kYXRlU3RyaW5nID0gbW9tZW50KGEuZGF0ZSkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgICAgICAgYS50aW1lU3RyaW5nID0gbW9tZW50KGEuZGF0ZSkuZm9ybWF0KFwiSEg6bW06c3NcIik7XHJcbiAgICAgICAgICAgIHRvdGFsUmVzcG9uc2VUaW1lICs9IGEucmVzcG9uc2VUaW1lO1xyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5hbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YS5hdmVyYWdlUmVzcG9uc2VUaW1lID0gMDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YS5hdmVyYWdlUmVzcG9uc2VUaW1lID0gTWF0aC5yb3VuZCh0b3RhbFJlc3BvbnNlVGltZSAvIHRoaXMuYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckV4Y2VwdGlvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXRpY3NEYXRhLmV4Y2VwdGlvbnMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShcImFuYWx5dGljc0RhdGFcIiwgdGhpcy5hbmFseXRpY3NEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclJlc3BvbnNlVGltZSgpIHtcclxuICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UoXCJhbmFseXRpY3NEYXRhXCIsIHRoaXMuYW5hbHl0aWNzRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dSZXNvbnNlRGF0YShyZXNwb25zZVRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0RhdGEgPSB0aGlzLmdldExvY2FsU3RvcmFnZShcImFuYWx5dGljc0RhdGFcIik7XHJcblxyXG4gICAgICAgIGlmIChhbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcy5sZW5ndGggPiA5KSB7XHJcbiAgICAgICAgICAgIGFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwZXJmb3JtYW5jZSA9IG5ldyBQZXJmb3JtYW5jZSgpOyBwZXJmb3JtYW5jZS5kYXRlID0gbmV3IERhdGUoKTsgcGVyZm9ybWFuY2UucmVzcG9uc2VUaW1lID0gcmVzcG9uc2VUaW1lO1xyXG4gICAgICAgIGFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzLnVuc2hpZnQocGVyZm9ybWFuY2UpO1xyXG4gICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKFwiYW5hbHl0aWNzRGF0YVwiLCBhbmFseXRpY3NEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZXZDb25maWcoc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICB0aGlzLmJlZ2luUmVxdWVzdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoXCJCRUdJTiBSRVFVRVNUXCIpO1xyXG4gICAgICAgIHRoaXMuaHR0cEdldChcInN5c0luZm9cIiwgKGRldkNvbmZpZzogRGV2Q29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nUmVzb25zZURhdGEobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmJlZ2luUmVxdWVzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKFwiZGV2Q29uZmlnXCIsIGRldkNvbmZpZyk7XHJcbiAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoXCJSRVFVRVNUIEVOREVEXCIpO1xyXG4gICAgICAgICAgICAodGhpcy5nZXRMb2NhbFN0b3JhZ2UoXCJhcHBGZWF0dXJlc1wiKSkgPyBkZXZDb25maWcuYXBwQ2FjaGVkID0gdHJ1ZSA6IGRldkNvbmZpZy5hcHBDYWNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kZXZDb25maWcgPSBkZXZDb25maWc7XHJcbiAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLm9ubGluZVN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcgPSB0aGlzLmdldExvY2FsU3RvcmFnZShcImRldkNvbmZpZ1wiKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kZXZDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZyA9IG5ldyBEZXZDb25maWcoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5kZWJ1ZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLnRlc3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5hcHBDYWNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy52ZXJzaW9uTnVtYmVyID0gXCJ4eC54eC54eFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLnNwbGFzaFRpbWUgPSA1MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLm9ubGluZVN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvck1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHsgLy8gbXVzdCBiZSBvZmZsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJUaGlzIGFwcGxpY2F0aW9uIGlzIG9mZmxpbmUgYW5kIHdpbGwgY29udGludWUgcnVubmluZyBmcm9tIHRoZSBBcHBsaWNhdGlvbiBDYWNoZSFcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5vbmxpbmVTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5hcHBDYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3luY2hyb25pemUoYWN0aW9uTmFtZTogc3RyaW5nLCBzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgICAgIHRoaXMuaHR0cFBvc3QoeyBhY3Rpb246IGFjdGlvbk5hbWUgfSwgXCJzeW5jXCIsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBEZXZDb25maWcge1xyXG4gICAgZGVidWc6IGJvb2xlYW47XHJcbiAgICB0ZXN0aW5nOiBib29sZWFuO1xyXG4gICAgc3BsYXNoVGltZTogbnVtYmVyO1xyXG4gICAgdmVyc2lvbk51bWJlcjogc3RyaW5nO1xyXG4gICAgb25saW5lU3RhdHVzOiBib29sZWFuO1xyXG4gICAgYXBwQ2FjaGVkOiBib29sZWFuO1xyXG59IiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IEN1c3RvbVJlc3BvbnNlIH0gZnJvbSBcIi4uL21vZGVscy9jdXN0b21SZXNwb25zZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnMgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBBbmFseXRpY3NEYXRhLCBFeGNlcHRpb24sIFBlcmZvcm1hbmNlIH0gZnJvbSBcIi4uL21vZGVscy9hbmFseXRpY3NEYXRhXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVNlcnZpY2VzIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgaHR0cDogSHR0cCkge1xyXG4gICAgICAgIGlmICghdGhpcy5nZXRMb2NhbFN0b3JhZ2UoXCJhbmFseXRpY3NEYXRhXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFuYWx5dGljc0RhdGEgPSBuZXcgQW5hbHl0aWNzRGF0YSgpO1xyXG4gICAgICAgICAgICBhbmFseXRpY3NEYXRhLmV4Y2VwdGlvbnMgPSBuZXcgQXJyYXk8RXhjZXB0aW9uPigpO1xyXG4gICAgICAgICAgICBhbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcyA9IG5ldyBBcnJheTxQZXJmb3JtYW5jZT4oKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UoXCJhbmFseXRpY3NEYXRhXCIsIGFuYWx5dGljc0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBodHRwR2V0KGNvbnRyb2xsZXI6IHN0cmluZywgc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICB0aGlzLmdldChjb250cm9sbGVyKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBvYmogPT4geyBzdWNjZXNzKG9iaikgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0KGNvbnRyb2xsZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGBhcGkvJHtjb250cm9sbGVyfWApXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gPGFueT5yZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBodHRwUG9zdChvYmplY3Q6IGFueSwgY29udHJvbGxlcjogc3RyaW5nLCBzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgICAgIHRoaXMucG9zdChvYmplY3QsIGNvbnRyb2xsZXIpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIG9iaiA9PiB7IHN1Y2Nlc3Mob2JqKSB9LFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwb3N0KG9iamVjdDogYW55LCBjb250cm9sbGVyOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgYXBpLyR7Y29udHJvbGxlcn1gLCBvYmplY3QpXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gPGFueT5yZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBodHRwRGVsZXRlKGNvbnRyb2xsZXI6IHN0cmluZywgc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZShjb250cm9sbGVyKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBvYmogPT4geyBzdWNjZXNzKG9iaikgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShjb250cm9sbGVyOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgYXBpLyR7Y29udHJvbGxlcn1gKVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IDxhbnk+cmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRXJyb3IoZXJyb3I6IEN1c3RvbVJlc3BvbnNlLCBjYXVnaHQ6IE9ic2VydmFibGU8YW55Pik6IGFueSB7XHJcbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyAhPT0gNTAyICYmIGVycm9yLnN0YXR1cyAhPT0gMCkgeyAvLyBiYWQgZ2F0ZXdheSBpcyBhbiBleHBlY3RlZCBleGNlcHRpb25cclxuICAgICAgICAgICAgY29uc3QgYW5hbHl0aWNzRGF0YTogQW5hbHl0aWNzRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhbmFseXRpY3NEYXRhXCIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhbmFseXRpY3NEYXRhLmV4Y2VwdGlvbnMubGVuZ3RoID4gOTkpIHtcclxuICAgICAgICAgICAgICAgIGFuYWx5dGljc0RhdGEuZXhjZXB0aW9ucy5wb3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBleGNlcHRpb24gPSBuZXcgRXhjZXB0aW9uKCk7IGV4Y2VwdGlvbi5kYXRlID0gbmV3IERhdGUoKTsgZXhjZXB0aW9uLmVycm9yTWVzc2FnZSA9IGVycm9yLl9ib2R5O1xyXG4gICAgICAgICAgICBhbmFseXRpY3NEYXRhLmV4Y2VwdGlvbnMudW5zaGlmdChleGNlcHRpb24pO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImFuYWx5dGljc0RhdGFcIiwgSlNPTi5zdHJpbmdpZnkoYW5hbHl0aWNzRGF0YSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5fYm9keSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TG9jYWxTdG9yYWdlKG5hbWU6IHN0cmluZywgYW55T2JqZWN0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYW55T2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgYW55T2JqZWN0ID0geyBhcnJheTogYW55T2JqZWN0IH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgKGFueU9iamVjdCkgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmdWYWwgPSBKU09OLnN0cmluZ2lmeShhbnlPYmplY3QpO1xyXG4gICAgICAgICAgICBpZiAoc3RyaW5nVmFsKVxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgc3RyaW5nVmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TG9jYWxTdG9yYWdlKG5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lKTtcclxuICAgICAgICBpZiAoIXZhbHVlKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAodmFsdWUuc3Vic3RyaW5nKDAsIDEpID09PSBcIntcIikge1xyXG4gICAgICAgICAgICBjb25zdCBvYmo6IGFueSA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoXCJhcnJheVwiIGluIG9iailcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmouYXJyYXk7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59IiwiXHJcbmV4cG9ydCBjbGFzcyBFeGNlcHRpb24ge1xyXG4gICAgZGF0ZTogRGF0ZTtcclxuICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgZGF0ZVN0cmluZzogc3RyaW5nO1xyXG4gICAgdGltZVN0cmluZzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGVyZm9ybWFuY2Uge1xyXG4gICAgZGF0ZTogRGF0ZTtcclxuICAgIHJlc3BvbnNlVGltZTogbnVtYmVyO1xyXG4gICAgZGF0ZVN0cmluZzogc3RyaW5nO1xyXG4gICAgdGltZVN0cmluZzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzRGF0YSB7XHJcbiAgICBleGNlcHRpb25zOiBBcnJheTxFeGNlcHRpb24+O1xyXG4gICAgcGVyZm9ybWFuY2VzOiBBcnJheTxQZXJmb3JtYW5jZT47XHJcbiAgICBhdmVyYWdlUmVzcG9uc2VUaW1lOiBudW1iZXI7XHJcbn0iXX0=
