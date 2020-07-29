/// <reference types="node" />
import { Url } from 'url';
export interface URL extends Url {
    [key: string]: string | any;
}
export declare interface BurlyInstance extends URL {
    [key: string]: string | any;
    query: {
        [key: string]: string;
    };
    search: string;
    pathname: string;
    getParsedQuery: any;
    addParam(key: any, value?: any, strict?: boolean): BurlyInstance;
    addSegment(segment: string): BurlyInstance;
    addPrefix(prefix: string): BurlyInstance;
    addQuery(key: any, value?: any): BurlyInstance;
    useTemplate(templateFragment: string): BurlyInstance;
    get: string;
    readonly name: string;
}
interface Burly extends BurlyInstance {
}
export declare function Burly(any?: any): Burly;
export {};
