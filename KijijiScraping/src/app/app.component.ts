import { Component, OnInit } from '@angular/core';
import { RentedHousesService } from './services/rented-houses.service';
import { House } from './models/house';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HouseScraping';
  url = '';
  scrapedData: House[];
  constructor(public rh: RentedHousesService) {}
  ngOnInit() {}
  validator() {}

  /**
   * get all the list of rented house
   */
  getRentedHouses() {
    this.rh.getHouses({ url: this.url }).subscribe(np => {
      console.log('np', np);

      this.scrapedData = np;
    });
  }
}
