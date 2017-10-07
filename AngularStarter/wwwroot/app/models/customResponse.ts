import { Response } from "@angular/http";

export class CustomResponse extends Response {
    _body: string;
}