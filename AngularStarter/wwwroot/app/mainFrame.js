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
        this.appTitle = "Angular.Net Starter Application  3";
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
        templateUrl: "app/mainFrame.html",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbkZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbkZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUFvRTtBQUNwRSw4REFBMEQ7QUFDMUQsc0NBQTREO0FBQzVELDBDQUF5RDtBQUN6RCxtRUFBK0U7QUFDL0Usb0RBQWlGO0FBQ2pGLCtCQUFpQztBQUNqQyxXQUFXO0FBQ1gsZ0RBQStDO0FBQy9DLGtEQUE4QztBQUM5QyxvRUFBbUU7QUFDbkUsaUZBQWdGO0FBQ2hGLFdBQVc7QUFDWCxnREFBK0M7QUFDL0MsNENBQTJDO0FBQzNDLGtEQUFpRDtBQUNqRCxnREFBK0M7QUFDL0Msb0JBQW9CO0FBQ3BCLHNEQUFxRDtBQUNyRCwrRUFBOEU7QUFTOUUsSUFBYSxTQUFTO0lBZWxCLG1CQUFvQixLQUFxQixFQUFVLE1BQWMsRUFBVSxFQUFhLEVBQVUsTUFBcUIsRUFBRSxJQUFzQjtRQUEzSCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQVovRyxhQUFRLEdBQUcsb0NBQW9DLENBQUM7UUFLaEQsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsZ0NBQTJCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBRW5CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFHdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFn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b2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgZW5hYmxlUHJvZE1vZGUsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnNcIjtcclxuaW1wb3J0IHsgVG9hc3RNb2R1bGUsIFRvYXN0c01hbmFnZXIsIFRvYXN0T3B0aW9ucyB9IGZyb20gXCJuZzItdG9hc3RyL25nMi10b2FzdHJcIjtcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuLy8gc2VydmljZXNcclxuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSBcIi4vY29tbW9uL2FwcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyByb3V0aW5nIH0gZnJvbSBcIi4vY29tbW9uL2FwcFJvdXRpbmdcIjtcclxuaW1wb3J0IHsgQm90dG9tVG9hc3RzTWFuYWdlciB9IGZyb20gXCIuL2NvbW1vbi9ib3R0b21Ub2FzdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEFwcEFuaW1hdGlvbiB9IGZyb20gXCIuL2NvbW1vbi9ub2RlX21vZHVsZXMvbmcyLWFuaW1hdGlvbi9hcHBBbmltYXRpb25cIjtcclxuLy8gZmVhdHVyZXNcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi9mZWF0dXJlcy9zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBTcGxhc2ggfSBmcm9tIFwiLi9mZWF0dXJlcy9zcGxhc2hcIjtcclxuaW1wb3J0IHsgQW5hbHl0aWNzIH0gZnJvbSBcIi4vZmVhdHVyZXMvYW5hbHl0aWNzXCI7XHJcbmltcG9ydCB7IEZlYXR1cmVzIH0gZnJvbSBcIi4vZmVhdHVyZXMvZmVhdHVyZXNcIjtcclxuLy8gcGlwZXMgJiBhbmltYXRpb25cclxuaW1wb3J0IHsgU2FmZVJlc291cmNlIH0gZnJvbSBcIi4vY29tbW9uL3NhZmVSZXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZyB9IGZyb20gXCIuL2NvbW1vbi9ub2RlX21vZHVsZXMvbmcyLWFuaW1hdGlvbi9tb2RhbERpYWxvZ1wiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm1haW4tZnJhbWVcIixcclxuICAgIC8vI3JlZ2lvbiB0ZW1wbGF0ZTpcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC9tYWluRnJhbWUuaHRtbFwiLFxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG4gICAgcHJvdmlkZXJzOiBbQXBwQ29uZmlnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE1haW5GcmFtZSB7XHJcbiAgICBAVmlld0NoaWxkKE1vZGFsRGlhbG9nKSBtZDogTW9kYWxEaWFsb2c7XHJcbiAgICBcclxuICAgIHByaXZhdGUgYXBwVGl0bGUgPSBcIkFuZ3VsYXIuTmV0IFN0YXJ0ZXIgQXBwbGljYXRpb24gIDNcIjtcclxuICAgIHByaXZhdGUgZGF0ZTogRGF0ZTtcclxuICAgIHByaXZhdGUgdGhlV2Vla09mOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGFwcEhyZWY6IHN0cmluZztcclxuICAgIHByaXZhdGUgYXBwQ2FjaGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgdGl0bGVCbGlua2luZyA9IHRydWU7XHJcbiAgICBwcml2YXRlIHRpdGxlVmlzaWJsZVdoZW5Ob3RCbGlua2luZyA9IHRydWU7XHJcbiAgICBwcml2YXRlIHNob3dNb2RhbERpYWxvZyA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSB2ZXJzaW9uTnVtYmVyID0gXCJcIjtcclxuICAgIHByaXZhdGUgc2VsZWN0ZWRGZWF0dXJlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGFwcExvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGFjOiBBcHBDb25maWcsIHByaXZhdGUgdG9hc3RyOiBUb2FzdHNNYW5hZ2VyLCB2UmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICAgICAgdGhpcy50b2FzdHIuc2V0Um9vdFZpZXdDb250YWluZXJSZWYodlJlZik7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLnRoZVdlZWtPZiA9IG1vbWVudCgpLnN0YXJ0T2YoXCJ3ZWVrXCIpLmZvcm1hdChcImRkZCBNTU0gRCBZWVlZXCIpO1xyXG4gICAgICAgIHRoaXMuYXBwSHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnN1YnN0cigwLCB3aW5kb3cubG9jYXRpb24uaHJlZi5sYXN0SW5kZXhPZihcIi9cIikgKyAxKTtcclxuICAgICAgICB0aGlzLmFwcENhY2hlID0gdGhpcy5hcHBIcmVmICsgXCJhcHBjYWNoZS5odG1sXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmFjLmdldERldkNvbmZpZygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmVyc2lvbk51bWJlciA9IHRoaXMuYWMuZGV2Q29uZmlnLnZlcnNpb25OdW1iZXI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjLmRldkNvbmZpZy50ZXN0aW5nICYmIHRoaXMuYWMuZGV2Q29uZmlnLmRlYnVnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jaHJvbml6ZSgpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RyLnN1Y2Nlc3MoXCJUaGlzIGFwcGxpY2F0aW9uIGlzIG9wZXJhdGluZyBvbmxpbmUgYXMgbm9ybWFsLlwiLCBcIlN1Y2Nlc3MhXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZUZvcndhcmQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgKHdhcm5pbmdNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3RyLndhcm5pbmcod2FybmluZ01lc3NhZ2UsIFwiUGxlYXNlIG5vdGUhXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnNpb25OdW1iZXIgPSB0aGlzLmFjLmRldkNvbmZpZy52ZXJzaW9uTnVtYmVyO1xyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlRm9yd2FyZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF2aWdhdGVGb3J3YXJkKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlQmxpbmtpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGVUbyA9IHRoaXMuYWMuZ2V0TG9jYWxTdG9yYWdlKFwibmF2aWdhdGVUb1wiKTtcclxuICAgICAgICAgICAgaWYgKG5hdmlnYXRlVG8pXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG8obmF2aWdhdGVUby5mZWF0dXJlKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvKFwiL3NwbGFzaFwiKTtcclxuICAgICAgICAgICAgdGhpcy5hcHBMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH0sIHRoaXMuYWMuZGV2Q29uZmlnLnNwbGFzaFRpbWUpOyAvLyBuYXZpZ2F0ZSBhd2F5IGZyb20gc3BsYXNoIHZpZXcgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzdGFydEFwcCgpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuYXBwSHJlZjsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRBcHBDYWNoZSgpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuYXBwQ2FjaGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuYXZpZ2F0ZVRvKGZlYXR1cmUpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IGZlYXR1cmU7XHJcbiAgICAgICAgaWYgKGZlYXR1cmUgPT09IFwiL3Jlc3RhcnRcIikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdGFydEFwcCgpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZlYXR1cmUgPT09IFwiL2FwcGNhY2hlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5hYy5zZXRMb2NhbFN0b3JhZ2UoXCJhcHBGZWF0dXJlc1wiLCB7IGNhY2hlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy50b2FzdHIuaW5mbyhcIlRoaXMgYXBwbGljYXRpb24gd2lsbCBub3cgcGVyZm9ybSBvZmZsaW5lLCBkaXNjb25uZWN0ZWQgZnJvbSB0aGUgSW50ZXJuZXQuXCIsIFwiU3VjY2VzcyFcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBcHBDYWNoZSgpO1xyXG4gICAgICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hYy5zZXRMb2NhbFN0b3JhZ2UoXCJuYXZpZ2F0ZVRvXCIsIHsgZmVhdHVyZTogZmVhdHVyZSB9KTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbZmVhdHVyZV0pOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN5bmNocm9uaXplKCkge1xyXG4gICAgICAgIHRoaXMuYWMuc3luY2hyb25pemUoXCJ3YWl0Rm9yU2lnbmFsXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXN0YXJ0QXBwKCk7XHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyB0aW1lZCBvdXQgc28gcmVzdGFydFxyXG4gICAgICAgICAgICB0aGlzLnN5bmNocm9uaXplKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQWJvdXQoKSB7XHJcbiAgICAgICAgdGhpcy5tZC5tb2RhbERpYWxvZ1RpdGxlID0gYEFib3V0OiAke3RoaXMuYXBwVGl0bGV9YDtcclxuICAgICAgICB0aGlzLm1kLm93bmVyID0gdGhpcztcclxuICAgICAgICB0aGlzLm1kLnNob3dPa0J1dHRvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tZC5pc0Nsb3NhYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1kLmRlc2lyZWRXaWR0aCA9IDUzMDtcclxuICAgICAgICB0aGlzLm1kLmRlc2lyZWRIZWlnaHQgPSAyMDA7XHJcbiAgICAgICAgdGhpcy5zaG93TW9kYWxEaWFsb2cgPSBmYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TW9kYWxEaWFsb2cgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRpYWxvZ0J1dHRvbkNsaWNrZWQoYnV0dG9uQ2xpY2tlZDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGJ1dHRvbkNsaWNrZWQgPT09IFwib2tcIilcclxuICAgICAgICAgICAgdGhpcy5tZC5jbG9zZURpYWxvZygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0Jyb3dzZXJNb2R1bGUsIEh0dHBNb2R1bGUsIHJvdXRpbmcsIFRvYXN0TW9kdWxlLmZvclJvb3QoKSwgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsIEFwcEFuaW1hdGlvbl0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtNYWluRnJhbWUsIFNldHRpbmdzLCBTcGxhc2gsIEFuYWx5dGljcywgRmVhdHVyZXMsIFNhZmVSZXNvdXJjZV0sXHJcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IFRvYXN0c01hbmFnZXIsIHVzZUNsYXNzOiBCb3R0b21Ub2FzdHNNYW5hZ2VyIH1dLFxyXG4gICAgYm9vdHN0cmFwOiBbTWFpbkZyYW1lXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfSJdfQ==