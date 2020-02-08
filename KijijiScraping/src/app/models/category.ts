export class Category {
    _links: Links;
    level1: Level1;
    level3: Level3;
    level2: Level2;
}

interface Level2 {
    postValue: number;
    items: Item[];
}

interface Level3 {
    postValue?: any;
    items: Item[];
}

interface Level1 {
    postValue: number;
    items: Item[];
}

interface Item {
    categoryId: number;
    onHomepage: boolean;
    subTitle?: string;
    pseudoCategory: boolean;
    leaf: boolean;
    sortOrder: number;
    children: any[];
    newCategory: boolean;
    admarktCategory: boolean;
    name: string;
    url?: any;
}

interface Links {
    self: Self;
}

interface Self {
    href: string;
}
// https://www.kijiji.ca/j-select-category.json?t=1580450870373
export class CityNamesForOntario {























    names = [
{cityName: 'Barrie', cityurl: 'belleville-area', citycode: 'l1700129'},
{cityName: 'Belleville Area ', cityurl: 'belleville-area', citycode: 'l1700129'},
{cityName: 'Brantford',  cityurl: 'brantford', citycode: 'l1700206'},
{cityName: 'Brockville ', cityurl: 'brockville', citycode: 'l1700247'},
{cityName: 'Chatham-Kent ', cityurl: 'chatham-kent', citycode: 'l1700239'},
{cityName: 'Cornwall ', cityurl: 'cornwall-on', citycode: 'l1700133'},
{cityName: 'Guelph ', cityurl: 'guelph', citycode: 'l1700242'},
{cityName: 'Hamilton ', cityurl: 'hamilton', citycode: 'l80014'},
{cityName: 'Kapuskasing', cityurl: 'kapuskasing', citycode: 'l1700237'},
{cityName: 'Kenora ', cityurl: 'kenora', citycode: 'l1700249'},
{cityName: 'Kingston Area', cityurl: 'kingston-area', citycode: 'l1700181'},
{cityName: 'Kitchener Area', cityurl: 'kitchener-area', citycode: 'l1700209'},
{cityName: 'Leamington ', cityurl: 'leamington', citycode: 'l1700240'},
{cityName: 'London ', cityurl: 'london', citycode: 'l1700214'},
{cityName: 'Muskoka', cityurl: 'muskoka', citycode: 'l1700078'},
{cityName: 'Norfolk County', cityurl: 'norfolk-county', citycode: 'l1700248'},
{cityName: 'North Bay', cityurl: 'north-bay', citycode: 'l1700243'},
{cityName: 'Ottawa / Gatineau Area', cityurl: 'ottawa-gatineau-area', citycode: 'l1700184'},
{cityName: 'Owen Sound ', cityurl: 'owen-sound', citycode: 'l1700187'},
{cityName: 'Peterborough Area ', cityurl: 'peterborough-area', citycode: 'l1700217'},
{cityName: 'Renfrew County Area ', cityurl: 'renfrew-county-area', citycode: 'l1700074 '},
{cityName: 'Sarnia Area', cityurl: 'sarnia-area', citycode: 'l1700189'},
{cityName: 'Sault Ste. Marie', cityurl: 'sault-ste-marie', citycode: 'l1700244'},
{cityName: 'St. Catharines', cityurl: 'st-catharines', citycode: 'l80016'},
{cityName: 'Sudbury', cityurl: 'sudbury', citycode: 'l1700245'},
{cityName: 'Thunder Bay', cityurl: 'thunder-bay', citycode: 'l1700126'},
{cityName: 'Timmins', cityurl: 'timmins', citycode: 'l1700238'},
{cityName: 'Toronto', cityurl: 'gta-greater-toronto', citycode: 'l1700272'},
{cityName: 'Windsor Region', cityurl: 'windsor-area-on', citycode: 'l1700220'},
{cityName: 'Woodstock', cityurl: 'woodstock-on', citycode: 'l1700241'},
    ];
}
