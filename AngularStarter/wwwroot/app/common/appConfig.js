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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBK0M7QUFFL0MsaURBQWdEO0FBQ2hELCtDQUE4QztBQUM5Qyx5REFBZ0Y7QUFDaEYsK0JBQWlDO0FBRWpDLDBCQUE0QjtBQUc1QixJQUFhLFNBQVM7SUFBUyw2QkFBWTtJQUt2QyxtQkFBbUIsSUFBVTtRQUE3QixZQUNJLGtCQUFNLElBQUksQ0FBQyxTQUNkO1FBRmtCLFVBQUksR0FBSixJQUFJLENBQU07O0lBRTdCLENBQUM7SUFFRCxtQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsVUFBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFVBQUMsQ0FBQztZQUN2RSxDQUFDLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakQsaUJBQWlCLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQztZQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUk7WUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEgsQ0FBQztJQUVELG1DQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQscUNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLGtDQUFjLEdBQXRCLFVBQXVCLFlBQW9CO1FBQ3ZDLElBQU0sYUFBYSxHQUFrQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTNFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsYUFBYSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsSUFBTSxXQUFXLEdBQUcsSUFBSSwyQkFBVyxFQUFFLENBQUM7UUFBQyxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFBQyxXQUFXLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUM5RyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsZ0NBQVksR0FBWixVQUFhLE9BQU8sRUFBRSxLQUFLO1FBQTNCLGlCQStCQztRQTlCRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFDLFNBQW9CO1lBQ3pDLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUQsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0MsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsQyxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxTQUFTLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUNqRyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDbkMsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLEVBQ0csVUFBQSxZQUFZO1lBQ1IsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUMvQixLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNqQyxLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDdkMsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBWSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLFlBQVksR0FBRyxtRkFBbUYsQ0FBQztnQkFDbkcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDcEMsQ0FBQztZQUNELEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCwrQkFBVyxHQUFYLFVBQVksVUFBa0IsRUFBRSxPQUFPLEVBQUUsS0FBSztRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFDeEM7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsRUFDRCxVQUFBLFlBQVk7WUFDUixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUwsZ0JBQUM7QUFBRCxDQUFDLEFBOUZELENBQStCLDJCQUFZLEdBOEYxQztBQTlGWSxTQUFTO0lBRHJCLGlCQUFVLEVBQUU7cUNBTWdCLFdBQUk7R0FMcEIsU0FBUyxDQThGckI7QUE5RlksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgRGV2Q29uZmlnIH0gZnJvbSBcIi4uL21vZGVscy9kZXZDb25maWdcIjtcclxuaW1wb3J0IHsgQmFzZVNlcnZpY2VzIH0gZnJvbSBcIi4vYmFzZVNlcnZpY2VzXCI7XHJcbmltcG9ydCB7IEFuYWx5dGljc0RhdGEsIEV4Y2VwdGlvbiwgUGVyZm9ybWFuY2UgfSBmcm9tIFwiLi4vbW9kZWxzL2FuYWx5dGljc0RhdGFcIjtcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSBcImZpbGUtc2F2ZXJcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBcHBDb25maWcgZXh0ZW5kcyBCYXNlU2VydmljZXMge1xyXG4gICAgZGV2Q29uZmlnOiBEZXZDb25maWc7XHJcbiAgICBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NEYXRhO1xyXG4gICAgYmVnaW5SZXF1ZXN0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHApIHtcclxuICAgICAgICBzdXBlcihodHRwKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBbmFseXRpY3MoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXRpY3NEYXRhID0gdGhpcy5nZXRMb2NhbFN0b3JhZ2UoXCJhbmFseXRpY3NEYXRhXCIpO1xyXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YS5leGNlcHRpb25zID0gXy5tYXAodGhpcy5hbmFseXRpY3NEYXRhLmV4Y2VwdGlvbnMsIChhKSA9PiB7XHJcbiAgICAgICAgICAgIGEuZGF0ZVN0cmluZyA9IG1vbWVudChhLmRhdGUpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgICAgICAgIGEudGltZVN0cmluZyA9IG1vbWVudChhLmRhdGUpLmZvcm1hdChcIkhIOm1tOnNzXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHRvdGFsUmVzcG9uc2VUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzID0gXy5tYXAodGhpcy5hbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcywgKGEpID0+IHtcclxuICAgICAgICAgICAgYS5kYXRlU3RyaW5nID0gbW9tZW50KGEuZGF0ZSkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgICAgICAgYS50aW1lU3RyaW5nID0gbW9tZW50KGEuZGF0ZSkuZm9ybWF0KFwiSEg6bW06c3NcIik7XHJcbiAgICAgICAgICAgIHRvdGFsUmVzcG9uc2VUaW1lICs9IGEucmVzcG9uc2VUaW1lO1xyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5hbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YS5hdmVyYWdlUmVzcG9uc2VUaW1lID0gMDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YS5hdmVyYWdlUmVzcG9uc2VUaW1lID0gTWF0aC5yb3VuZCh0b3RhbFJlc3BvbnNlVGltZSAvIHRoaXMuYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckV4Y2VwdGlvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXRpY3NEYXRhLmV4Y2VwdGlvbnMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShcImFuYWx5dGljc0RhdGFcIiwgdGhpcy5hbmFseXRpY3NEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclJlc3BvbnNlVGltZSgpIHtcclxuICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UoXCJhbmFseXRpY3NEYXRhXCIsIHRoaXMuYW5hbHl0aWNzRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dSZXNvbnNlRGF0YShyZXNwb25zZVRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGFuYWx5dGljc0RhdGE6IEFuYWx5dGljc0RhdGEgPSB0aGlzLmdldExvY2FsU3RvcmFnZShcImFuYWx5dGljc0RhdGFcIik7XHJcblxyXG4gICAgICAgIGlmIChhbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcy5sZW5ndGggPiA5KSB7XHJcbiAgICAgICAgICAgIGFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwZXJmb3JtYW5jZSA9IG5ldyBQZXJmb3JtYW5jZSgpOyBwZXJmb3JtYW5jZS5kYXRlID0gbmV3IERhdGUoKTsgcGVyZm9ybWFuY2UucmVzcG9uc2VUaW1lID0gcmVzcG9uc2VUaW1lO1xyXG4gICAgICAgIGFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzLnVuc2hpZnQocGVyZm9ybWFuY2UpO1xyXG4gICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKFwiYW5hbHl0aWNzRGF0YVwiLCBhbmFseXRpY3NEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZXZDb25maWcoc3VjY2VzcywgZXJyb3IpIHtcclxuICAgICAgICB0aGlzLmJlZ2luUmVxdWVzdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoXCJCRUdJTiBSRVFVRVNUXCIpO1xyXG4gICAgICAgIHRoaXMuaHR0cEdldChcInN5c0luZm9cIiwgKGRldkNvbmZpZzogRGV2Q29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nUmVzb25zZURhdGEobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmJlZ2luUmVxdWVzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKFwiZGV2Q29uZmlnXCIsIGRldkNvbmZpZyk7XHJcbiAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoXCJSRVFVRVNUIEVOREVEXCIpO1xyXG4gICAgICAgICAgICAodGhpcy5nZXRMb2NhbFN0b3JhZ2UoXCJhcHBGZWF0dXJlc1wiKSkgPyBkZXZDb25maWcuYXBwQ2FjaGVkID0gdHJ1ZSA6IGRldkNvbmZpZy5hcHBDYWNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kZXZDb25maWcgPSBkZXZDb25maWc7XHJcbiAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLm9ubGluZVN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcgPSB0aGlzLmdldExvY2FsU3RvcmFnZShcImRldkNvbmZpZ1wiKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kZXZDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZyA9IG5ldyBEZXZDb25maWcoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5kZWJ1ZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLnRlc3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5hcHBDYWNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy52ZXJzaW9uTnVtYmVyID0gXCJ4eC54eC54eFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLnNwbGFzaFRpbWUgPSA1MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLm9ubGluZVN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvck1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHsgLy8gbXVzdCBiZSBvZmZsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJUaGlzIGFwcGxpY2F0aW9uIGlzIG9mZmxpbmUgYW5kIHdpbGwgY29udGludWUgcnVubmluZyBmcm9tIHRoZSBBcHBsaWNhdGlvbiBDYWNoZSFcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5vbmxpbmVTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5hcHBDYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3luY2hyb25pemUoYWN0aW9uTmFtZTogc3RyaW5nLCBzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgICAgIHRoaXMuaHR0cFBvc3QoeyBhY3Rpb246IGFjdGlvbk5hbWUgfSwgXCJzeW5jXCIsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSJdfQ==