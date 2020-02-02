import { Component, OnInit } from '@angular/core';
import { KijijiService } from './services/kijiji.service';
import { Category, CityNamesForOntario } from './models/category';
import { MatSelectChange } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    categories: Category;
    startPage = 1;
    selectedcateGoryIdLevel1: number;
    selectedcateGoryIdLevel2: number;
    selectedcateGoryIdLevel3: number;
    selectedCityCode: string;
    lastCategory: string;
    cityNames = new CityNamesForOntario();

    baseUrl = 'https://www.kijiji.ca/';
    url: string;
    minPrice = '';
    maxPrice = '';
    selectedCateId: any;
    selectedCity: { cityName: string; cityurl: string; citycode: string };
    needPriceFilter: boolean;
    constructor(public ks: KijijiService) {}
    ngOnInit() {
        // this.url = this.baseUrl;
        this.ks.getCategoryLevel1().subscribe(cata => (this.categories = cata));
    }
    citySelected(event: MatSelectChange) {
        console.log(event);
        this.selectedCity = this.cityNames.names.find(
            ci => ci.citycode === event.value
        );
        this.createUrl();
    }

    createUrl(category?: string) {
        if (this.selectedCity) {
            if (category) {
                this.lastCategory = category;
            }
            if (this.lastCategory) {
                this.needPriceFilter =
                    this.lastCategory.search(/Rent|Sale/g) !== -1;

                this.setupUrl();
                this.priceChanged();
            }
        }
    }
    private setupUrl() {
        this.url = `${this.baseUrl}b-${this.lastCategory.replace(
            /-|\s./g,
            ''
        )}/${this.selectedCity.cityurl}/page-${this.startPage}/c${
            this.selectedCateId
        }${this.selectedCity.citycode}`;
    }

    priceChanged() {
        if (this.minPrice && this.maxPrice && this.needPriceFilter) {
            this.url = this.addFilter(
                `price=${this.minPrice}__${this.maxPrice}`
            );
        }
    }
    addFilter(arg0: string) {
        const va = this.url.includes('?') ? '&' : '?';
        return (this.url = this.url + va + arg0);
    }
    categoryChanged(event: MatSelectChange) {
        if (event.source && event.value) {
            console.log('event', event.source.triggerValue);
            this.selectedCateId = event.value;
            this.createUrl(event.source.triggerValue);

            this.ks.getCategorySubLevels(event.value).subscribe(cata => {
                this.categories = cata;
                console.log('this.categories', this.categories);
            });
        }
    }
}
