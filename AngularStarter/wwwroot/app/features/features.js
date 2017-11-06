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
        templateUrl: "app/features/features.html",
        styleUrls: ["app/features/features.css"]
        // #endregion
    }),
    __metadata("design:paramtypes", [appConfig_1.AppConfig, ng2_toastr_1.ToastsManager])
], Features);
exports.Features = Features;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmZWF0dXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEwQztBQUMxQyxXQUFXO0FBQ1gsd0RBQXVEO0FBQ3ZELG9EQUFzRDtBQVF0RCxJQUFhLFFBQVE7SUFFakIsa0JBQTZCLE1BQWlCLEVBQW1CLE1BQXFCO1FBQXpELFdBQU0sR0FBTixNQUFNLENBQVc7UUFBbUIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUQ5RSxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUUxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksUUFBUTtJQU5wQixnQkFBUyxDQUFDO1FBQ1AsbUJBQW1CO1FBQ25CLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7UUFDeEMsYUFBYTtLQUNoQixDQUFDO3FDQUd1QyxxQkFBUyxFQUEyQiwwQkFBYTtHQUY3RSxRQUFRLENBS3BCO0FBTFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tIFwiLi4vLi4vYXBwL2NvbW1vbi9hcHBDb25maWdcIjtcclxuaW1wb3J0IHsgVG9hc3RzTWFuYWdlciB9IGZyb20gXCJuZzItdG9hc3RyL25nMi10b2FzdHJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgLy8gI3JlZ2lvbiB0ZW1wbGF0ZVxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwL2ZlYXR1cmVzL2ZlYXR1cmVzLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiYXBwL2ZlYXR1cmVzL2ZlYXR1cmVzLmNzc1wiXVxyXG4gICAgLy8gI2VuZHJlZ2lvblxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmVhdHVyZXMge1xyXG4gICAgcHJpdmF0ZSBpc1ZpZXdWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogQXBwQ29uZmlnLCBwcml2YXRlIHJlYWRvbmx5IHRvYXN0cjogVG9hc3RzTWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMuaXNWaWV3VmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuIl19