import { Pipe, PipeTransform } from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({ name: "safeResource" })
export class SafeResource {

    constructor(private sanitizer: DomSanitizer) {
        this.sanitizer = sanitizer;
    }

    transform(style) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(style);
    }
}