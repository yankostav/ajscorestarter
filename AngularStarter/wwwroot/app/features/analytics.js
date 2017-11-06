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
        templateUrl: "app/features/analytics.html",
        styleUrls: ["app/features/analytics.css"]
        // #endregion
    }),
    __metadata("design:paramtypes", [appConfig_1.AppConfig])
], Analytics);
exports.Analytics = Analytics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5hbHl0aWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTBDO0FBQzFDLFdBQVc7QUFDWCxpREFBZ0Q7QUFTaEQsSUFBYSxTQUFTO0lBSWxCLG1CQUE2QixFQUFhO1FBQWIsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUhsQyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUkxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELHNDQUFrQixHQUFsQjtRQUNJLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELDRDQUF3QixHQUF4QjtRQUNJLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsMENBQXNCLEdBQXRCO0lBRUEsQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQXJCWSxTQUFTO0lBTnJCLGdCQUFTLENBQUM7UUFDUCxtQkFBbUI7UUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtRQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztRQUN6QyxhQUFhO0tBQ2hCLENBQUM7cUNBS21DLHFCQUFTO0dBSmpDLFNBQVMsQ0FxQnJCO0FBckJZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gc2VydmljZXNcclxuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9hcHBDb25maWdcIjtcclxuaW1wb3J0IHsgQW5hbHl0aWNzRGF0YSwgRXhjZXB0aW9uLCBQZXJmb3JtYW5jZSB9IGZyb20gXCIuLi9tb2RlbHMvYW5hbHl0aWNzRGF0YVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICAvLyAjcmVnaW9uIHRlbXBsYXRlXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAvZmVhdHVyZXMvYW5hbHl0aWNzLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiYXBwL2ZlYXR1cmVzL2FuYWx5dGljcy5jc3NcIl1cclxuICAgIC8vICNlbmRyZWdpb25cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuYWx5dGljcyB7XHJcbiAgICBwcml2YXRlIGlzVmlld1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgYW5hbHl0aWNzRGF0YTogQW5hbHl0aWNzRGF0YTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGFjOiBBcHBDb25maWcpIHtcclxuICAgICAgICB0aGlzLmlzVmlld1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIGFjLnVwZGF0ZUFuYWx5dGljcygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tDbGVhckVycm9ycygpIHtcclxuICAgICAgICB0aGlzLmFjLmNsZWFyRXhjZXB0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tDbGVhclJlc3BvbnNlVGltZSgpIHtcclxuICAgICAgICB0aGlzLmFjLmNsZWFyUmVzcG9uc2VUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXZlcmFnZVJlc3BvbnNlVGltZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==