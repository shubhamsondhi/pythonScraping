import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { House } from '../models/house';
import { Page } from '../models/page';

@Injectable({
    providedIn: 'root',
})
export class RentedHousesService {
    constructor(private http: HttpClient) {}

    apiKey = 'AIzaSyC3u1VAIs0S5Ij-HmcxrTEMIx19X8UZH30';
    pyScraping = `http://127.0.0.1:5000/`;
    getUrl(api: string) {
        return this.pyScraping + api;
    }
    getHouses(url: any) {
        return this.http
            .post<House[]>(this.pyScraping, url)
            .pipe(catchError(this.handleError));
    }

    getPageInfo(url: any): Observable<Page> {
        return this.http
            .post<Page>(this.getUrl('getTotalPages'), url)
            .pipe(catchError(this.handleError));
    }

    getItemsInfoByPage(url: any): Observable<House[]> {
        return this.http
            .post<House[]>(this.getUrl('getItemsInfoByPage'), url)
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
