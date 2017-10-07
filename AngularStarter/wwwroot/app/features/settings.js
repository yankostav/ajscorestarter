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
        templateUrl: "app/features/settings.html",
        styleUrls: ["app/features/settings.css"]
        // #endregion
    }),
    __metadata("design:paramtypes", [appConfig_1.AppConfig])
], Settings);
exports.Settings = Settings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEwQztBQUMxQyxXQUFXO0FBQ1gsd0RBQXVEO0FBUXZELElBQWEsUUFBUTtJQUdqQixrQkFBb0IsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUY3QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUcxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksUUFBUTtJQU5wQixnQkFBUyxDQUFDO1FBQ1AsbUJBQW1CO1FBQ25CLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7UUFDeEMsYUFBYTtLQUNoQixDQUFDO3FDQUk4QixxQkFBUztHQUg1QixRQUFRLENBTXBCO0FBTlksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tIFwiLi4vLi4vYXBwL2NvbW1vbi9hcHBDb25maWdcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgLy8gI3JlZ2lvbiB0ZW1wbGF0ZVxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwL2ZlYXR1cmVzL3NldHRpbmdzLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiYXBwL2ZlYXR1cmVzL3NldHRpbmdzLmNzc1wiXVxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3Mge1xyXG4gICAgcHJpdmF0ZSBpc1ZpZXdWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IEFwcENvbmZpZykge1xyXG4gICAgICAgIHRoaXMuaXNWaWV3VmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==