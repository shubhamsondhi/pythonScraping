// just an interface for type safety.
export class Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    des?: string;
    url: string;
    title?: string;
    imagesUrl?: string[][];
    price?: string;
    date?: string;
    address?: string;
}
