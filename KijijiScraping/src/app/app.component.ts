import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { KijijiService } from './services/kijiji.service';
import { Category, CityNamesForOntario } from './models/category';
import { MatSelectChange } from '@angular/material';
import { Url } from './models/url';
import {
    MatTreeFlatDataSource,
    MatTreeFlattener,
} from '@angular/material/tree';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
    categories: Category;
    selectedcateGoryIdLevel1: number;
    selectedcateGoryIdLevel2: number;
    selectedcateGoryIdLevel3: number;
    cityNames = new CityNamesForOntario();
    url: string;
    urlV2: Url;
    minPrice = '';
    maxPrice = '';
    // selectedCateId: any;
    needPriceFilter: boolean;
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;
    constructor(
        public ks: KijijiService,
        media: MediaMatcher,
        changeDetectorRef: ChangeDetectorRef
    ) {
        this.urlV2 = new Url();

        this.urlV2.baseUrl = 'https://www.kijiji.ca/';
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngOnInit() {
        // this.url = this.baseUrl;
        this.ks.getCategoryLevel1().subscribe(cata => (this.categories = cata));
    }
    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
    createUrl() {
        this.priceChanged();
        this.urlV2 = { ...this.urlV2 };
    }
    citySelected(event: MatSelectChange) {
        console.log(event);
        // select the city by city name
        this.urlV2.city = this.cityNames.names.find(
            ci => ci.citycode === event.value
        );

        this.urlV2 = { ...this.urlV2 };
    }

    priceChanged() {
        if (this.minPrice && this.maxPrice && this.needPriceFilter) {
            this.urlV2.priceFilter = `price=${this.minPrice}__${this.maxPrice}`;
        }
    }

    // addFilter(arg0: string) {
    //     const va = this.url.includes('?') ? '&' : '?';
    //     return (this.url = this.url + va + arg0);
    // }
    // addressWithLatLng(event: string) {
    //     this.createUrl();
    //     // this.addFilter(event);
    // }

    categoryChanged(event: MatSelectChange) {
        if (event.source && event.value) {
            const categoryId = event.value;

            this.urlV2.category = event.source.triggerValue;
            this.urlV2.urlcode.categoryCode = categoryId;

            this.needPriceFilter =
                this.urlV2.category.search(/Rent|Sale/g) !== -1;
            // get sub category
            this.ks.getCategorySubLevels(categoryId).subscribe(cata => {
                this.categories = cata;
                console.log('this.categories', this.categories);
            });
            this.urlV2 = { ...this.urlV2 };
        }
    }
}
