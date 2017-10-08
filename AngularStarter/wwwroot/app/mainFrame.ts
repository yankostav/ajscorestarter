import { HttpModule } from "@angular/http";
import { NgModule, enableProdMode, ViewChild } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Component, ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastModule, ToastsManager, ToastOptions } from "ng2-toastr/ng2-toastr";
import * as moment from "moment";
// services
import { AppConfig } from "./common/appConfig";
import { routing } from "./common/appRouting";
import { BottomToastsManager } from "./common/bottomToastsManager";
import { AppAnimation } from "./common/node_modules/ng2-animation/appAnimation";
// features
import { Settings } from "./features/settings";
import { Splash } from "./features/splash";
import { Analytics } from "./features/analytics";
import { Features } from "./features/features";
// pipes & animation
import { SafeResource } from "./common/safeResource";
import { ModalDialog } from "./common/node_modules/ng2-animation/modalDialog";
@Component({
    selector: "main-frame",
    //#region template:
    templateUrl: "app/mainFrame.html",
    // #endregion
    providers: [AppConfig]
})

export class MainFrame {
    @ViewChild(ModalDialog) md: ModalDialog;
    
    private appTitle = "Angular.Net Starter Application";
    private date: Date;
    private theWeekOf: string;
    private appHref: string;
    private appCache: string;
    private titleBlinking = true;
    private titleVisibleWhenNotBlinking = true;
    private showModalDialog = false;
    private versionNumber = "";
    private selectedFeature: string;
    private appLoaded = false;

    constructor(private route: ActivatedRoute, private router: Router, private ac: AppConfig, private toastr: ToastsManager, vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
        this.date = new Date();
        this.theWeekOf = moment().startOf("week").format("ddd MMM D YYYY");
        this.appHref = window.location.href.substr(0, window.location.href.lastIndexOf("/") + 1);
        this.appCache = this.appHref + "appcache.html";
    }

    private ngOnInit() {
        this.ac.getDevConfig(() => {
            this.versionNumber = this.ac.devConfig.versionNumber;
            if (this.ac.devConfig.testing && this.ac.devConfig.debug)
                this.synchronize();
            setTimeout(() => {
                this.toastr.success("This application is operating online as normal.", "Success!");
                this.navigateForward();
            });
        }, (warningMessage) => {
            this.toastr.warning(warningMessage, "Please note!");
            this.versionNumber = this.ac.devConfig.versionNumber;
            this.navigateForward();
        });
    }

    private navigateForward() {
        setTimeout(() => {
            this.titleBlinking = false;
            const navigateTo = this.ac.getLocalStorage("navigateTo");
            if (navigateTo)
                this.navigateTo(navigateTo.feature);
            else
                this.navigateTo("/splash");
            this.appLoaded = true;
        }, this.ac.devConfig.splashTime); // navigate away from splash view        
    }

    private restartApp() {
        window.location.href = this.appHref;       
    }

    private setAppCache() {
        window.location.href = this.appCache;
    }

    private navigateTo(feature) {
        this.selectedFeature = feature;
        if (feature === "/restart") {
            setTimeout(() => {
                this.restartApp();
            }, 1000);
            return;
        }

        if (feature === "/appcache") {
            this.ac.setLocalStorage("appFeatures", { cached: true });
            this.toastr.info("This application will now perform offline, disconnected from the Internet.", "Success!");
            setTimeout(() => {
                this.setAppCache();
            }, 5000);
            return;
        }

        this.ac.setLocalStorage("navigateTo", { feature: feature });
        this.router.navigate([feature]);       
    }

    private synchronize() {
        this.ac.synchronize("waitForSignal", () => {
            this.restartApp();
        }, () => {
            // timed out so restart
            this.synchronize();
        });
    }

    private onClickAbout() {
        this.md.modalDialogTitle = `About: ${this.appTitle}`;
        this.md.owner = this;
        this.md.showOkButton = true;
        this.md.isClosable = true;
        this.md.desiredWidth = 530;
        this.md.desiredHeight = 200;
        this.showModalDialog = false;
        setTimeout(() => {
            this.showModalDialog = true;
        });
    }

    dialogButtonClicked(buttonClicked: string) {
        if (buttonClicked === "ok")
            this.md.closeDialog();
    }
}

@NgModule({
    imports: [BrowserModule, HttpModule, routing, ToastModule.forRoot(), BrowserAnimationsModule, AppAnimation],
    declarations: [MainFrame, Settings, Splash, Analytics, Features, SafeResource],
    providers: [{ provide: ToastsManager, useClass: BottomToastsManager }],
    bootstrap: [MainFrame]
})
export class AppModule { }