import { Component } from "@angular/core";
// services
import { AppConfig } from "../../app/common/appConfig";

@Component({
    // #region template
    templateUrl: "app/features/splash.html",
    styleUrls: ["app/features/splash.css"]
    // #endregion
})
export class Splash {
    private isViewVisible = false;
    private image0Visible = false;
    private image1Visible = false;
    private image2Visible = false;
    private image3Visible = false;
    private image4Visible = false;
    private image5Visible = false;
    private image6Visible = false;
    private sequence = 0;

    constructor(private readonly config: AppConfig) {
        setTimeout(() => {
            this.isViewVisible = true;
        });
    }

    ngOnInit() {
        setTimeout(() => { this.switchImages();  });
    }

    private switchImages() {
        setInterval(() => {
            if (this.sequence === 7)
                this.sequence = 0;

            this.image0Visible = false;
            this.image1Visible = false;
            this.image2Visible = false;
            this.image3Visible = false;
            this.image4Visible = false;
            this.image5Visible = false;
            this.image6Visible = false;
            switch (this.sequence) {
                case 0:
                    this.image0Visible = true;
                    break;
                case 1:
                    this.image1Visible = true;
                    break;
                case 2:
                    this.image2Visible = true;
                    break;
                case 3:
                    this.image3Visible = true;
                    break;
                case 4:
                    this.image4Visible = true;
                    break;
                case 5:
                    this.image5Visible = true;
                    break;
                case 6:
                    this.image6Visible = true;
                    break;
            }
            this.sequence++;
        }, 2000);        
    }

}