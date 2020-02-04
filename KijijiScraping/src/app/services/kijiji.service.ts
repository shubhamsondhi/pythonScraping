import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from 'src/environments/environment';
import { SharedService } from '../Shared/Shared.service';

@Injectable({
    providedIn: 'root',
})
export class KijijiService {
    pyScraping;
    constructor(private http: HttpClient, public sh: SharedService) {
        this.pyScraping = environment.url;
    }

    getCategoryLevel1() {
        return this.http
            .get<Category>(`${this.pyScraping}getCategories`)
            .pipe(catchError(this.sh.handleError));
    }

    getCategorySubLevels(categoryId: number) {
        return this.http
            .post<Category>(`${this.pyScraping}getCategories`, { categoryId })
            .pipe(catchError(this.sh.handleError));
    }
}
