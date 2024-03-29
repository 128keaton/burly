import {Url, format, parse} from 'url'

export interface URL extends Url {
    [key: string]: string | any;
}

export declare interface BurlyInstance extends URL {
    [key: string]: string | any;

    query: { [key: string]: string };
    search: string;
    pathname: string;
    getParsedQuery: any;

    addParam(key: any, value?: any, strict?: boolean): BurlyInstance

    addSegment(segment: string): BurlyInstance

    addPrefix(prefix: string): BurlyInstance

    addQuery(key: any, value?: any, allowNull?: boolean): BurlyInstance

    useTemplate(templateFragment: string): BurlyInstance

    appendRawQueryString(rawQueryString: string | null): BurlyInstance

    get: string

    readonly name: string
}


interface Burly extends BurlyInstance {
}

export function Burly(any?: any): Burly {
    interface BurlyInterface extends BurlyInstance {
        [key: string]: string | any;

        query: { [key: string]: string };
        search: string;
        pathname: string;
        getParsedQuery: any;

        addParam(key: any, value?: any, strict?: boolean): BurlyInstance

        addSegment(segment: string): BurlyInstance

        addPrefix(prefix: string): BurlyInstance

        addQuery(key: any, value?: any, allowNull?: boolean): BurlyInstance

        useTemplate(templateFragment: string): BurlyInstance

        appendRawQueryString(rawQueryString: string | null): BurlyInstance

        get: string

        readonly name: string
    }


    class BurlyClass implements BurlyInterface {
        [key: string]: string | any;

        public query: { [key: string]: string } = {};
        public search: string = '';
        public pathname: string = '';
        public getParsedQuery = BurlyClass.clone.bind(null, this.query);

        private _query = this.addQueryParameters(this.query);
        private _prefix: string = '';

        readonly name: string;

        constructor(_any?: any) {
            this.name = 'Burly';

            if (!!_any) {
                if (typeof _any === 'string') {
                    this.fromString(any.toString());
                } else if (_any instanceof Object && _any.hasOwnProperty('name') && _any['name'] === 'Burly') {
                    this.fromInstance(any);
                } else {
                    throw new TypeError(`Cannot create a new Burly class passing type ${typeof any}`);
                }
            }
        }

        private static _keepFields = [
            'protocol',
            'slashes',
            'auth',
            'host',
            'port',
            'hostname',
            'hash',
            'search',
            'pathname',
            'path',
            'href'
        ];

        private static clone(obj: any): any {
            return Object.assign({}, obj);
        }

        // @ts-ignore
        useTemplate(templateFragment: string): BurlyClass {
            this.pathname = this._prefix + encodeURI(templateFragment);
            return this;
        }

        // @ts-ignore
        addParam(key: any, value?: any, strict?: boolean): BurlyClass {
            if (typeof key === 'object') {
                return this.parseMultipleParameters(key, !!value);
            }

            const previousPathname = this.pathname;
            this.pathname = this.pathname.replace(`:${key}`, encodeURIComponent(value));

            if (!strict && this.pathname === previousPathname) {
                return this.addQuery(key, value);
            }

            return this;
        }

        // @ts-ignore
        addPrefix(prefix: string): BurlyClass {
            const safePath = this.pathname.substr(this._prefix.length);

            this._prefix = this._prefix + encodeURI(prefix);
            this.pathname = this._prefix + safePath;

            return this;
        }

        // @ts-ignore
        addSegment(segment: string): BurlyClass {
            this.pathname = this.pathname + encodeURI(segment);
            return this;
        }

        // @ts-ignore
        addQuery(key: any, value?: any, allowNull?: boolean = true): BurlyClass {
            if (allowNull) {
                this._query(key, value);
            } else if (!allowNull && !!value) {
                this._query(key, value);
            }
            return this;
        }

        // @ts-ignore
        appendRawQueryString(rawQueryString: string | null): BurlyClass {
            if (!!rawQueryString) {
                const queryStringSplit = rawQueryString.split('&').map(raw => raw.split("="))
                queryStringSplit.forEach(rawAssignment => {
                    const key = rawAssignment[0];
                    const value = rawAssignment[1];

                    this._query(key, value);
                })
            }

            return this;
        }

        get get(): string {
            return format(this).replace(/'/g, '%27');
        }

        private fromString(baseURL: string) {
            const parsedURL = (parse(baseURL) as unknown) as URL;
            this.assignFields(parsedURL);

            this._prefix = this.pathname;

            if (this._prefix === '/') {
                this._prefix = '';
                this.pathname = '';
            }

            if (this.search.length > 1) {
                const searchParams = new URLSearchParams(this.search.substring(1))

                this.addQuery(searchParams.toString());
            }
        }

        private fromInstance(instance: BurlyClass) {
            // @ts-ignore
            this.assignFields(instance);

            this._query(instance.getParsedQuery());
            this._prefix = instance._prefix;
        }

        private parseMultipleParameters(fromObject: { [key: string]: string }, strict: boolean): BurlyClass {
            Object.keys(fromObject).forEach(key => {
                this.addParam(key, fromObject[key], strict);
            });
            return this;
        }

        private assignFields(fromURL: URL | Burly) {
            BurlyClass._keepFields.forEach((field: string) => {
                const urlValue = fromURL[field];

                if (!!urlValue && !!fromURL[field]) {
                    this[field] = urlValue;
                }
            });
        }

        private addQueryParameters(query: { [key: string]: any }) {
            const addMultipleParameters = (aHash: { [key: string]: any }) => {
                Object.keys(aHash).forEach(key => {
                    if (aHash[key] === null || aHash[key] === undefined) {
                        delete aHash[key];
                    } else {
                        query[key] = aHash[key];
                    }
                });
            };

            const addNestedParameters = (key: string, aHash: { [key: string]: any }) => {
                const nestedQueryParam: string[] = [];
                Object.keys(aHash).forEach(hashKey => {
                    if (aHash[hashKey] !== null && aHash[hashKey] !== undefined) {
                        if (typeof aHash[hashKey] === 'string' && !aHash[hashKey].includes('/\'')) {
                            nestedQueryParam.push(`${hashKey}='${aHash[hashKey]}'`)
                        } else {
                            nestedQueryParam.push(`${hashKey}=${aHash[hashKey]}`)
                        }
                    }
                });

                if (nestedQueryParam.length > 0) {
                    query[key] = nestedQueryParam.join('&');
                }
            };

            const addSingleParameter = (key: string, value: any) => {
                if (value !== null && value !== undefined) {
                    query[key] = value;
                }
            };

            return (key: any, value?: any) => {
                if (typeof key === 'object') {
                    addMultipleParameters(key);
                } else if (!!value && typeof value === 'object') {
                    addNestedParameters(key, value);
                } else {
                    addSingleParameter(key, value)
                }
                return this;
            }
        }
    }

    return new BurlyClass(any) as unknown as Burly;
}
