import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { DevConfig } from "../models/devConfig";
import { BaseServices } from "./baseServices";
import { AnalyticsData, Exception, Performance } from "../models/analyticsData";
import * as moment from "moment";
import { saveAs } from "file-saver";
import * as _ from "lodash";

@Injectable()
export class AppConfig extends BaseServices {
    devConfig: DevConfig;
    analyticsData: AnalyticsData;
    beginRequest: number;

    constructor(public readonly http: Http) {
        super(http);
    }

    updateAnalytics() {
        this.analyticsData = this.getLocalStorage("analyticsData");
        this.analyticsData.exceptions = _.map(this.analyticsData.exceptions, (a) => {
            a.dateString = moment(a.date).format("YYYY-MM-DD");
            a.timeString = moment(a.date).format("HH:mm:ss");
            return a;
        });

        let totalResponseTime = 0;
        this.analyticsData.performances = _.map(this.analyticsData.performances, (a) => {
            a.dateString = moment(a.date).format("YYYY-MM-DD");
            a.timeString = moment(a.date).format("HH:mm:ss");
            totalResponseTime += a.responseTime;
            return a;
        });
        if (this.analyticsData.performances.length === 0)
            this.analyticsData.averageResponseTime = 0;
        else
            this.analyticsData.averageResponseTime = Math.round(totalResponseTime / this.analyticsData.performances.length);
    }

    clearExceptions() {
        this.analyticsData.exceptions.length = 0;
        this.setLocalStorage("analyticsData", this.analyticsData);
    }

    clearResponseTime() {
        this.analyticsData.performances.length = 0;
        this.setLocalStorage("analyticsData", this.analyticsData);
    }

    private logResonseData(responseTime: number) {
        const analyticsData: AnalyticsData = this.getLocalStorage("analyticsData");

        if (analyticsData.performances.length > 9) {
            analyticsData.performances.pop();
        }
        const performance = new Performance(); performance.date = new Date(); performance.responseTime = responseTime;
        analyticsData.performances.unshift(performance);
        this.setLocalStorage("analyticsData", analyticsData);
    }

    getDevConfig(success, error) {
        this.beginRequest = new Date().getTime();
        performance.mark("BEGIN REQUEST");
        this.httpGet("sysInfo", (devConfig: DevConfig) => {
            this.logResonseData(new Date().getTime() - this.beginRequest);
            this.setLocalStorage("devConfig", devConfig);
            performance.mark("REQUEST ENDED");
            (this.getLocalStorage("appFeatures")) ? devConfig.appCached = true : devConfig.appCached = false;
            this.devConfig = devConfig;
            this.devConfig.onlineStatus = true;
            success();
        },
            errorMessage => {
                this.devConfig = this.getLocalStorage("devConfig");
                if (!this.devConfig) {
                    this.devConfig = new DevConfig();
                    this.devConfig.debug = false;
                    this.devConfig.testing = false;
                    this.devConfig.appCached = false;
                    this.devConfig.versionNumber = "xx.xx.xx";
                    this.devConfig.splashTime = 5000;
                    this.devConfig.onlineStatus = true;
                }

                if (typeof errorMessage === "object") { // must be offline
                    errorMessage = "This application is offline and will continue running from the Application Cache!";
                    this.devConfig.onlineStatus = false;
                    this.devConfig.appCached = true;
                }
                error(errorMessage);
            });
    }

    synchronize(actionName: string, success, error) {
        this.httpPost({ action: actionName }, "sync",
            () => {
                success();
            },
            errorMessage => {
                error(errorMessage);
            });
    }

}