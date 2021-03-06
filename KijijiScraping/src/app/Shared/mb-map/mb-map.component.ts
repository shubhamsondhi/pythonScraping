import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
} from '@angular/core';
import { MbMapService } from 'src/app/services/mb-map.service';
import { Marker } from './marker';
import { RentedHousesService } from 'src/app/services/rented-houses.service';
import { forkJoin } from 'rxjs';
import { House } from 'src/app/models/house';
import { Options, LabelType } from 'ng5-slider';
import { Geocode } from 'src/app/models/geocode';
import { Circle } from 'src/app/models/circle';
@Component({
    selector: 'app-mb-map',
    templateUrl: './mb-map.component.html',
    styleUrls: ['./mb-map.component.css'],
})
export class MbMapComponent implements OnInit, OnChanges {
    @Input() data: House[];
    @Input() drawCircle = false;
    @Output() circleChanged = new EventEmitter<Circle>();

    mapType: string;
    minMaxValue: number[]; // = [0, 100];
    circle: Circle;
    // google maps zoom level
    zoom: number;

    // initial center position for the map
    lat: number;
    lng: number;

    markers: Marker[] = [];
    changedMarkers: Marker[] = [];
    options: Options;
    previous: any;
    constructor(public mb: MbMapService, public rh: RentedHousesService) {
        this.options = this.getOptions(2000);
        this.circle = new Circle();

        this.mapType = 'satellite';
        this.minMaxValue = [0, 100];
        this.zoom = 8;

        // initial center position for the map
        this.lat = 43.0582;
        this.lng = -79.2902;
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
            this.minMaxValue = this.getMinMaxPrice(this.markers);
            forkJoin(addressObs).subscribe(res => {
                res.forEach((v, i) => {
                    if (v.status === 'OK' && v.results) {
                        const mar = this.mapResultToMarker(v, i);
                        this.markers.push(mar);
                        // console.log('this.markers', this.markers);
                    }
                });
                this.restMarker();

                // localStorage.setItem(
                //     'dataSource',
                //     JSON.stringify(this.markers)
                // );
            });
        } else {
            // console.log('this.markers', this.markers);
            if (this.data.length === 0) {
                this.markers = new Array<Marker>();
                this.restMarker();
            }
            // if (localStorage.getItem('dataSource') !== null) {
            //     // this.markers = JSON.parse(localStorage.getItem('dataSource'));
            // }
        }
    }
    getLabelOption(price: string) {
        return {
            color: 'black',
            fontFamily: '',
            fontSize: '14px',
            fontWeight: 'bold',
            text: price,
        };
    }
    clickedMap(event) {
        if (this.previous) {
            this.previous.close();
            this.previous = undefined;
        }
    }

    clickedMarker(label: string, infoWindow, marker, index: number) {
        if (this.previous && this.previous !== infoWindow) {
            this.previous.close();
        }
        this.previous = infoWindow;
    }
    changeInRadius(event: number) {
        const inKMradius = event / 1000;
        this.circle.radius = inKMradius;
        this.validateAndEmitCircle();
    }
    private validateAndEmitCircle() {
        if (
            this.circle &&
            this.circle.radius &&
            this.circle.lat &&
            this.circle.lng
        ) {
            this.mb.getAddress(this.circle).subscribe(geoResult => {
                this.circle.address = geoResult.results
                    ? geoResult.results[0].formatted_address
                    : '';
                this.circleChanged.emit(this.circle);
            });
        }
    }

    centerChanged(event: Circle) {
        // console.log(event);

        this.circle.lat = event.lat;
        this.circle.lng = event.lng;
        this.validateAndEmitCircle();
    }
    private mapResultToMarker(v: Geocode, i: number): Marker {
        const mar: Marker = new Marker();

        mar.lat = v.results[0].geometry.location.lat;
        mar.lng = v.results[0].geometry.location.lng;
        mar.des = this.data[i].discription;

        mar.title = this.data[i].title;
        mar.imagesUrl = this.data[i].images;
        mar.date = this.data[i].date;
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
