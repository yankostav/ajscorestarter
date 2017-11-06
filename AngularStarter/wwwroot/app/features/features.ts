import { Component } from "@angular/core";
// services
import { AppConfig } from "../../app/common/appConfig";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
    // #region template
    templateUrl: "app/features/features.html",
    styleUrls: ["app/features/features.css"]
    // #endregion
})
export class Features {
    private isViewVisible = false;
    constructor(private readonly config: AppConfig, private readonly toastr: ToastsManager) {
        this.isViewVisible = true;
    }
}
