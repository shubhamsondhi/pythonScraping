import { Circle } from './circle';

export class Url {
    baseUrl: string;
    category: string;
    city: SelectedCity;
    pageNumber = 1;
    urlcode: UrlCode;
    urlcodeInString: string;
    urlAddress: string;
    urlCircle: Circle;
    priceFilter: string;
}

class UrlCode {
    cityCode: string;
    categoryCode: string;
}
class SelectedCity {
    cityName: string;
    cityurl: string;
    citycode: string;
}
