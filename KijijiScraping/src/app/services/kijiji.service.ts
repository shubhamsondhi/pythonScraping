import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandle } from '../Shared/errorHandle';
import { Category } from '../models/category';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
    providedIn: 'root',
})
export class KijijiService extends ErrorHandle {
    constructor(private http: HttpClient) {
        super();
    }
    pyScraping = `http://127.0.0.1:5000/`;

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
