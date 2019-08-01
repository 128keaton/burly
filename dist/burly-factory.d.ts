import { Burly } from "./burly";
declare module 'url' {
    interface URL {
        [key: string]: string | any;
    }
}
export declare function BurlyFactory(any: any): Burly;
