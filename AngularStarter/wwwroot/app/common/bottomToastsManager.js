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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tVG9hc3RzTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvdHRvbVRvYXN0c01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTZGO0FBQzdGLG9EQUFvRTtBQUFBLENBQUM7QUFHckUsSUFBYSxtQkFBbUI7SUFBUyx1Q0FBYTtJQUNsRCw2QkFBWSx3QkFBa0QsRUFBRSxNQUFjLEVBQUUsTUFBc0IsRUFBRSxPQUFxQjtlQUN6SCxrQkFBTSx3QkFBd0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ25FLE9BQU8sRUFBRSxVQUFVO1lBQ25CLGFBQWEsRUFBRSxvQkFBb0I7WUFDbkMsV0FBVyxFQUFFLElBQUk7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQVRELENBQXlDLDBCQUFhLEdBU3JEO0FBVFksbUJBQW1CO0lBRC9CLGlCQUFVLEVBQUU7cUNBRTZCLCtCQUF3QixFQUFVLGFBQU0sRUFBVSxxQkFBYyxFQUFXLHlCQUFZO0dBRHBILG1CQUFtQixDQVMvQjtBQVRZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRvYXN0T3B0aW9ucywgVG9hc3RzTWFuYWdlciB9IGZyb20gXCJuZzItdG9hc3RyL25nMi10b2FzdHJcIjs7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCb3R0b21Ub2FzdHNNYW5hZ2VyIGV4dGVuZHMgVG9hc3RzTWFuYWdlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgbmdab25lOiBOZ1pvbmUsIGFwcFJlZjogQXBwbGljYXRpb25SZWYsIG9wdGlvbnM6IFRvYXN0T3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgbmdab25lLCBhcHBSZWYsIE9iamVjdC5hc3NpZ24ob3B0aW9ucywge1xyXG4gICAgICAgICAgICBhbmltYXRlOiBcImZseVJpZ2h0XCIsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uQ2xhc3M6IFwidG9hc3QtYm90dG9tLXJpZ2h0XCIsXHJcbiAgICAgICAgICAgIG5ld2VzdE9uVG9wOiB0cnVlLFxyXG4gICAgICAgICAgICB0b2FzdExpZmU6IDUwMDBcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbn0iXX0=