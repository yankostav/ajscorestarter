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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFuZ3VsYXJTdGFydGVyL25vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxib290c3RyYXAudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxtYWluRnJhbWUudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxjb21tb25cXHNhZmVSZXNvdXJjZS50cyIsIkFuZ3VsYXJTdGFydGVyXFx3d3dyb290XFxhcHBcXGNvbW1vblxcYm90dG9tVG9hc3RzTWFuYWdlci50cyIsIkFuZ3VsYXJTdGFydGVyXFx3d3dyb290XFxhcHBcXGNvbW1vblxcYXBwUm91dGluZy50cyIsIkFuZ3VsYXJTdGFydGVyXFx3d3dyb290XFxhcHBcXGZlYXR1cmVzXFxzcGxhc2gudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxmZWF0dXJlc1xcc2V0dGluZ3MudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxmZWF0dXJlc1xcZmVhdHVyZXMudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxmZWF0dXJlc1xcYW5hbHl0aWNzLnRzIiwiQW5ndWxhclN0YXJ0ZXJcXHd3d3Jvb3RcXGFwcFxcY29tbW9uXFxhcHBDb25maWcudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxtb2RlbHNcXGRldkNvbmZpZy50cyIsIkFuZ3VsYXJTdGFydGVyXFx3d3dyb290XFxhcHBcXGNvbW1vblxcYmFzZVNlcnZpY2VzLnRzIiwiQW5ndWxhclN0YXJ0ZXJcXHd3d3Jvb3RcXGFwcFxcbW9kZWxzXFxhbmFseXRpY3NEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSw4RUFBMkU7QUFFM0UseUNBQXdDO0FBRXhDLGlEQUFzQixFQUFFLENBQUMsZUFBZSxDQUFDLHFCQUFTLENB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RCxzQ0FBZSxHQUFmLFVBQWdCLElBQVk7UUFDeEIsSUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFNLEdBQUcsR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUM7Z0JBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxtQkFBQztBQUFELENBN0ZBLEFBNkZDLElBQUE7QUE3Rlksb0NBQVk7Ozs7QUNKekI7SUFBQTtJQUtBLENBQUM7SUFBRCxnQkFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTFksOEJBQVM7QUFPdEI7SUFBQTtJQUtBLENBQUM7SUFBRCxrQkFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTFksa0NBQVc7QUFPeEI7SUFBQTtJQUlBLENBQUM7SUFBRCxvQkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksc0NBQWEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgcGxhdGZvcm1Ccm93c2VyRHluYW1pYyB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWNcIjtcclxuaW1wb3J0IHsgZW5hYmxlUHJvZE1vZGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tIFwiLi9tYWluRnJhbWVcIjtcclxuXHJcbnBsYXRmb3JtQnJvd3NlckR5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlKTsiLCJpbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgTmdNb2R1bGUsIGVuYWJsZVByb2RNb2RlLCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zXCI7XHJcbmltcG9ydCB7IFRvYXN0TW9kdWxlLCBUb2FzdHNNYW5hZ2VyLCBUb2FzdE9wdGlvbnMgfSBmcm9tIFwibmcyLXRvYXN0ci9uZzItdG9hc3RyXCI7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcbi8vIHNlcnZpY2VzXHJcbmltcG9ydCB7IEFwcENvbmZpZyB9IGZyb20gXCIuL2NvbW1vbi9hcHBDb25maWdcIjtcclxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuL2NvbW1vbi9hcHBSb3V0aW5nXCI7XHJcbmltcG9ydCB7IEJvdHRvbVRvYXN0c01hbmFnZXIgfSBmcm9tIFwiLi9jb21tb24vYm90dG9tVG9hc3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBBcHBBbmltYXRpb24gfSBmcm9tIFwiLi9jb21tb24vbm9kZV9tb2R1bGVzL25nMi1hbmltYXRpb24vYXBwQW5pbWF0aW9uXCI7XHJcbi8vIGZlYXR1cmVzXHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSBcIi4vZmVhdHVyZXMvc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU3BsYXNoIH0gZnJvbSBcIi4vZmVhdHVyZXMvc3BsYXNoXCI7XHJcbmltcG9ydCB7IEFuYWx5dGljcyB9IGZyb20gXCIuL2ZlYXR1cmVzL2FuYWx5dGljc1wiO1xyXG5pbXBvcnQgeyBGZWF0dXJlcyB9IGZyb20gXCIuL2ZlYXR1cmVzL2ZlYXR1cmVzXCI7XHJcbi8vIHBpcGVzICYgYW5pbWF0aW9uXHJcbmltcG9ydCB7IFNhZmVSZXNvdXJjZSB9IGZyb20gXCIuL2NvbW1vbi9zYWZlUmVzb3VyY2VcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2cgfSBmcm9tIFwiLi9jb21tb24vbm9kZV9tb2R1bGVzL25nMi1hbmltYXRpb24vbW9kYWxEaWFsb2dcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJtYWluLWZyYW1lXCIsXHJcbiAgICAvLyNyZWdpb24gdGVtcGxhdGU6XHJcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAvbWFpbkZyYW1lLmh0bWxcIixcclxuICAgIC8vICNlbmRyZWdpb25cclxuICAgIHByb3ZpZGVyczogW0FwcENvbmZpZ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWluRnJhbWUge1xyXG4gICAgQFZpZXdDaGlsZChNb2RhbERpYWxvZykgbWQ6IE1vZGFsRGlhbG9nO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGFwcFRpdGxlID0gXCJBbmd1bGFyLk5ldCBTdGFydGVyIEFwcGxpY2F0aW9uXCI7XHJcbiAgICBwcml2YXRlIGRhdGU6IERhdGU7XHJcbiAgICBwcml2YXRlIHRoZVdlZWtPZjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBhcHBIcmVmOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGFwcENhY2hlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHRpdGxlQmxpbmtpbmcgPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSB0aXRsZVZpc2libGVXaGVuTm90QmxpbmtpbmcgPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBzaG93TW9kYWxEaWFsb2cgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgdmVyc2lvbk51bWJlciA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHNlbGVjdGVkRmVhdHVyZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBhcHBMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhYzogQXBwQ29uZmlnLCBwcml2YXRlIHRvYXN0cjogVG9hc3RzTWFuYWdlciwgdlJlZjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgICAgIHRoaXMudG9hc3RyLnNldFJvb3RWaWV3Q29udGFpbmVyUmVmKHZSZWYpO1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy50aGVXZWVrT2YgPSBtb21lbnQoKS5zdGFydE9mKFwid2Vla1wiKS5mb3JtYXQoXCJkZGQgTU1NIEQgWVlZWVwiKTtcclxuICAgICAgICB0aGlzLmFwcEhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zdWJzdHIoMCwgd2luZG93LmxvY2F0aW9uLmhyZWYubGFzdEluZGV4T2YoXCIvXCIpICsgMSk7XHJcbiAgICAgICAgdGhpcy5hcHBDYWNoZSA9IHRoaXMuYXBwSHJlZiArIFwiYXBwY2FjaGUuaHRtbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5hYy5nZXREZXZDb25maWcoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnNpb25OdW1iZXIgPSB0aGlzLmFjLmRldkNvbmZpZy52ZXJzaW9uTnVtYmVyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hYy5kZXZDb25maWcudGVzdGluZyAmJiB0aGlzLmFjLmRldkNvbmZpZy5kZWJ1ZylcclxuICAgICAgICAgICAgICAgIHRoaXMuc3luY2hyb25pemUoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0ci5zdWNjZXNzKFwiVGhpcyBhcHBsaWNhdGlvbiBpcyBvcGVyYXRpbmcgb25saW5lIGFzIG5vcm1hbC5cIiwgXCJTdWNjZXNzIVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVGb3J3YXJkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sICh3YXJuaW5nTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0ci53YXJuaW5nKHdhcm5pbmdNZXNzYWdlLCBcIlBsZWFzZSBub3RlIVwiKTtcclxuICAgICAgICAgICAgdGhpcy52ZXJzaW9uTnVtYmVyID0gdGhpcy5hYy5kZXZDb25maWcudmVyc2lvbk51bWJlcjtcclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZUZvcndhcmQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5hdmlnYXRlRm9yd2FyZCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZUJsaW5raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdmlnYXRlVG8gPSB0aGlzLmFjLmdldExvY2FsU3RvcmFnZShcIm5hdmlnYXRlVG9cIik7XHJcbiAgICAgICAgICAgIGlmIChuYXZpZ2F0ZVRvKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvKG5hdmlnYXRlVG8uZmVhdHVyZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUbyhcIi9zcGxhc2hcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9LCB0aGlzLmFjLmRldkNvbmZpZy5zcGxhc2hUaW1lKTsgLy8gbmF2aWdhdGUgYXdheSBmcm9tIHNwbGFzaCB2aWV3ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc3RhcnRBcHAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmFwcEhyZWY7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0QXBwQ2FjaGUoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmFwcENhY2hlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF2aWdhdGVUbyhmZWF0dXJlKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZlYXR1cmUgPSBmZWF0dXJlO1xyXG4gICAgICAgIGlmIChmZWF0dXJlID09PSBcIi9yZXN0YXJ0XCIpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RhcnRBcHAoKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmZWF0dXJlID09PSBcIi9hcHBjYWNoZVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWMuc2V0TG9jYWxTdG9yYWdlKFwiYXBwRmVhdHVyZXNcIiwgeyBjYWNoZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3RyLmluZm8oXCJUaGlzIGFwcGxpY2F0aW9uIHdpbGwgbm93IHBlcmZvcm0gb2ZmbGluZSwgZGlzY29ubmVjdGVkIGZyb20gdGhlIEludGVybmV0LlwiLCBcIlN1Y2Nlc3MhXCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXBwQ2FjaGUoKTtcclxuICAgICAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWMuc2V0TG9jYWxTdG9yYWdlKFwibmF2aWdhdGVUb1wiLCB7IGZlYXR1cmU6IGZlYXR1cmUgfSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2ZlYXR1cmVdKTsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzeW5jaHJvbml6ZSgpIHtcclxuICAgICAgICB0aGlzLmFjLnN5bmNocm9uaXplKFwid2FpdEZvclNpZ25hbFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdGFydEFwcCgpO1xyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgLy8gdGltZWQgb3V0IHNvIHJlc3RhcnRcclxuICAgICAgICAgICAgdGhpcy5zeW5jaHJvbml6ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0Fib3V0KCkge1xyXG4gICAgICAgIHRoaXMubWQubW9kYWxEaWFsb2dUaXRsZSA9IGBBYm91dDogJHt0aGlzLmFwcFRpdGxlfWA7XHJcbiAgICAgICAgdGhpcy5tZC5vd25lciA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5tZC5zaG93T2tCdXR0b24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWQuaXNDbG9zYWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tZC5kZXNpcmVkV2lkdGggPSA1MzA7XHJcbiAgICAgICAgdGhpcy5tZC5kZXNpcmVkSGVpZ2h0ID0gMjAwO1xyXG4gICAgICAgIHRoaXMuc2hvd01vZGFsRGlhbG9nID0gZmFsc2U7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsRGlhbG9nID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkaWFsb2dCdXR0b25DbGlja2VkKGJ1dHRvbkNsaWNrZWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChidXR0b25DbGlja2VkID09PSBcIm9rXCIpXHJcbiAgICAgICAgICAgIHRoaXMubWQuY2xvc2VEaWFsb2coKTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtCcm93c2VyTW9kdWxlLCBIdHRwTW9kdWxlLCByb3V0aW5nLCBUb2FzdE1vZHVsZS5mb3JSb290KCksIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLCBBcHBBbmltYXRpb25dLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbTWFpbkZyYW1lLCBTZXR0aW5ncywgU3BsYXNoLCBBbmFseXRpY3MsIEZlYXR1cmVzLCBTYWZlUmVzb3VyY2VdLFxyXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBUb2FzdHNNYW5hZ2VyLCB1c2VDbGFzczogQm90dG9tVG9hc3RzTWFuYWdlciB9XSxcclxuICAgIGJvb3RzdHJhcDogW01haW5GcmFtZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH0iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtEb21TYW5pdGl6ZXJ9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XHJcblxyXG5AUGlwZSh7IG5hbWU6IFwic2FmZVJlc291cmNlXCIgfSlcclxuZXhwb3J0IGNsYXNzIFNhZmVSZXNvdXJjZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xyXG4gICAgICAgIHRoaXMuc2FuaXRpemVyID0gc2FuaXRpemVyO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zZm9ybShzdHlsZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoc3R5bGUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXBwbGljYXRpb25SZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVG9hc3RPcHRpb25zLCBUb2FzdHNNYW5hZ2VyIH0gZnJvbSBcIm5nMi10b2FzdHIvbmcyLXRvYXN0clwiOztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEJvdHRvbVRvYXN0c01hbmFnZXIgZXh0ZW5kcyBUb2FzdHNNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBuZ1pvbmU6IE5nWm9uZSwgYXBwUmVmOiBBcHBsaWNhdGlvblJlZiwgb3B0aW9uczogVG9hc3RPcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIoY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBuZ1pvbmUsIGFwcFJlZiwgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7XHJcbiAgICAgICAgICAgIGFuaW1hdGU6IFwiZmx5UmlnaHRcIixcclxuICAgICAgICAgICAgcG9zaXRpb25DbGFzczogXCJ0b2FzdC1ib3R0b20tcmlnaHRcIixcclxuICAgICAgICAgICAgbmV3ZXN0T25Ub3A6IHRydWUsXHJcbiAgICAgICAgICAgIHRvYXN0TGlmZTogNTAwMFxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgU2V0dGluZ3MgfSAgZnJvbSBcIi4uL2ZlYXR1cmVzL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNwbGFzaCB9ICAgIGZyb20gXCIuLi9mZWF0dXJlcy9zcGxhc2hcIjtcclxuaW1wb3J0IHsgQW5hbHl0aWNzIH0gZnJvbSBcIi4uL2ZlYXR1cmVzL2FuYWx5dGljc1wiO1xyXG5pbXBvcnQgeyBGZWF0dXJlcyB9IGZyb20gXCIuLi9mZWF0dXJlcy9mZWF0dXJlc1wiO1xyXG5cclxuY29uc3QgYXBwUm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgICB7IHBhdGg6IFwic2V0dGluZ3NcIiwgY29tcG9uZW50OiBTZXR0aW5ncyB9LFxyXG4gICAgeyBwYXRoOiBcIlwiLCBjb21wb25lbnQ6IFNwbGFzaCB9LFxyXG4gICAgeyBwYXRoOiBcInNwbGFzaFwiLCBjb21wb25lbnQ6IFNwbGFzaCB9LFxyXG4gICAgeyBwYXRoOiBcImFuYWx5dGljc1wiLCBjb21wb25lbnQ6IEFuYWx5dGljcyB9LFxyXG4gICAgeyBwYXRoOiBcImZlYXR1cmVzXCIsIGNvbXBvbmVudDogRmVhdHVyZXMgfSxcclxuICAgIHsgcGF0aDogXCIqKlwiLCByZWRpcmVjdFRvOiBcIi9zcGxhc2hcIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9XHJcbl07XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGluZyA9IFJvdXRlck1vZHVsZS5mb3JSb290KGFwcFJvdXRlcyk7IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gc2VydmljZXNcclxuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2FwcC9jb21tb24vYXBwQ29uZmlnXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIC8vICNyZWdpb24gdGVtcGxhdGVcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC9mZWF0dXJlcy9zcGxhc2guaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJhcHAvZmVhdHVyZXMvc3BsYXNoLmNzc1wiXVxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3BsYXNoIHtcclxuICAgIHByaXZhdGUgaXNWaWV3VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpbWFnZTBWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGltYWdlMVZpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaW1hZ2UyVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpbWFnZTNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGltYWdlNFZpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaW1hZ2U1VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpbWFnZTZWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHNlcXVlbmNlID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogQXBwQ29uZmlnKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWaWV3VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuc3dpdGNoSW1hZ2VzKCk7ICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN3aXRjaEltYWdlcygpIHtcclxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlcXVlbmNlID09PSA3KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZSA9IDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmltYWdlMFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZTFWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UyVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlM1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZTRWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2U1VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlNlZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnNlcXVlbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZTBWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlMVZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UyVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZTNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlNFZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2U1VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZTZWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlcXVlbmNlKys7XHJcbiAgICAgICAgfSwgMjAwMCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tIFwiLi4vLi4vYXBwL2NvbW1vbi9hcHBDb25maWdcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgLy8gI3JlZ2lvbiB0ZW1wbGF0ZVxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwL2ZlYXR1cmVzL3NldHRpbmdzLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiYXBwL2ZlYXR1cmVzL3NldHRpbmdzLmNzc1wiXVxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3Mge1xyXG4gICAgcHJpdmF0ZSBpc1ZpZXdWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBjb25maWc6IEFwcENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuaXNWaWV3VmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbi8vIHNlcnZpY2VzXHJcbmltcG9ydCB7IEFwcENvbmZpZyB9IGZyb20gXCIuLi8uLi9hcHAvY29tbW9uL2FwcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUb2FzdHNNYW5hZ2VyIH0gZnJvbSBcIm5nMi10b2FzdHIvbmcyLXRvYXN0clwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICAvLyAjcmVnaW9uIHRlbXBsYXRlXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAvZmVhdHVyZXMvZmVhdHVyZXMuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJhcHAvZmVhdHVyZXMvZmVhdHVyZXMuY3NzXCJdXHJcbiAgICAvLyAjZW5kcmVnaW9uXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGZWF0dXJlcyB7XHJcbiAgICBwcml2YXRlIGlzVmlld1Zpc2libGUgPSBmYWxzZTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBBcHBDb25maWcsIHByaXZhdGUgcmVhZG9ubHkgdG9hc3RyOiBUb2FzdHNNYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5pc1ZpZXdWaXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2FwcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBBbmFseXRpY3NEYXRhLCBFeGNlcHRpb24sIFBlcmZvcm1hbmNlIH0gZnJvbSBcIi4uL21vZGVscy9hbmFseXRpY3NEYXRhXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIC8vICNyZWdpb24gdGVtcGxhdGVcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC9mZWF0dXJlcy9hbmFseXRpY3MuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJhcHAvZmVhdHVyZXMvYW5hbHl0aWNzLmNzc1wiXVxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzIHtcclxuICAgIHByaXZhdGUgaXNWaWV3VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NEYXRhO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYWM6IEFwcENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuaXNWaWV3VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgYWMudXBkYXRlQW5hbHl0aWNzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0NsZWFyRXJyb3JzKCkge1xyXG4gICAgICAgIHRoaXMuYWMuY2xlYXJFeGNlcHRpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0NsZWFyUmVzcG9uc2VUaW1lKCkge1xyXG4gICAgICAgIHRoaXMuYWMuY2xlYXJSZXNwb25zZVRpbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBdmVyYWdlUmVzcG9uc2VUaW1lKCkge1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IERldkNvbmZpZyB9IGZyb20gXCIuLi9tb2RlbHMvZGV2Q29uZmlnXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJ2aWNlcyB9IGZyb20gXCIuL2Jhc2VTZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBBbmFseXRpY3NEYXRhLCBFeGNlcHRpb24sIFBlcmZvcm1hbmNlIH0gZnJvbSBcIi4uL21vZGVscy9hbmFseXRpY3NEYXRhXCI7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gXCJmaWxlLXNhdmVyXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXBwQ29uZmlnIGV4dGVuZHMgQmFzZVNlcnZpY2VzIHtcclxuICAgIGRldkNvbmZpZzogRGV2Q29uZmlnO1xyXG4gICAgYW5hbHl0aWNzRGF0YTogQW5hbHl0aWNzRGF0YTtcclxuICAgIGJlZ2luUmVxdWVzdDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBodHRwOiBIdHRwKSB7XHJcbiAgICAgICAgc3VwZXIoaHR0cCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQW5hbHl0aWNzKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YSA9IHRoaXMuZ2V0TG9jYWxTdG9yYWdlKFwiYW5hbHl0aWNzRGF0YVwiKTtcclxuICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEuZXhjZXB0aW9ucyA9IF8ubWFwKHRoaXMuYW5hbHl0aWNzRGF0YS5leGNlcHRpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBhLmRhdGVTdHJpbmcgPSBtb21lbnQoYS5kYXRlKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICAgICAgICBhLnRpbWVTdHJpbmcgPSBtb21lbnQoYS5kYXRlKS5mb3JtYXQoXCJISDptbTpzc1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0b3RhbFJlc3BvbnNlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5hbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcyA9IF8ubWFwKHRoaXMuYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMsIChhKSA9PiB7XHJcbiAgICAgICAgICAgIGEuZGF0ZVN0cmluZyA9IG1vbWVudChhLmRhdGUpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgICAgICAgIGEudGltZVN0cmluZyA9IG1vbWVudChhLmRhdGUpLmZvcm1hdChcIkhIOm1tOnNzXCIpO1xyXG4gICAgICAgICAgICB0b3RhbFJlc3BvbnNlVGltZSArPSBhLnJlc3BvbnNlVGltZTtcclxuICAgICAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEuYXZlcmFnZVJlc3BvbnNlVGltZSA9IDA7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEuYXZlcmFnZVJlc3BvbnNlVGltZSA9IE1hdGgucm91bmQodG90YWxSZXNwb25zZVRpbWUgLyB0aGlzLmFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJFeGNlcHRpb25zKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YS5leGNlcHRpb25zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UoXCJhbmFseXRpY3NEYXRhXCIsIHRoaXMuYW5hbHl0aWNzRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJSZXNwb25zZVRpbWUoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKFwiYW5hbHl0aWNzRGF0YVwiLCB0aGlzLmFuYWx5dGljc0RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nUmVzb25zZURhdGEocmVzcG9uc2VUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NEYXRhID0gdGhpcy5nZXRMb2NhbFN0b3JhZ2UoXCJhbmFseXRpY3NEYXRhXCIpO1xyXG5cclxuICAgICAgICBpZiAoYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMubGVuZ3RoID4gOSkge1xyXG4gICAgICAgICAgICBhbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcy5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGVyZm9ybWFuY2UgPSBuZXcgUGVyZm9ybWFuY2UoKTsgcGVyZm9ybWFuY2UuZGF0ZSA9IG5ldyBEYXRlKCk7IHBlcmZvcm1hbmNlLnJlc3BvbnNlVGltZSA9IHJlc3BvbnNlVGltZTtcclxuICAgICAgICBhbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcy51bnNoaWZ0KHBlcmZvcm1hbmNlKTtcclxuICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShcImFuYWx5dGljc0RhdGFcIiwgYW5hbHl0aWNzRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGV2Q29uZmlnKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5iZWdpblJlcXVlc3QgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKFwiQkVHSU4gUkVRVUVTVFwiKTtcclxuICAgICAgICB0aGlzLmh0dHBHZXQoXCJzeXNJbmZvXCIsIChkZXZDb25maWc6IERldkNvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ1Jlc29uc2VEYXRhKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5iZWdpblJlcXVlc3QpO1xyXG4gICAgICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShcImRldkNvbmZpZ1wiLCBkZXZDb25maWcpO1xyXG4gICAgICAgICAgICBwZXJmb3JtYW5jZS5tYXJrKFwiUkVRVUVTVCBFTkRFRFwiKTtcclxuICAgICAgICAgICAgKHRoaXMuZ2V0TG9jYWxTdG9yYWdlKFwiYXBwRmVhdHVyZXNcIikpID8gZGV2Q29uZmlnLmFwcENhY2hlZCA9IHRydWUgOiBkZXZDb25maWcuYXBwQ2FjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnID0gZGV2Q29uZmlnO1xyXG4gICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5vbmxpbmVTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdWNjZXNzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnID0gdGhpcy5nZXRMb2NhbFN0b3JhZ2UoXCJkZXZDb25maWdcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGV2Q29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcgPSBuZXcgRGV2Q29uZmlnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcuZGVidWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy50ZXN0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcuYXBwQ2FjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcudmVyc2lvbk51bWJlciA9IFwieHgueHgueHhcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5zcGxhc2hUaW1lID0gNTAwMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5vbmxpbmVTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3JNZXNzYWdlID09PSBcIm9iamVjdFwiKSB7IC8vIG11c3QgYmUgb2ZmbGluZVxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiVGhpcyBhcHBsaWNhdGlvbiBpcyBvZmZsaW5lIGFuZCB3aWxsIGNvbnRpbnVlIHJ1bm5pbmcgZnJvbSB0aGUgQXBwbGljYXRpb24gQ2FjaGUhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcub25saW5lU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcuYXBwQ2FjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN5bmNocm9uaXplKGFjdGlvbk5hbWU6IHN0cmluZywgc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICB0aGlzLmh0dHBQb3N0KHsgYWN0aW9uOiBhY3Rpb25OYW1lIH0sIFwic3luY1wiLFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgRGV2Q29uZmlnIHtcclxuICAgIGRlYnVnOiBib29sZWFuO1xyXG4gICAgdGVzdGluZzogYm9vbGVhbjtcclxuICAgIHNwbGFzaFRpbWU6IG51bWJlcjtcclxuICAgIHZlcnNpb25OdW1iZXI6IHN0cmluZztcclxuICAgIG9ubGluZVN0YXR1czogYm9vbGVhbjtcclxuICAgIGFwcENhY2hlZDogYm9vbGVhbjtcclxufSIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xyXG5pbXBvcnQgeyBDdXN0b21SZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvY3VzdG9tUmVzcG9uc2VcIjtcclxuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgQW5hbHl0aWNzRGF0YSwgRXhjZXB0aW9uLCBQZXJmb3JtYW5jZSB9IGZyb20gXCIuLi9tb2RlbHMvYW5hbHl0aWNzRGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VTZXJ2aWNlcyB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGh0dHA6IEh0dHApIHtcclxuICAgICAgICBpZiAoIXRoaXMuZ2V0TG9jYWxTdG9yYWdlKFwiYW5hbHl0aWNzRGF0YVwiKSkge1xyXG4gICAgICAgICAgICBjb25zdCBhbmFseXRpY3NEYXRhID0gbmV3IEFuYWx5dGljc0RhdGEoKTtcclxuICAgICAgICAgICAgYW5hbHl0aWNzRGF0YS5leGNlcHRpb25zID0gbmV3IEFycmF5PEV4Y2VwdGlvbj4oKTtcclxuICAgICAgICAgICAgYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMgPSBuZXcgQXJyYXk8UGVyZm9ybWFuY2U+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKFwiYW5hbHl0aWNzRGF0YVwiLCBhbmFseXRpY3NEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaHR0cEdldChjb250cm9sbGVyOiBzdHJpbmcsIHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5nZXQoY29udHJvbGxlcilcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgb2JqID0+IHsgc3VjY2VzcyhvYmopIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldChjb250cm9sbGVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgYXBpLyR7Y29udHJvbGxlcn1gKVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IDxhbnk+cmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgaHR0cFBvc3Qob2JqZWN0OiBhbnksIGNvbnRyb2xsZXI6IHN0cmluZywgc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICB0aGlzLnBvc3Qob2JqZWN0LCBjb250cm9sbGVyKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBvYmogPT4geyBzdWNjZXNzKG9iaikgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcG9zdChvYmplY3Q6IGFueSwgY29udHJvbGxlcjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYGFwaS8ke2NvbnRyb2xsZXJ9YCwgb2JqZWN0KVxyXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IDxhbnk+cmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgaHR0cERlbGV0ZShjb250cm9sbGVyOiBzdHJpbmcsIHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5kZWxldGUoY29udHJvbGxlcilcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgb2JqID0+IHsgc3VjY2VzcyhvYmopIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUoY29udHJvbGxlcjogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYGFwaS8ke2NvbnRyb2xsZXJ9YClcclxuICAgICAgICAgICAgLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiA8YW55PnJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVycm9yKGVycm9yOiBDdXN0b21SZXNwb25zZSwgY2F1Z2h0OiBPYnNlcnZhYmxlPGFueT4pOiBhbnkge1xyXG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgIT09IDUwMiAmJiBlcnJvci5zdGF0dXMgIT09IDApIHsgLy8gYmFkIGdhdGV3YXkgaXMgYW4gZXhwZWN0ZWQgZXhjZXB0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYW5hbHl0aWNzRGF0YVwiKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5hbHl0aWNzRGF0YS5leGNlcHRpb25zLmxlbmd0aCA+IDk5KSB7XHJcbiAgICAgICAgICAgICAgICBhbmFseXRpY3NEYXRhLmV4Y2VwdGlvbnMucG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZXhjZXB0aW9uID0gbmV3IEV4Y2VwdGlvbigpOyBleGNlcHRpb24uZGF0ZSA9IG5ldyBEYXRlKCk7IGV4Y2VwdGlvbi5lcnJvck1lc3NhZ2UgPSBlcnJvci5fYm9keTtcclxuICAgICAgICAgICAgYW5hbHl0aWNzRGF0YS5leGNlcHRpb25zLnVuc2hpZnQoZXhjZXB0aW9uKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhbmFseXRpY3NEYXRhXCIsIEpTT04uc3RyaW5naWZ5KGFuYWx5dGljc0RhdGEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IuX2JvZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExvY2FsU3RvcmFnZShuYW1lOiBzdHJpbmcsIGFueU9iamVjdDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGFueU9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGFueU9iamVjdCA9IHsgYXJyYXk6IGFueU9iamVjdCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIChhbnlPYmplY3QpID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RyaW5nVmFsID0gSlNPTi5zdHJpbmdpZnkoYW55T2JqZWN0KTtcclxuICAgICAgICAgICAgaWYgKHN0cmluZ1ZhbClcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIHN0cmluZ1ZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldExvY2FsU3RvcmFnZShuYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSk7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSlcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgaWYgKHZhbHVlLnN1YnN0cmluZygwLCAxKSA9PT0gXCJ7XCIpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqOiBhbnkgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKFwiYXJyYXlcIiBpbiBvYmopXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLmFycmF5O1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufSIsIlxyXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uIHtcclxuICAgIGRhdGU6IERhdGU7XHJcbiAgICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICAgIGRhdGVTdHJpbmc6IHN0cmluZztcclxuICAgIHRpbWVTdHJpbmc6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBlcmZvcm1hbmNlIHtcclxuICAgIGRhdGU6IERhdGU7XHJcbiAgICByZXNwb25zZVRpbWU6IG51bWJlcjtcclxuICAgIGRhdGVTdHJpbmc6IHN0cmluZztcclxuICAgIHRpbWVTdHJpbmc6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFuYWx5dGljc0RhdGEge1xyXG4gICAgZXhjZXB0aW9uczogQXJyYXk8RXhjZXB0aW9uPjtcclxuICAgIHBlcmZvcm1hbmNlczogQXJyYXk8UGVyZm9ybWFuY2U+O1xyXG4gICAgYXZlcmFnZVJlc3BvbnNlVGltZTogbnVtYmVyO1xyXG59Il19
