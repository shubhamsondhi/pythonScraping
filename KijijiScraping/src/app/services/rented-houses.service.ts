import { Injectable } from '@angular/core';

import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { House } from '../models/house';
import { Page } from '../models/page';
import { SharedService } from '../Shared/Shared.service';

@Injectable({
    providedIn: 'root',
})
export class RentedHousesService  {
    constructor(private http: HttpClient, public ss: SharedService) {
        // super();
    }



    getUrl(api: string) {
        return this.ss.pyScraping + api;
    }

    getHouses(url: any) {
        return this.http
            .post<House[]>(this.ss.pyScraping, url)
            .pipe(catchError(this.ss.handleError));
    }

    getPageInfo(url: any): Observable<Page> {
        return this.http
            .post<Page>(this.getUrl('getTotalPages'), url)
            .pipe(catchError(this.ss.handleError));
    }

    getItemsInfoByPage(url: any): Observable<House[]> {
        return this.http
            .post<House[]>(this.getUrl('getItemsInfoByPage'), url)
            .pipe(
              retry(2),
              catchError(this.ss.handleError));
    }
}
