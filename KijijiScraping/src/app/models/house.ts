export class House {
    url: string;
    price: string;
    address: string;
    discription: string;
    images: string[][];
    date: string;
    dataPosted: string;
    dataId: number;
    private _title: string;

    get title(): string {
        return this._title;
    }
    set title(value: string) {
        this._title = value.replace(/\u21b5| \s/g, '');
    }
}

// title.replace(/\u21b5| \s/g,"")
