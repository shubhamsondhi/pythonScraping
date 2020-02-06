import { Circle } from './circle';


class UrlCode {
    cityCode: string;
    categoryCode: string;
}
class SelectedCity {
    cityName: string;
    cityurl: string;
    citycode: string;
}
export class Url {
  constructor() {
      this.urlcode = new UrlCode();
      this.urlCircle = new Circle();
      this.city = new SelectedCity();


  }
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
