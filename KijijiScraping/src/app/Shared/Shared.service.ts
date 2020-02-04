import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../services/notification.service';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SharedService {
    constructor() {}
    apiKey = 'AIzaSyArew2eZn1_SdNAQhLWU1Sjs5jQYWmptMA';
    pyScraping = environment.url;
    geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode';

    /**
     * Handles errors with service requests.
     * @param error The error from the http response.
     */
    public handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            const msg = `Backend returned code ${error.status}, body was: ${error.error}`;
        }
        // return an ErrorObservable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
