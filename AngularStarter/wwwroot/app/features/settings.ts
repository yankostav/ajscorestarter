import { Component } from "@angular/core";
// services
import { AppConfig } from "../../app/common/appConfig";

@Component({
    // #region template
    templateUrl: "app/features/settings.html",
    styleUrls: ["app/features/settings.css"]
    // #endregion
})
export class Settings {
    private isViewVisible = false;

    constructor(private readonly config: AppConfig) {
        this.isViewVisible = true;
    }
}

