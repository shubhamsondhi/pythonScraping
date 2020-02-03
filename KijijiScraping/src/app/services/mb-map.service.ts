import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Geocode } from '../models/geocode';
import { SharedService } from '../Shared/Shared.service';

@Injectable({
    providedIn: 'root',
})
export class MbMapService  {
    constructor(private http: HttpClient, public ss: SharedService) {
        // super();
    }


    getLatLong(address: string, type = 'json') {
        console.log('I am running');
        return this.http
            .get<Geocode>(
                `${this.ss.geocodeUrl}/${type}?address=${address}&key=${this.ss.apiKey}`
            )
            .pipe(catchError(this.ss.handleError));
    }
}
