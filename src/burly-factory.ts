import {AbstractBurly, BurlyInstance} from "./burly";
import {URL, parse, format} from "url";
import * as qs from 'qs'

declare module 'url' {
    export interface URL {
        [key: string]: string | any;
    }
}

interface Burly extends BurlyInstance {
}

export function Burly(any?: any): Burly {
    class BurlyClass implements AbstractBurly {
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
                } else if (_any instanceof BurlyClass) {
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

        useTemplate<T extends AbstractBurly>(templateFragment: string): BurlyClass {
            this.pathname = this._prefix + encodeURI(templateFragment);
            return this;
        }

        addParam<T extends AbstractBurly>(key: any, value: any, strict?: boolean): BurlyClass {
            if (typeof key === 'object') {
                return this.parseMultipleParameters(key, !!value);
            } else {
                const previousPathname = this.pathname;
                this.pathname = this.pathname.replace(`:${key}`, encodeURIComponent(value));

                if (!strict && this.pathname === previousPathname) {
                    return this.addQuery(key, value);
                }
            }
            return this;
        }

        addPrefix<T extends AbstractBurly>(prefix: string): BurlyClass {
            const safePath = this.pathname.substr(this._prefix.length);

            this._prefix = this._prefix + encodeURI(prefix);
            this.pathname = this._prefix + safePath;

            return this;
        }

        addSegment<T extends AbstractBurly>(segment: string): BurlyClass {
            this.pathname = this.pathname + encodeURI(segment);
            return this;
        }

        addQuery<T extends AbstractBurly>(key: any, value?: any): BurlyClass {
            this._query(key, value);
            return this;
        }

        get get(): string {
            return format(this);
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
                qs.parse(this.search.substring(1))
            }
        }

        private fromInstance(instance: BurlyClass) {
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

            const addSingleParameter = (key: string, value: any) => {
                if (value !== null && value !== undefined) {
                    query[key] = value;
                }
            };

            return (key: any, value?: any) => {
                if (!value && typeof key === 'object') {
                    addMultipleParameters(key);
                } else {
                    addSingleParameter(key, value);
                }
                return this;
            }
        }
    }

    return new BurlyClass(any) as Burly;
}
