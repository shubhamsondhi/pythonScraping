import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { House } from '../models/house';
import { Page } from '../models/page';
import { ErrorHandle } from '../Shared/errorHandle';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RentedHousesService extends ErrorHandle {
    constructor(private http: HttpClient) {
        super();
    }

    apiKey = 'AIzaSyC3u1VAIs0S5Ij-HmcxrTEMIx19X8UZH30';
    pyScraping = environment.url;

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
}
