export interface AbstractBurly {
    [key: string]: string | any;
    addParam<T extends AbstractBurly>(key: any, value: any, strict?: boolean): any;
    addSegment<T extends AbstractBurly>(segment: string): any;
    addPrefix<T extends AbstractBurly>(prefix: string): any;
    useTemplate<T extends AbstractBurly>(templateFragment: string): any;
    get(): string;
}
export interface Burly {
    [key: string]: string | any;
    addParam<T extends AbstractBurly>(key: any, value: any, strict?: boolean): Burly;
    addSegment<T extends AbstractBurly>(segment: string): Burly;
    addPrefix<T extends AbstractBurly>(prefix: string): Burly;
    useTemplate<T extends AbstractBurly>(templateFragment: string): Burly;
    get(): string;
}
