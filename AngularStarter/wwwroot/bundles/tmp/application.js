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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFuZ3VsYXJTdGFydGVyL25vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxib290c3RyYXAudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxtYWluRnJhbWUudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxjb21tb25cXHNhZmVSZXNvdXJjZS50cyIsIkFuZ3VsYXJTdGFydGVyXFx3d3dyb290XFxhcHBcXGNvbW1vblxcYm90dG9tVG9hc3RzTWFuYWdlci50cyIsIkFuZ3VsYXJTdGFydGVyXFx3d3dyb290XFxhcHBcXGNvbW1vblxcYXBwUm91dGluZy50cyIsIkFuZ3VsYXJTdGFydGVyXFx3d3dyb290XFxhcHBcXGZlYXR1cmVzXFxzcGxhc2gudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxmZWF0dXJlc1xcc2V0dGluZ3MudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxmZWF0dXJlc1xcZmVhdHVyZXMudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxmZWF0dXJlc1xcYW5hbHl0aWNzLnRzIiwiQW5ndWxhclN0YXJ0ZXJcXHd3d3Jvb3RcXGFwcFxcY29tbW9uXFxhcHBDb25maWcudHMiLCJBbmd1bGFyU3RhcnRlclxcd3d3cm9vdFxcYXBwXFxtb2RlbHNcXGRldkNvbmZpZy50cyIsIkFuZ3VsYXJTdGFydGVyXFx3d3dyb290XFxhcHBcXGNvbW1vblxcYmFzZVNlcnZpY2VzLnRzIiwiQW5ndWxhclN0YXJ0ZXJcXHd3d3Jvb3RcXGFwcFxcbW9kZWxzXFxhbmFseXRpY3NEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSw4RUFBMkU7QUFFM0UseUNBQXdDO0FBRXhDLGlEQUFzQixFQUFFLENBQUMsZUFBZSxDQUFDLHFCQUFTLENB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c0NBQWUsR0FBZixVQUFnQixJQUFZO1FBQ3hCLElBQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBTSxHQUFHLEdBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQTdGQSxBQTZGQyxJQUFBO0FBN0ZZLG9DQUFZOzs7O0FDSnpCO0lBQUE7SUFLQSxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUxBLEFBS0MsSUFBQTtBQUxZLDhCQUFTO0FBT3RCO0lBQUE7SUFLQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUxBLEFBS0MsSUFBQTtBQUxZLGtDQUFXO0FBT3hCO0lBQUE7SUFJQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLHNDQUFhIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljXCI7XHJcbmltcG9ydCB7IGVuYWJsZVByb2RNb2RlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSBcIi4vbWFpbkZyYW1lXCI7XHJcblxyXG5wbGF0Zm9ybUJyb3dzZXJEeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSk7IiwiaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE5nTW9kdWxlLCBlbmFibGVQcm9kTW9kZSwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9uc1wiO1xyXG5pbXBvcnQgeyBUb2FzdE1vZHVsZSwgVG9hc3RzTWFuYWdlciwgVG9hc3RPcHRpb25zIH0gZnJvbSBcIm5nMi10b2FzdHIvbmcyLXRvYXN0clwiO1xyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG4vLyBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tIFwiLi9jb21tb24vYXBwQ29uZmlnXCI7XHJcbmltcG9ydCB7IHJvdXRpbmcgfSBmcm9tIFwiLi9jb21tb24vYXBwUm91dGluZ1wiO1xyXG5pbXBvcnQgeyBCb3R0b21Ub2FzdHNNYW5hZ2VyIH0gZnJvbSBcIi4vY29tbW9uL2JvdHRvbVRvYXN0c01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQXBwQW5pbWF0aW9uIH0gZnJvbSBcIi4vY29tbW9uL25vZGVfbW9kdWxlcy9uZzItYW5pbWF0aW9uL2FwcEFuaW1hdGlvblwiO1xyXG4vLyBmZWF0dXJlc1xyXG5pbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuL2ZlYXR1cmVzL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNwbGFzaCB9IGZyb20gXCIuL2ZlYXR1cmVzL3NwbGFzaFwiO1xyXG5pbXBvcnQgeyBBbmFseXRpY3MgfSBmcm9tIFwiLi9mZWF0dXJlcy9hbmFseXRpY3NcIjtcclxuaW1wb3J0IHsgRmVhdHVyZXMgfSBmcm9tIFwiLi9mZWF0dXJlcy9mZWF0dXJlc1wiO1xyXG4vLyBwaXBlcyAmIGFuaW1hdGlvblxyXG5pbXBvcnQgeyBTYWZlUmVzb3VyY2UgfSBmcm9tIFwiLi9jb21tb24vc2FmZVJlc291cmNlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nIH0gZnJvbSBcIi4vY29tbW9uL25vZGVfbW9kdWxlcy9uZzItYW5pbWF0aW9uL21vZGFsRGlhbG9nXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibWFpbi1mcmFtZVwiLFxyXG4gICAgLy8jcmVnaW9uIHRlbXBsYXRlOlxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwL21haW5GcmFtZS5odG1sXCIsXHJcbiAgICAvLyAjZW5kcmVnaW9uXHJcbiAgICBwcm92aWRlcnM6IFtBcHBDb25maWddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTWFpbkZyYW1lIHtcclxuICAgIEBWaWV3Q2hpbGQoTW9kYWxEaWFsb2cpIG1kOiBNb2RhbERpYWxvZztcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBhcHBUaXRsZSA9IFwiQW5ndWxhci5OZXQgU3RhcnRlciBBcHBsaWNhdGlvblwiO1xyXG4gICAgcHJpdmF0ZSBkYXRlOiBEYXRlO1xyXG4gICAgcHJpdmF0ZSB0aGVXZWVrT2Y6IHN0cmluZztcclxuICAgIHByaXZhdGUgYXBwSHJlZjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBhcHBDYWNoZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB0aXRsZUJsaW5raW5nID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgdGl0bGVWaXNpYmxlV2hlbk5vdEJsaW5raW5nID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgc2hvd01vZGFsRGlhbG9nID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHZlcnNpb25OdW1iZXIgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RlZEZlYXR1cmU6IHN0cmluZztcclxuICAgIHByaXZhdGUgYXBwTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYWM6IEFwcENvbmZpZywgcHJpdmF0ZSB0b2FzdHI6IFRvYXN0c01hbmFnZXIsIHZSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgICAgICB0aGlzLnRvYXN0ci5zZXRSb290Vmlld0NvbnRhaW5lclJlZih2UmVmKTtcclxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMudGhlV2Vla09mID0gbW9tZW50KCkuc3RhcnRPZihcIndlZWtcIikuZm9ybWF0KFwiZGRkIE1NTSBEIFlZWVlcIik7XHJcbiAgICAgICAgdGhpcy5hcHBIcmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyKDAsIHdpbmRvdy5sb2NhdGlvbi5ocmVmLmxhc3RJbmRleE9mKFwiL1wiKSArIDEpO1xyXG4gICAgICAgIHRoaXMuYXBwQ2FjaGUgPSB0aGlzLmFwcEhyZWYgKyBcImFwcGNhY2hlLmh0bWxcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuYWMuZ2V0RGV2Q29uZmlnKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy52ZXJzaW9uTnVtYmVyID0gdGhpcy5hYy5kZXZDb25maWcudmVyc2lvbk51bWJlcjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWMuZGV2Q29uZmlnLnRlc3RpbmcgJiYgdGhpcy5hYy5kZXZDb25maWcuZGVidWcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNocm9uaXplKCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdHIuc3VjY2VzcyhcIlRoaXMgYXBwbGljYXRpb24gaXMgb3BlcmF0aW5nIG9ubGluZSBhcyBub3JtYWwuXCIsIFwiU3VjY2VzcyFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlRm9yd2FyZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAod2FybmluZ01lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdHIud2FybmluZyh3YXJuaW5nTWVzc2FnZSwgXCJQbGVhc2Ugbm90ZSFcIik7XHJcbiAgICAgICAgICAgIHRoaXMudmVyc2lvbk51bWJlciA9IHRoaXMuYWMuZGV2Q29uZmlnLnZlcnNpb25OdW1iZXI7XHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGVGb3J3YXJkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuYXZpZ2F0ZUZvcndhcmQoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGVCbGlua2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0ZVRvID0gdGhpcy5hYy5nZXRMb2NhbFN0b3JhZ2UoXCJuYXZpZ2F0ZVRvXCIpO1xyXG4gICAgICAgICAgICBpZiAobmF2aWdhdGVUbylcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUbyhuYXZpZ2F0ZVRvLmZlYXR1cmUpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG8oXCIvc3BsYXNoXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmFwcExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfSwgdGhpcy5hYy5kZXZDb25maWcuc3BsYXNoVGltZSk7IC8vIG5hdmlnYXRlIGF3YXkgZnJvbSBzcGxhc2ggdmlldyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXN0YXJ0QXBwKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5hcHBIcmVmOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEFwcENhY2hlKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5hcHBDYWNoZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5hdmlnYXRlVG8oZmVhdHVyZSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGZWF0dXJlID0gZmVhdHVyZTtcclxuICAgICAgICBpZiAoZmVhdHVyZSA9PT0gXCIvcmVzdGFydFwiKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0YXJ0QXBwKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZmVhdHVyZSA9PT0gXCIvYXBwY2FjaGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLmFjLnNldExvY2FsU3RvcmFnZShcImFwcEZlYXR1cmVzXCIsIHsgY2FjaGVkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0ci5pbmZvKFwiVGhpcyBhcHBsaWNhdGlvbiB3aWxsIG5vdyBwZXJmb3JtIG9mZmxpbmUsIGRpc2Nvbm5lY3RlZCBmcm9tIHRoZSBJbnRlcm5ldC5cIiwgXCJTdWNjZXNzIVwiKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFwcENhY2hlKCk7XHJcbiAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFjLnNldExvY2FsU3RvcmFnZShcIm5hdmlnYXRlVG9cIiwgeyBmZWF0dXJlOiBmZWF0dXJlIH0pO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtmZWF0dXJlXSk7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3luY2hyb25pemUoKSB7XHJcbiAgICAgICAgdGhpcy5hYy5zeW5jaHJvbml6ZShcIndhaXRGb3JTaWduYWxcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3RhcnRBcHAoKTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHRpbWVkIG91dCBzbyByZXN0YXJ0XHJcbiAgICAgICAgICAgIHRoaXMuc3luY2hyb25pemUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tBYm91dCgpIHtcclxuICAgICAgICB0aGlzLm1kLm1vZGFsRGlhbG9nVGl0bGUgPSBgQWJvdXQ6ICR7dGhpcy5hcHBUaXRsZX1gO1xyXG4gICAgICAgIHRoaXMubWQub3duZXIgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubWQuc2hvd09rQnV0dG9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1kLmlzQ2xvc2FibGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWQuZGVzaXJlZFdpZHRoID0gNTMwO1xyXG4gICAgICAgIHRoaXMubWQuZGVzaXJlZEhlaWdodCA9IDIwMDtcclxuICAgICAgICB0aGlzLnNob3dNb2RhbERpYWxvZyA9IGZhbHNlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNb2RhbERpYWxvZyA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlhbG9nQnV0dG9uQ2xpY2tlZChidXR0b25DbGlja2VkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoYnV0dG9uQ2xpY2tlZCA9PT0gXCJva1wiKVxyXG4gICAgICAgICAgICB0aGlzLm1kLmNsb3NlRGlhbG9nKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQnJvd3Nlck1vZHVsZSwgSHR0cE1vZHVsZSwgcm91dGluZywgVG9hc3RNb2R1bGUuZm9yUm9vdCgpLCBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSwgQXBwQW5pbWF0aW9uXSxcclxuICAgIGRlY2xhcmF0aW9uczogW01haW5GcmFtZSwgU2V0dGluZ3MsIFNwbGFzaCwgQW5hbHl0aWNzLCBGZWF0dXJlcywgU2FmZVJlc291cmNlXSxcclxuICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogVG9hc3RzTWFuYWdlciwgdXNlQ2xhc3M6IEJvdHRvbVRvYXN0c01hbmFnZXIgfV0sXHJcbiAgICBib290c3RyYXA6IFtNYWluRnJhbWVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9IiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xyXG5cclxuQFBpcGUoeyBuYW1lOiBcInNhZmVSZXNvdXJjZVwiIH0pXHJcbmV4cG9ydCBjbGFzcyBTYWZlUmVzb3VyY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcclxuICAgICAgICB0aGlzLnNhbml0aXplciA9IHNhbml0aXplcjtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0oc3R5bGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHN0eWxlKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRvYXN0T3B0aW9ucywgVG9hc3RzTWFuYWdlciB9IGZyb20gXCJuZzItdG9hc3RyL25nMi10b2FzdHJcIjs7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCb3R0b21Ub2FzdHNNYW5hZ2VyIGV4dGVuZHMgVG9hc3RzTWFuYWdlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgbmdab25lOiBOZ1pvbmUsIGFwcFJlZjogQXBwbGljYXRpb25SZWYsIG9wdGlvbnM6IFRvYXN0T3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgbmdab25lLCBhcHBSZWYsIE9iamVjdC5hc3NpZ24ob3B0aW9ucywge1xyXG4gICAgICAgICAgICBhbmltYXRlOiBcImZseVJpZ2h0XCIsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uQ2xhc3M6IFwidG9hc3QtYm90dG9tLXJpZ2h0XCIsXHJcbiAgICAgICAgICAgIG5ld2VzdE9uVG9wOiB0cnVlLFxyXG4gICAgICAgICAgICB0b2FzdExpZmU6IDUwMDBcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IFNldHRpbmdzIH0gIGZyb20gXCIuLi9mZWF0dXJlcy9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTcGxhc2ggfSAgICBmcm9tIFwiLi4vZmVhdHVyZXMvc3BsYXNoXCI7XHJcbmltcG9ydCB7IEFuYWx5dGljcyB9IGZyb20gXCIuLi9mZWF0dXJlcy9hbmFseXRpY3NcIjtcclxuaW1wb3J0IHsgRmVhdHVyZXMgfSBmcm9tIFwiLi4vZmVhdHVyZXMvZmVhdHVyZXNcIjtcclxuXHJcbmNvbnN0IGFwcFJvdXRlczogUm91dGVzID0gW1xyXG4gICAgeyBwYXRoOiBcInNldHRpbmdzXCIsIGNvbXBvbmVudDogU2V0dGluZ3MgfSxcclxuICAgIHsgcGF0aDogXCJcIiwgY29tcG9uZW50OiBTcGxhc2ggfSxcclxuICAgIHsgcGF0aDogXCJzcGxhc2hcIiwgY29tcG9uZW50OiBTcGxhc2ggfSxcclxuICAgIHsgcGF0aDogXCJhbmFseXRpY3NcIiwgY29tcG9uZW50OiBBbmFseXRpY3MgfSxcclxuICAgIHsgcGF0aDogXCJmZWF0dXJlc1wiLCBjb21wb25lbnQ6IEZlYXR1cmVzIH0sXHJcbiAgICB7IHBhdGg6IFwiKipcIiwgcmVkaXJlY3RUbzogXCIvc3BsYXNoXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfVxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRpbmcgPSBSb3V0ZXJNb2R1bGUuZm9yUm9vdChhcHBSb3V0ZXMpOyIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbi8vIHNlcnZpY2VzXHJcbmltcG9ydCB7IEFwcENvbmZpZyB9IGZyb20gXCIuLi8uLi9hcHAvY29tbW9uL2FwcENvbmZpZ1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICAvLyAjcmVnaW9uIHRlbXBsYXRlXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAvZmVhdHVyZXMvc3BsYXNoLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiYXBwL2ZlYXR1cmVzL3NwbGFzaC5jc3NcIl1cclxuICAgIC8vICNlbmRyZWdpb25cclxufSlcclxuZXhwb3J0IGNsYXNzIFNwbGFzaCB7XHJcbiAgICBwcml2YXRlIGlzVmlld1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaW1hZ2UwVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpbWFnZTFWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGltYWdlMlZpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaW1hZ2UzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpbWFnZTRWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGltYWdlNVZpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaW1hZ2U2VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzZXF1ZW5jZSA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IEFwcENvbmZpZykge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzVmlld1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLnN3aXRjaEltYWdlcygpOyAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzd2l0Y2hJbWFnZXMoKSB7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXF1ZW5jZSA9PT0gNylcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VxdWVuY2UgPSAwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbWFnZTBWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UxVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlMlZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZTNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2U0VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlNVZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZTZWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5zZXF1ZW5jZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UwVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZTFWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlMlZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZTRWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlNVZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2U2VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZSsrO1xyXG4gICAgICAgIH0sIDIwMDApOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gc2VydmljZXNcclxuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2FwcC9jb21tb24vYXBwQ29uZmlnXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIC8vICNyZWdpb24gdGVtcGxhdGVcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC9mZWF0dXJlcy9zZXR0aW5ncy5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImFwcC9mZWF0dXJlcy9zZXR0aW5ncy5jc3NcIl1cclxuICAgIC8vICNlbmRyZWdpb25cclxufSlcclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcclxuICAgIHByaXZhdGUgaXNWaWV3VmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBBcHBDb25maWcpIHtcclxuICAgICAgICB0aGlzLmlzVmlld1Zpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tIFwiLi4vLi4vYXBwL2NvbW1vbi9hcHBDb25maWdcIjtcclxuaW1wb3J0IHsgVG9hc3RzTWFuYWdlciB9IGZyb20gXCJuZzItdG9hc3RyL25nMi10b2FzdHJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgLy8gI3JlZ2lvbiB0ZW1wbGF0ZVxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwL2ZlYXR1cmVzL2ZlYXR1cmVzLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiYXBwL2ZlYXR1cmVzL2ZlYXR1cmVzLmNzc1wiXVxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmVhdHVyZXMge1xyXG4gICAgcHJpdmF0ZSBpc1ZpZXdWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQXBwQ29uZmlnLCBwcml2YXRlIHRvYXN0cjogVG9hc3RzTWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMuaXNWaWV3VmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gc2VydmljZXNcclxuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9hcHBDb25maWdcIjtcclxuaW1wb3J0IHsgQW5hbHl0aWNzRGF0YSwgRXhjZXB0aW9uLCBQZXJmb3JtYW5jZSB9IGZyb20gXCIuLi9tb2RlbHMvYW5hbHl0aWNzRGF0YVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICAvLyAjcmVnaW9uIHRlbXBsYXRlXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAvZmVhdHVyZXMvYW5hbHl0aWNzLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiYXBwL2ZlYXR1cmVzL2FuYWx5dGljcy5jc3NcIl1cclxuICAgIC8vICNlbmRyZWdpb25cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuYWx5dGljcyB7XHJcbiAgICBwcml2YXRlIGlzVmlld1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgYW5hbHl0aWNzRGF0YTogQW5hbHl0aWNzRGF0YTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjOiBBcHBDb25maWcpIHtcclxuICAgICAgICB0aGlzLmlzVmlld1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIGFjLnVwZGF0ZUFuYWx5dGljcygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tDbGVhckVycm9ycygpIHtcclxuICAgICAgICB0aGlzLmFjLmNsZWFyRXhjZXB0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tDbGVhclJlc3BvbnNlVGltZSgpIHtcclxuICAgICAgICB0aGlzLmFjLmNsZWFyUmVzcG9uc2VUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXZlcmFnZVJlc3BvbnNlVGltZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9SeFwiO1xyXG5pbXBvcnQgeyBEZXZDb25maWcgfSBmcm9tIFwiLi4vbW9kZWxzL2RldkNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBCYXNlU2VydmljZXMgfSBmcm9tIFwiLi9iYXNlU2VydmljZXNcIjtcclxuaW1wb3J0IHsgQW5hbHl0aWNzRGF0YSwgRXhjZXB0aW9uLCBQZXJmb3JtYW5jZSB9IGZyb20gXCIuLi9tb2RlbHMvYW5hbHl0aWNzRGF0YVwiO1xyXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5pbXBvcnQgeyBzYXZlQXMgfSBmcm9tIFwiZmlsZS1zYXZlclwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFwcENvbmZpZyBleHRlbmRzIEJhc2VTZXJ2aWNlcyB7XHJcbiAgICBkZXZDb25maWc6IERldkNvbmZpZztcclxuICAgIGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0RhdGE7XHJcbiAgICBiZWdpblJlcXVlc3Q6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cCkge1xyXG4gICAgICAgIHN1cGVyKGh0dHApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFuYWx5dGljcygpIHtcclxuICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEgPSB0aGlzLmdldExvY2FsU3RvcmFnZShcImFuYWx5dGljc0RhdGFcIik7XHJcbiAgICAgICAgdGhpcy5hbmFseXRpY3NEYXRhLmV4Y2VwdGlvbnMgPSBfLm1hcCh0aGlzLmFuYWx5dGljc0RhdGEuZXhjZXB0aW9ucywgKGEpID0+IHtcclxuICAgICAgICAgICAgYS5kYXRlU3RyaW5nID0gbW9tZW50KGEuZGF0ZSkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgICAgICAgYS50aW1lU3RyaW5nID0gbW9tZW50KGEuZGF0ZSkuZm9ybWF0KFwiSEg6bW06c3NcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdG90YWxSZXNwb25zZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMgPSBfLm1hcCh0aGlzLmFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBhLmRhdGVTdHJpbmcgPSBtb21lbnQoYS5kYXRlKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICAgICAgICBhLnRpbWVTdHJpbmcgPSBtb21lbnQoYS5kYXRlKS5mb3JtYXQoXCJISDptbTpzc1wiKTtcclxuICAgICAgICAgICAgdG90YWxSZXNwb25zZVRpbWUgKz0gYS5yZXNwb25zZVRpbWU7XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLmFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgdGhpcy5hbmFseXRpY3NEYXRhLmF2ZXJhZ2VSZXNwb25zZVRpbWUgPSAwO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5hbmFseXRpY3NEYXRhLmF2ZXJhZ2VSZXNwb25zZVRpbWUgPSBNYXRoLnJvdW5kKHRvdGFsUmVzcG9uc2VUaW1lIC8gdGhpcy5hbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyRXhjZXB0aW9ucygpIHtcclxuICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEuZXhjZXB0aW9ucy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKFwiYW5hbHl0aWNzRGF0YVwiLCB0aGlzLmFuYWx5dGljc0RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyUmVzcG9uc2VUaW1lKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShcImFuYWx5dGljc0RhdGFcIiwgdGhpcy5hbmFseXRpY3NEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZ1Jlc29uc2VEYXRhKHJlc3BvbnNlVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgYW5hbHl0aWNzRGF0YTogQW5hbHl0aWNzRGF0YSA9IHRoaXMuZ2V0TG9jYWxTdG9yYWdlKFwiYW5hbHl0aWNzRGF0YVwiKTtcclxuXHJcbiAgICAgICAgaWYgKGFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzLmxlbmd0aCA+IDkpIHtcclxuICAgICAgICAgICAgYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBlcmZvcm1hbmNlID0gbmV3IFBlcmZvcm1hbmNlKCk7IHBlcmZvcm1hbmNlLmRhdGUgPSBuZXcgRGF0ZSgpOyBwZXJmb3JtYW5jZS5yZXNwb25zZVRpbWUgPSByZXNwb25zZVRpbWU7XHJcbiAgICAgICAgYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMudW5zaGlmdChwZXJmb3JtYW5jZSk7XHJcbiAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UoXCJhbmFseXRpY3NEYXRhXCIsIGFuYWx5dGljc0RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERldkNvbmZpZyhzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgICAgIHRoaXMuYmVnaW5SZXF1ZXN0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgcGVyZm9ybWFuY2UubWFyayhcIkJFR0lOIFJFUVVFU1RcIik7XHJcbiAgICAgICAgdGhpcy5odHRwR2V0KFwic3lzSW5mb1wiLCAoZGV2Q29uZmlnOiBEZXZDb25maWcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2dSZXNvbnNlRGF0YShuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuYmVnaW5SZXF1ZXN0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UoXCJkZXZDb25maWdcIiwgZGV2Q29uZmlnKTtcclxuICAgICAgICAgICAgcGVyZm9ybWFuY2UubWFyayhcIlJFUVVFU1QgRU5ERURcIik7XHJcbiAgICAgICAgICAgICh0aGlzLmdldExvY2FsU3RvcmFnZShcImFwcEZlYXR1cmVzXCIpKSA/IGRldkNvbmZpZy5hcHBDYWNoZWQgPSB0cnVlIDogZGV2Q29uZmlnLmFwcENhY2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmRldkNvbmZpZyA9IGRldkNvbmZpZztcclxuICAgICAgICAgICAgdGhpcy5kZXZDb25maWcub25saW5lU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3VjY2VzcygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZyA9IHRoaXMuZ2V0TG9jYWxTdG9yYWdlKFwiZGV2Q29uZmlnXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRldkNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnID0gbmV3IERldkNvbmZpZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLmRlYnVnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcudGVzdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLmFwcENhY2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLnZlcnNpb25OdW1iZXIgPSBcInh4Lnh4Lnh4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcuc3BsYXNoVGltZSA9IDUwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcub25saW5lU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yTWVzc2FnZSA9PT0gXCJvYmplY3RcIikgeyAvLyBtdXN0IGJlIG9mZmxpbmVcclxuICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIlRoaXMgYXBwbGljYXRpb24gaXMgb2ZmbGluZSBhbmQgd2lsbCBjb250aW51ZSBydW5uaW5nIGZyb20gdGhlIEFwcGxpY2F0aW9uIENhY2hlIVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLm9ubGluZVN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLmFwcENhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzeW5jaHJvbml6ZShhY3Rpb25OYW1lOiBzdHJpbmcsIHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5odHRwUG9zdCh7IGFjdGlvbjogYWN0aW9uTmFtZSB9LCBcInN5bmNcIixcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzcygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIERldkNvbmZpZyB7XHJcbiAgICBkZWJ1ZzogYm9vbGVhbjtcclxuICAgIHRlc3Rpbmc6IGJvb2xlYW47XHJcbiAgICBzcGxhc2hUaW1lOiBudW1iZXI7XHJcbiAgICB2ZXJzaW9uTnVtYmVyOiBzdHJpbmc7XHJcbiAgICBvbmxpbmVTdGF0dXM6IGJvb2xlYW47XHJcbiAgICBhcHBDYWNoZWQ6IGJvb2xlYW47XHJcbn0iLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgQ3VzdG9tUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL2N1c3RvbVJlc3BvbnNlXCI7XHJcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlLCBIZWFkZXJzLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IEFuYWx5dGljc0RhdGEsIEV4Y2VwdGlvbiwgUGVyZm9ybWFuY2UgfSBmcm9tIFwiLi4vbW9kZWxzL2FuYWx5dGljc0RhdGFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlU2VydmljZXMge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdldExvY2FsU3RvcmFnZShcImFuYWx5dGljc0RhdGFcIikpIHtcclxuICAgICAgICAgICAgY29uc3QgYW5hbHl0aWNzRGF0YSA9IG5ldyBBbmFseXRpY3NEYXRhKCk7XHJcbiAgICAgICAgICAgIGFuYWx5dGljc0RhdGEuZXhjZXB0aW9ucyA9IG5ldyBBcnJheTxFeGNlcHRpb24+KCk7XHJcbiAgICAgICAgICAgIGFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzID0gbmV3IEFycmF5PFBlcmZvcm1hbmNlPigpO1xyXG4gICAgICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShcImFuYWx5dGljc0RhdGFcIiwgYW5hbHl0aWNzRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGh0dHBHZXQoY29udHJvbGxlcjogc3RyaW5nLCBzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgICAgIHRoaXMuZ2V0KGNvbnRyb2xsZXIpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIG9iaiA9PiB7IHN1Y2Nlc3Mob2JqKSB9LFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQoY29udHJvbGxlcik6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYGFwaS8ke2NvbnRyb2xsZXJ9YClcclxuICAgICAgICAgICAgLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiA8YW55PnJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGh0dHBQb3N0KG9iamVjdDogYW55LCBjb250cm9sbGVyOiBzdHJpbmcsIHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5wb3N0KG9iamVjdCwgY29udHJvbGxlcilcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgb2JqID0+IHsgc3VjY2VzcyhvYmopIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBvc3Qob2JqZWN0OiBhbnksIGNvbnRyb2xsZXI6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGBhcGkvJHtjb250cm9sbGVyfWAsIG9iamVjdClcclxuICAgICAgICAgICAgLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiA8YW55PnJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGh0dHBEZWxldGUoY29udHJvbGxlcjogc3RyaW5nLCBzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgICAgIHRoaXMuZGVsZXRlKGNvbnRyb2xsZXIpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIG9iaiA9PiB7IHN1Y2Nlc3Mob2JqKSB9LFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKGNvbnRyb2xsZXI6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGBhcGkvJHtjb250cm9sbGVyfWApXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gPGFueT5yZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFcnJvcihlcnJvcjogQ3VzdG9tUmVzcG9uc2UsIGNhdWdodDogT2JzZXJ2YWJsZTxhbnk+KTogYW55IHtcclxuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzICE9PSA1MDIgJiYgZXJyb3Iuc3RhdHVzICE9PSAwKSB7IC8vIGJhZCBnYXRld2F5IGlzIGFuIGV4cGVjdGVkIGV4Y2VwdGlvblxyXG4gICAgICAgICAgICBjb25zdCBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFuYWx5dGljc0RhdGFcIikpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFuYWx5dGljc0RhdGEuZXhjZXB0aW9ucy5sZW5ndGggPiA5OSkge1xyXG4gICAgICAgICAgICAgICAgYW5hbHl0aWNzRGF0YS5leGNlcHRpb25zLnBvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGV4Y2VwdGlvbiA9IG5ldyBFeGNlcHRpb24oKTsgZXhjZXB0aW9uLmRhdGUgPSBuZXcgRGF0ZSgpOyBleGNlcHRpb24uZXJyb3JNZXNzYWdlID0gZXJyb3IuX2JvZHk7XHJcbiAgICAgICAgICAgIGFuYWx5dGljc0RhdGEuZXhjZXB0aW9ucy51bnNoaWZ0KGV4Y2VwdGlvbik7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYW5hbHl0aWNzRGF0YVwiLCBKU09OLnN0cmluZ2lmeShhbmFseXRpY3NEYXRhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yLl9ib2R5KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMb2NhbFN0b3JhZ2UobmFtZTogc3RyaW5nLCBhbnlPYmplY3Q6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChhbnlPYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBhbnlPYmplY3QgPSB7IGFycmF5OiBhbnlPYmplY3QgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoYW55T2JqZWN0KSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZ1ZhbCA9IEpTT04uc3RyaW5naWZ5KGFueU9iamVjdCk7XHJcbiAgICAgICAgICAgIGlmIChzdHJpbmdWYWwpXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBzdHJpbmdWYWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRMb2NhbFN0b3JhZ2UobmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpO1xyXG4gICAgICAgIGlmICghdmFsdWUpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmICh2YWx1ZS5zdWJzdHJpbmcoMCwgMSkgPT09IFwie1wiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iajogYW55ID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChcImFycmF5XCIgaW4gb2JqKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5hcnJheTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn0iLCJcclxuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbiB7XHJcbiAgICBkYXRlOiBEYXRlO1xyXG4gICAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBkYXRlU3RyaW5nOiBzdHJpbmc7XHJcbiAgICB0aW1lU3RyaW5nOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJmb3JtYW5jZSB7XHJcbiAgICBkYXRlOiBEYXRlO1xyXG4gICAgcmVzcG9uc2VUaW1lOiBudW1iZXI7XHJcbiAgICBkYXRlU3RyaW5nOiBzdHJpbmc7XHJcbiAgICB0aW1lU3RyaW5nOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBbmFseXRpY3NEYXRhIHtcclxuICAgIGV4Y2VwdGlvbnM6IEFycmF5PEV4Y2VwdGlvbj47XHJcbiAgICBwZXJmb3JtYW5jZXM6IEFycmF5PFBlcmZvcm1hbmNlPjtcclxuICAgIGF2ZXJhZ2VSZXNwb25zZVRpbWU6IG51bWJlcjtcclxufSJdfQ==
