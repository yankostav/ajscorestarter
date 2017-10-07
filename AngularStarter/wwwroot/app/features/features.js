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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmZWF0dXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEwQztBQUMxQyxXQUFXO0FBQ1gsd0RBQXVEO0FBQ3ZELG9EQUFzRDtBQVF0RCxJQUFhLFFBQVE7SUFFakIsa0JBQW9CLE1BQWlCLEVBQVUsTUFBcUI7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7UUFENUQsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLFFBQVE7SUFOcEIsZ0JBQVMsQ0FBQztRQUNQLG1CQUFtQjtRQUNuQixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1FBQ3hDLGFBQWE7S0FDaEIsQ0FBQztxQ0FHOEIscUJBQVMsRUFBa0IsMEJBQWE7R0FGM0QsUUFBUSxDQUtwQjtBQUxZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gc2VydmljZXNcclxuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2FwcC9jb21tb24vYXBwQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRvYXN0c01hbmFnZXIgfSBmcm9tIFwibmcyLXRvYXN0ci9uZzItdG9hc3RyXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIC8vICNyZWdpb24gdGVtcGxhdGVcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC9mZWF0dXJlcy9mZWF0dXJlcy5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImFwcC9mZWF0dXJlcy9mZWF0dXJlcy5jc3NcIl1cclxuICAgIC8vICNlbmRyZWdpb25cclxufSlcclxuZXhwb3J0IGNsYXNzIEZlYXR1cmVzIHtcclxuICAgIHByaXZhdGUgaXNWaWV3VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IEFwcENvbmZpZywgcHJpdmF0ZSB0b2FzdHI6IFRvYXN0c01hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLmlzVmlld1Zpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==