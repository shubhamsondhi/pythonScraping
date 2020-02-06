import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChange,
    SimpleChanges,
} from '@angular/core';
import { House } from 'src/app/models/house';
import { RentedHousesService } from 'src/app/services/rented-houses.service';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page';
import { NotificationService } from 'src/app/services/notification.service';
import { Circle } from 'src/app/models/circle';
import { Url } from 'src/app/models/url';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnChanges {
    title = 'HouseScraping';
    requestCount = 1;
    // url = '';
    startPage = 1;
    endPage = 3;
    isKeep = true;
    isDrawingCircle: false;
    scrapedData = new Array<House>();
    @Output() addressWithLatLng = new EventEmitter<string>();
    @Input() url: string;
    @Input() urlV2: Url;
    constructor(
        public rh: RentedHousesService,
        public ns: NotificationService
    ) {}

    ngOnInit() {
        if (localStorage.getItem('dataSource') !== null) {
            this.scrapedData = JSON.parse(localStorage.getItem('dataSource'));
        }
    }
    ngOnChanges(change: SimpleChanges) {
        console.log(' this.urlV2', this.urlV2);

        this.setupUrl(this.urlV2);

        // if (change.currentValue !== change.previousValue) {

        // }
    }
    /**
     * get all the list of rented house
     */
    getRentedHouses() {
        console.log('runing');
        const id = this.requestCount;

        const page = this.url.match(/page-.*/)
            ? this.url.match(/page-.*/)[0]
            : this.url;
        this.ns.completion(id, 'Processing Request', page);
        this.requestCount++;
        this.rh
            .getItemsInfoByPage({
                url: this.url,
            })
            .subscribe(
                items => {
                    if (!this.isKeep) {
                        localStorage.removeItem('dataSource');
                    }
                    this.scrapedData = new Array<House>();
                    items.forEach(element => {
                        this.scrapedData.push(element);
                    });

                    localStorage.setItem(
                        'dataSource',
                        JSON.stringify(this.scrapedData)
                    );
                    console.log(id);

                    this.ns.completion(id, 'Completed!', '', true);
                    this.isDrawingCircle = false;
                    this.scrapedData = [...this.scrapedData];
                },
                err => {
                    this.ns.completion(id, 'Error', err, false);
                    console.error(err);
                }
            );
    }

    circleChanged(circle: Circle) {
        if (this.url) {
            const addres = encodeURI(
                `ll=${circle.lat} ${circle.lng}&address=${circle.address}&radius=${circle.radius}`
            );
            this.setupUrl(this.urlV2);
            this.addFilter(addres);

            // this.addressWithLatLng.emit(addres);
        }
    }
    /**
     * On button click
     */
    public DeleteHistoryData() {
        localStorage.removeItem('dataSource');
        this.scrapedData = new Array<House>();
    }
    private setupUrl(urlV2: Url) {
        if (urlV2 && urlV2.category && urlV2.urlcode && urlV2.pageNumber) {
            this.url = `${urlV2.baseUrl}b-${urlV2.category.replace(
                /-|\s./g,
                ''
            )}/${urlV2.city.cityurl}/page-${urlV2.pageNumber}/c${
                urlV2.urlcode.categoryCode
            }${urlV2.city.citycode}`;
        }

        this.addFilter(urlV2.priceFilter);
    }

    addFilter(arg0: string) {
        if (arg0) {
            const va = this.url.includes('?') ? '&' : '?';
            this.url = this.url + va + arg0;
        }
    }
    /**
     * on Button click
     * @param page
     */
    public GetAllTheItems(page: Page): Observable<House[]>[] {
        console.log('items', page);

        return page.listOfpageUrls.map(pageUrl =>
            this.rh.getItemsInfoByPage({ url: pageUrl })
        );
    }
}
