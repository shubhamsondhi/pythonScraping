import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandle } from '../Shared/errorHandle';
import { Category } from '../models/category';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class KijijiService extends ErrorHandle {
    pyScraping;
    constructor(private http: HttpClient) {
        super();
        this.pyScraping = environment.url;
    }

    getCategoryLevel1() {
        return this.http
            .get<Category>(`${this.pyScraping}getCategories`)
            .pipe(catchError(this.handleError));
    }

    getCategorySubLevels(categoryId: number) {
        return this.http
            .post<Category>(`${this.pyScraping}getCategories`, { categoryId })
            .pipe(catchError(this.handleError));
    }
}
