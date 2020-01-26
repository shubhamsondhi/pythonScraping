import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Geocode } from '../models/geocode';

@Injectable({
    providedIn: 'root',
})
export class MbMapService {
    constructor(private http: HttpClient) {}

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

    /**
     * Handles errors with service requests.
     * @param error The error from the http response.
     */
    public handleError(error: HttpErrorResponse) {
        console.log(error);
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, body was: ${error.error}`
            );
        }
        // return an ErrorObservable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
