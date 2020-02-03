import { Injectable } from '@angular/core';
import { ErrorHandle } from './errorHandle';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SharedService extends ErrorHandle {
    constructor() {
        super();
    }
    apiKey = 'AIzaSyArew2eZn1_SdNAQhLWU1Sjs5jQYWmptMA';
    pyScraping = environment.url;
    geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode';

}
