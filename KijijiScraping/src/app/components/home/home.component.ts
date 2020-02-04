import { Component, OnInit, Input } from '@angular/core';
import { House } from 'src/app/models/house';
import { RentedHousesService } from 'src/app/services/rented-houses.service';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    title = 'HouseScraping';
    requestCount = 1;
    // url = '';
    startPage = 1;
    endPage = 3;
    isKeep = true;
    scrapedData = new Array<House>();
    @Input() url: string;
    constructor(
        public rh: RentedHousesService,
        public ns: NotificationService
    ) {}

    ngOnInit() {
        if (localStorage.getItem('dataSource') !== null) {
            this.scrapedData = JSON.parse(localStorage.getItem('dataSource'));
        }
    }
    validator() {}

    /**
     * get all the list of rented house
     */
    getRentedHouses() {
        console.log('runing');
        const id = this.requestCount;
        const page = this.url.match(/page-.*/)[0];
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
                    this.scrapedData = [...this.scrapedData];
                },
                err => {
                    this.ns.completion(id, 'Error', err, false);
                    console.error(err);
                }
            );
    }

    /**
     * On button click
     */
    public DeleteHistoryData() {
        localStorage.removeItem('dataSource');
        this.scrapedData = new Array<House>();
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
