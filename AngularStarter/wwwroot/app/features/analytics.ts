import { Component } from "@angular/core";
// services
import { AppConfig } from "../common/appConfig";
import { AnalyticsData, Exception, Performance } from "../models/analyticsData";

@Component({
    // #region template
    templateUrl: "app/features/analytics.html",
    styleUrls: ["app/features/analytics.css"]
    // #endregion
})
export class Analytics {
    private isViewVisible = false;
    private analyticsData: AnalyticsData;

    constructor(private readonly ac: AppConfig) {
        this.isViewVisible = true;
        ac.updateAnalytics();
    }

    onClickClearErrors() {
        this.ac.clearExceptions();
    }

    onClickClearResponseTime() {
        this.ac.clearResponseTime();
    }

    getAverageResponseTime() {

    }

}
