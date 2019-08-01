export interface AbstractBurly extends Object {
    [key: string]: string | any;

    query: { [key: string]: string };
    search: string;
    pathname: string;
    getParsedQuery: any;


    addParam<T extends AbstractBurly>(key: any, value: any, strict?: boolean): any
    addSegment<T extends AbstractBurly>(segment: string): any
    addPrefix<T extends AbstractBurly>(prefix: string): any
    addQuery<T extends AbstractBurly>(key: any, value?: any): any

    useTemplate<T extends AbstractBurly>(templateFragment: string): any
    get: string

    readonly name: string;
}

export interface BurlyInstance extends Object {
    [key: string]: string | any;

    query: { [key: string]: string };
    search: string;
    pathname: string;
    getParsedQuery: any;

    addParam<T extends AbstractBurly>(key: any, value: any, strict?: boolean): BurlyInstance
    addSegment<T extends AbstractBurly>(segment: string): BurlyInstance
    addPrefix<T extends AbstractBurly>(prefix: string): BurlyInstance
    addQuery<T extends AbstractBurly>(key: any, value?: any): BurlyInstance

    useTemplate<T extends AbstractBurly>(templateFragment: string): BurlyInstance
    get: string

    readonly name: string
}
