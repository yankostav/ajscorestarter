import { ApplicationRef, ComponentFactoryResolver, Injectable, NgZone } from "@angular/core";
import { ToastOptions, ToastsManager } from "ng2-toastr/ng2-toastr";;

@Injectable()
export class BottomToastsManager extends ToastsManager {
    constructor(componentFactoryResolver: ComponentFactoryResolver, ngZone: NgZone, appRef: ApplicationRef, options: ToastOptions) {
        super(componentFactoryResolver, ngZone, appRef, Object.assign(options, {
            animate: "flyRight",
            positionClass: "toast-bottom-right",
            newestOnTop: true,
            toastLife: 5000
        }));
    }
}