import { Observable } from "rxjs/Rx";
import { CustomResponse } from "../models/customResponse";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { AnalyticsData, Exception, Performance } from "../models/analyticsData";

export class BaseServices {

    constructor(public readonly http: Http) {
        if (!this.getLocalStorage("analyticsData")) {
            const analyticsData = new AnalyticsData();
            analyticsData.exceptions = new Array<Exception>();
            analyticsData.performances = new Array<Performance>();
            this.setLocalStorage("analyticsData", analyticsData);
        }
    }

    httpGet(controller: string, success, error) {
        this.get(controller)
            .subscribe(
            obj => { success(obj) },
            errorMessage => {
                error(errorMessage);
            });
    }

    private get(controller): Observable<any> {
        return this.http.get(`api/${controller}`)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    httpPost(object: any, controller: string, success, error) {
        this.post(object, controller)
            .subscribe(
            obj => { success(obj) },
            errorMessage => {
                error(errorMessage);
            });
    }

    private post(object: any, controller: string): Observable<any> {
        return this.http.post(`api/${controller}`, object)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    httpDelete(controller: string, success, error) {
        this.delete(controller)
            .subscribe(
            obj => { success(obj) },
            errorMessage => {
                error(errorMessage);
            });
    }

    delete(controller: string) {
        return this.http.delete(`api/${controller}`)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    handleError(error: CustomResponse, caught: Observable<any>): any {
        if (error.status !== 502 && error.status !== 0) { // bad gateway is an expected exception
            const analyticsData: AnalyticsData = JSON.parse(localStorage.getItem("analyticsData"));

            if (analyticsData.exceptions.length > 99) {
                analyticsData.exceptions.pop();
            }
            const exception = new Exception(); exception.date = new Date(); exception.errorMessage = error._body;
            analyticsData.exceptions.unshift(exception);
            localStorage.setItem("analyticsData", JSON.stringify(analyticsData));
        }
        return Observable.throw(error._body);
    }

    setLocalStorage(name: string, anyObject: any): void {
        if (anyObject instanceof Array) {
            anyObject = { array: anyObject };
        }
        if (typeof (anyObject) == "object") {
            const stringVal = JSON.stringify(anyObject);
            if (stringVal)
                localStorage.setItem(name, stringVal);
        }
    }

    getLocalStorage(name: string): any {
        const value = localStorage.getItem(name);
        if (!value)
            return null;
        if (value.substring(0, 1) === "{") {
            const obj: any = JSON.parse(value);
            if ("array" in obj)
                return obj.array;
            return obj;
        }
        return null;
    }
}