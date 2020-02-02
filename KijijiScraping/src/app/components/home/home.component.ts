import { Component, OnInit, Input } from '@angular/core';
import { House } from 'src/app/models/house';
import { RentedHousesService } from 'src/app/services/rented-houses.service';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    title = 'HouseScraping';
    // url = '';
    startPage = 1;
    endPage = 3;
    isKeep = true;
    scrapedData = new Array<House>();
    @Input() url: string;
    constructor(public rh: RentedHousesService) {}

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
        this.rh.getItemsInfoByPage({
                url: this.url,
            })
            .subscribe(items => {
                console.log('items', items);
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
                this.scrapedData = [...this.scrapedData];
                console.log('this.scrapedData', this.scrapedData);
            });
    }

    /**
     * On button click
     */
    public DeleteHistoryData() {
        localStorage.removeItem('dataSource');
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
