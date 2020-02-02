import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Geocode } from '../models/geocode';
import { ErrorHandle } from '../Shared/errorHandle';

@Injectable({
    providedIn: 'root',
})
export class MbMapService extends ErrorHandle {
    constructor(private http: HttpClient) {
        super();
    }

    apiKey = 'AIzaSyC3u1VAIs0S5Ij-HmcxrTEMIx19X8UZH30';
    geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode';

    getLatLong(address: string, type = 'json') {
        console.log('I am running');
        return this.http
            .get<Geocode>(
                `${this.geocodeUrl}/${type}?address=${address}&key=${this.apiKey}`
            )
            .pipe(catchError(this.handleError));
    }
}
