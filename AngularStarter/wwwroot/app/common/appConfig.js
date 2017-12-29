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
        try {
            performance.mark("BEGIN REQUEST");
        }
        catch (e) { }
        this.httpGet("sysInfo", function (devConfig) {
            _this.logResonseData(new Date().getTime() - _this.beginRequest);
            _this.setLocalStorage("devConfig", devConfig);
            try {
                performance.mark("REQUEST ENDED");
            }
            catch (e) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBK0M7QUFFL0MsaURBQWdEO0FBQ2hELCtDQUE4QztBQUM5Qyx5REFBZ0Y7QUFDaEYsK0JBQWlDO0FBRWpDLDBCQUE0QjtBQUc1QixJQUFhLFNBQVM7SUFBUyw2QkFBWTtJQUt2QyxtQkFBNEIsSUFBVTtRQUF0QyxZQUNJLGtCQUFNLElBQUksQ0FBQyxTQUNkO1FBRjJCLFVBQUksR0FBSixJQUFJLENBQU07O0lBRXRDLENBQUM7SUFFRCxtQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsVUFBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFVBQUMsQ0FBQztZQUN2RSxDQUFDLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFD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LEtBQUs7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQ3hDO1lBQ0ksT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLEVBQ0QsVUFBQSxZQUFZO1lBQ1IsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0FBQyxBQTlGRCxDQUErQiwyQkFBWSxHQThGMUM7QUE5RlksU0FBUztJQURyQixpQkFBVSxFQUFFO3FDQU15QixXQUFJO0dBTDdCLFNBQVMsQ0E4RnJCO0FBOUZZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL1J4XCI7XHJcbmltcG9ydCB7IERldkNvbmZpZyB9IGZyb20gXCIuLi9tb2RlbHMvZGV2Q29uZmlnXCI7XHJcbmltcG9ydCB7IEJhc2VTZXJ2aWNlcyB9IGZyb20gXCIuL2Jhc2VTZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBBbmFseXRpY3NEYXRhLCBFeGNlcHRpb24sIFBlcmZvcm1hbmNlIH0gZnJvbSBcIi4uL21vZGVscy9hbmFseXRpY3NEYXRhXCI7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gXCJmaWxlLXNhdmVyXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXBwQ29uZmlnIGV4dGVuZHMgQmFzZVNlcnZpY2VzIHtcclxuICAgIGRldkNvbmZpZzogRGV2Q29uZmlnO1xyXG4gICAgYW5hbHl0aWNzRGF0YTogQW5hbHl0aWNzRGF0YTtcclxuICAgIGJlZ2luUmVxdWVzdDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBodHRwOiBIdHRwKSB7XHJcbiAgICAgICAgc3VwZXIoaHR0cCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQW5hbHl0aWNzKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YSA9IHRoaXMuZ2V0TG9jYWxTdG9yYWdlKFwiYW5hbHl0aWNzRGF0YVwiKTtcclxuICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEuZXhjZXB0aW9ucyA9IF8ubWFwKHRoaXMuYW5hbHl0aWNzRGF0YS5leGNlcHRpb25zLCAoYSkgPT4ge1xyXG4gICAgICAgICAgICBhLmRhdGVTdHJpbmcgPSBtb21lbnQoYS5kYXRlKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgICAgICAgICBhLnRpbWVTdHJpbmcgPSBtb21lbnQoYS5kYXRlKS5mb3JtYXQoXCJISDptbTpzc1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0b3RhbFJlc3BvbnNlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5hbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcyA9IF8ubWFwKHRoaXMuYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMsIChhKSA9PiB7XHJcbiAgICAgICAgICAgIGEuZGF0ZVN0cmluZyA9IG1vbWVudChhLmRhdGUpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgICAgICAgIGEudGltZVN0cmluZyA9IG1vbWVudChhLmRhdGUpLmZvcm1hdChcIkhIOm1tOnNzXCIpO1xyXG4gICAgICAgICAgICB0b3RhbFJlc3BvbnNlVGltZSArPSBhLnJlc3BvbnNlVGltZTtcclxuICAgICAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEuYXZlcmFnZVJlc3BvbnNlVGltZSA9IDA7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmFuYWx5dGljc0RhdGEuYXZlcmFnZVJlc3BvbnNlVGltZSA9IE1hdGgucm91bmQodG90YWxSZXNwb25zZVRpbWUgLyB0aGlzLmFuYWx5dGljc0RhdGEucGVyZm9ybWFuY2VzLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJFeGNlcHRpb25zKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHl0aWNzRGF0YS5leGNlcHRpb25zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UoXCJhbmFseXRpY3NEYXRhXCIsIHRoaXMuYW5hbHl0aWNzRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJSZXNwb25zZVRpbWUoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKFwiYW5hbHl0aWNzRGF0YVwiLCB0aGlzLmFuYWx5dGljc0RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nUmVzb25zZURhdGEocmVzcG9uc2VUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhbmFseXRpY3NEYXRhOiBBbmFseXRpY3NEYXRhID0gdGhpcy5nZXRMb2NhbFN0b3JhZ2UoXCJhbmFseXRpY3NEYXRhXCIpO1xyXG5cclxuICAgICAgICBpZiAoYW5hbHl0aWNzRGF0YS5wZXJmb3JtYW5jZXMubGVuZ3RoID4gOSkge1xyXG4gICAgICAgICAgICBhbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcy5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGVyZm9ybWFuY2UgPSBuZXcgUGVyZm9ybWFuY2UoKTsgcGVyZm9ybWFuY2UuZGF0ZSA9IG5ldyBEYXRlKCk7IHBlcmZvcm1hbmNlLnJlc3BvbnNlVGltZSA9IHJlc3BvbnNlVGltZTtcclxuICAgICAgICBhbmFseXRpY3NEYXRhLnBlcmZvcm1hbmNlcy51bnNoaWZ0KHBlcmZvcm1hbmNlKTtcclxuICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShcImFuYWx5dGljc0RhdGFcIiwgYW5hbHl0aWNzRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGV2Q29uZmlnKHN1Y2Nlc3MsIGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5iZWdpblJlcXVlc3QgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB0cnkgeyBwZXJmb3JtYW5jZS5tYXJrKFwiQkVHSU4gUkVRVUVTVFwiKTsgfSBjYXRjaCAoZSkgeyB9XHJcbiAgICAgICAgdGhpcy5odHRwR2V0KFwic3lzSW5mb1wiLCAoZGV2Q29uZmlnOiBEZXZDb25maWcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2dSZXNvbnNlRGF0YShuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuYmVnaW5SZXF1ZXN0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UoXCJkZXZDb25maWdcIiwgZGV2Q29uZmlnKTtcclxuICAgICAgICAgICAgdHJ5IHsgcGVyZm9ybWFuY2UubWFyayhcIlJFUVVFU1QgRU5ERURcIik7IH0gY2F0Y2ggKGUpIHsgfVxyXG4gICAgICAgICAgICAodGhpcy5nZXRMb2NhbFN0b3JhZ2UoXCJhcHBGZWF0dXJlc1wiKSkgPyBkZXZDb25maWcuYXBwQ2FjaGVkID0gdHJ1ZSA6IGRldkNvbmZpZy5hcHBDYWNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kZXZDb25maWcgPSBkZXZDb25maWc7XHJcbiAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLm9ubGluZVN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXZDb25maWcgPSB0aGlzLmdldExvY2FsU3RvcmFnZShcImRldkNvbmZpZ1wiKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kZXZDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZyA9IG5ldyBEZXZDb25maWcoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5kZWJ1ZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLnRlc3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5hcHBDYWNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy52ZXJzaW9uTnVtYmVyID0gXCJ4eC54eC54eFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLnNwbGFzaFRpbWUgPSA1MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2Q29uZmlnLm9ubGluZVN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvck1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHsgLy8gbXVzdCBiZSBvZmZsaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJUaGlzIGFwcGxpY2F0aW9uIGlzIG9mZmxpbmUgYW5kIHdpbGwgY29udGludWUgcnVubmluZyBmcm9tIHRoZSBBcHBsaWNhdGlvbiBDYWNoZSFcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5vbmxpbmVTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldkNvbmZpZy5hcHBDYWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3luY2hyb25pemUoYWN0aW9uTmFtZTogc3RyaW5nLCBzdWNjZXNzLCBlcnJvcikge1xyXG4gICAgICAgIHRoaXMuaHR0cFBvc3QoeyBhY3Rpb246IGFjdGlvbk5hbWUgfSwgXCJzeW5jXCIsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSJdfQ==