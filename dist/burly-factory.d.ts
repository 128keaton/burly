import { BurlyInstance } from "./burly";
declare module 'url' {
    interface URL {
        [key: string]: string | any;
    }
}
interface Burly extends BurlyInstance {
}
export declare function Burly(any?: any): Burly;
export {};
