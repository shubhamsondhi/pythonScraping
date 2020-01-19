import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { MbMapService } from 'src/app/services/mb-map.service';
import { Marker } from './marker';
import { RentedHousesService } from 'src/app/services/rented-houses.service';
import { forkJoin } from 'rxjs';
import { House } from 'src/app/models/house';
import { Options, LabelType } from 'ng5-slider';
import { Geocode } from 'src/app/models/geocode';
@Component({
    selector: 'app-mb-map',
    templateUrl: './mb-map.component.html',
    styleUrls: ['./mb-map.component.css'],
})
export class MbMapComponent implements OnInit, OnChanges {
    @Input() data: House[];
    latitude = -28.68352;
    longitude = -147.20785;
    mapType = 'satellite';
    minMaxValue = [0, 100];
    // google maps zoom level
    zoom = 8;

    // initial center position for the map
    lat = 43.0582;
    lng = -79.2902;

    markers: Marker[] = [];
    changedMarkers: Marker[] = [];
    options: Options;
    constructor(public mb: MbMapService, public rh: RentedHousesService) {
        this.options = this.getOptions(2000);
    }

    ngOnChanges(simp: SimpleChanges) {
        console.log('run it');
        // console.log('local', localStorage.getItem('dataSource'));
        // create observables from address values in geocode api of google.
        if (
            this.data !== undefined &&
            this.data !== null &&
            this.data.length !== 0
        ) {
            const addressObs = this.data.map(x =>
                this.mb.getLatLong(x.address)
            );

            forkJoin(addressObs).subscribe(res => {
                res.forEach((v, i) => {
                    if (v.status === 'OK' && v.results) {
                        const mar = this.mapResultToMarker(v, i);
                        this.markers.push(mar);
                    }
                });
                localStorage.setItem(
                    'dataSource',
                    JSON.stringify(this.markers)
                );
            });
        } else {
            console.log('this.markers', this.markers);
            if (localStorage.getItem('dataSource') !== null) {
                this.markers = JSON.parse(localStorage.getItem('dataSource'));
            }
        }

        this.restMarker();
    }

    private mapResultToMarker(v: Geocode, i: number): Marker {
        const mar: Marker = new Marker();

        mar.lat = v.results[0].geometry.location.lat;
        mar.lng = v.results[0].geometry.location.lng;
        mar.des = this.data[i].discription;
        mar.imagesUrl = this.data[i].images;
        mar.price = this.data[i].price;
        mar.url = this.data[i].url;
        mar.address = this.data[i].address;
        return mar;
    }

    /**
     *
     */
    restMarker() {
        this.minMaxValue = this.getMinMaxPrice(this.markers);
        this.options = this.getOptions(this.minMaxValue[1]);
        this.changedMarkers = this.markers;
    }

    /**
     *
     * @param markers
     */
    getMinMaxPrice(markers: Marker[]) {
        if (!this.markers || this.markers.length === 0) {
            return this.minMaxValue;
        }
        // convert currency to number and then remove all empty/NaN values
        const priceArray = this.markers
            .map(m => parseFloat(m.price.replace(/[,$]/g, '')))
            .filter(value => !Number.isNaN(value));

        // find max value
        const max = priceArray.reduce((pr, cur) => {
            return Math.max(pr, cur);
        });

        // find min value
        const min = priceArray.reduce((pr, cur) => {
            return Math.min(pr, cur);
        });
        return [min, max];
    }

    /**
     *
     */
    ngOnInit() {
        // convert address to lat and long
        // this.mb.getLatLong(address).subscribe(ln => {
        //   if (ln.status === 'OK') {
        //     console.log('ln', ln);
        //     // ln.results.forEach((v, i) => {
        //     //   const mar: Marker = new Marker();
        //     //   mar.lat = v.geometry.location.lat;
        //     //   mar.lat = v.geometry.location.lng;
        //     //   mar.des = this.data[i].discription;
        //     //   mar.imagesUrl = this.data[i].images;
        //     //   mar.price = this.data[i].price;
        //     //   mar.url = this.data[i].url;
        //     //   mar.address = this.data[i].address;
        //     //   this.markers.push(mar);
        //     // });
        //   }
        // });
    }

    /**
     *
     * @param label
     * @param index
     */
    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
    }

    /**
     *
     * @param maxPrice
     */
    getOptions(maxPrice: number): Options {
        return {
            floor: 0,
            ceil: maxPrice,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Low:
                        return '<b>Min price:</b> $' + value;
                    case LabelType.High:
                        return '<b>Max price:</b> $' + value;
                    default:
                        return '$' + value;
                }
            },
        };
    }

    /**
     *
     */
    onSliderChanged() {
        // convert currency to number and then remove all empty/NaN values
        const priceArray = this.markers.map(m =>
            parseFloat(m.price.replace(/[,$]/g, ''))
        );

        // get markers from min and max range
        this.changedMarkers = this.markers.filter((v, i) => {
            return (
                priceArray[i] >= this.minMaxValue[0] &&
                priceArray[i] <= this.minMaxValue[1]
            );
        });
    }
}
