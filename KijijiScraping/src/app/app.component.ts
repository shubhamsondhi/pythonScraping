import { Component, OnInit } from '@angular/core';
import { RentedHousesService } from './services/rented-houses.service';
import { House } from './models/house';
import { Page } from './models/page';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'HouseScraping';
    url = '';
    startPage = 1;
    endPage = 3;
    isKeep = true;
    scrapedData = new Array<House>();
    constructor(public rh: RentedHousesService) {

    }
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
        const result = this.rh
            .getPageInfo({
                url: this.url,
            })
            .subscribe(np => {
                this.rh
                    .getItemsInfoByPage({
                        url: np.listOfpageUrls[this.startPage],
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
                    });
            });
    }

    private GetAllTheItems(np: Page): Observable<House[]>[] {
        console.log('items', np);

        return np.listOfpageUrls.map(pageUrl =>
            this.rh.getItemsInfoByPage({ url: pageUrl })
        );
    }
}
