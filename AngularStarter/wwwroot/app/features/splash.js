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
        templateUrl: "app/features/splash.html",
        styleUrls: ["app/features/splash.css"]
        // #endregion
    }),
    __metadata("design:paramtypes", [appConfig_1.AppConfig])
], Splash);
exports.Splash = Splash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsYXNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3BsYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTBDO0FBQzFDLFdBQVc7QUFDWCx3REFBdUQ7QUFRdkQsSUFBYSxNQUFNO0lBV2YsZ0JBQTZCLE1BQWlCO1FBQTlDLGlCQUlDO1FBSjRCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFWdEMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUdqQixVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5QkFBUSxHQUFSO1FBQUEsaUJBRUM7UUFERyxVQUFVLENBQUMsY0FBUSxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU8sNkJBQVksR0FBcEI7UUFBQSxpQkFxQ0M7UUFwQ0csV0FBVyxDQUFDO1lBQ1IsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUM7Z0JBQ3BCLEtBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBRXRCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixLQUFLLENBQUM7b0JBQ0YsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzFCLEtBQUssQ0FBQztnQkFDVixLQUFLLENBQUM7b0JBQ0YsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzFCLEtBQUssQ0FBQztnQkFDVixLQUFLLENBQUM7b0JBQ0YsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzFCLEtBQUssQ0FBQztnQkFDVixLQUFLLENBQUM7b0JBQ0YsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzFCLEtBQUssQ0FBQztnQkFDVixLQUFLLENBQUM7b0JBQ0YsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzFCLEtBQUssQ0FBQztnQkFDVixLQUFLLENBQUM7b0JBQ0YsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzFCLEtBQUssQ0FBQztnQkFDVixLQUFLLENBQUM7b0JBQ0YsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzFCLEtBQUssQ0FBQztZQUNkLENBQUM7WUFDRCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVMLGFBQUM7QUFBRCxDQUFDLEFBNURELElBNERDO0FBNURZLE1BQU07SUFObEIsZ0JBQVMsQ0FBQztRQUNQLG1CQUFtQjtRQUNuQixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1FBQ3RDLGFBQWE7S0FDaEIsQ0FBQztxQ0FZdUMscUJBQVM7R0FYckMsTUFBTSxDQTREbEI7QUE1RFksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG4vLyBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tIFwiLi4vLi4vYXBwL2NvbW1vbi9hcHBDb25maWdcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgLy8gI3JlZ2lvbiB0ZW1wbGF0ZVxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwL2ZlYXR1cmVzL3NwbGFzaC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImFwcC9mZWF0dXJlcy9zcGxhc2guY3NzXCJdXHJcbiAgICAvLyAjZW5kcmVnaW9uXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGxhc2gge1xyXG4gICAgcHJpdmF0ZSBpc1ZpZXdWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGltYWdlMFZpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaW1hZ2UxVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpbWFnZTJWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGltYWdlM1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaW1hZ2U0VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpbWFnZTVWaXNpYmxlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGltYWdlNlZpc2libGUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgc2VxdWVuY2UgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBBcHBDb25maWcpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc1ZpZXdWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5zd2l0Y2hJbWFnZXMoKTsgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3dpdGNoSW1hZ2VzKCkge1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VxdWVuY2UgPT09IDcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcXVlbmNlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UwVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlMVZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZTJWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlNFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZTVWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2U2VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc2VxdWVuY2UpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlMFZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UxVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZTJWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlM1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2U0VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZTVWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlNlZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VxdWVuY2UrKztcclxuICAgICAgICB9LCAyMDAwKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxufSJdfQ==