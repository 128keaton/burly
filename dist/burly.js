"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Burly = void 0;
var querystring_1 = require("querystring");
var url_1 = require("url");
function Burly(any) {
    var BurlyClass = /** @class */ (function () {
        function BurlyClass(_any) {
            this.query = {};
            this.search = '';
            this.pathname = '';
            this.getParsedQuery = BurlyClass.clone.bind(null, this.query);
            this._query = this.addQueryParameters(this.query);
            this._prefix = '';
            this.name = 'Burly';
            if (!!_any) {
                if (typeof _any === 'string') {
                    this.fromString(any.toString());
                }
                else if (_any instanceof Object && _any.hasOwnProperty('name') && _any['name'] === 'Burly') {
                    this.fromInstance(any);
                }
                else {
                    throw new TypeError("Cannot create a new Burly class passing type " + typeof any);
                }
            }
        }
        BurlyClass.clone = function (obj) {
            return Object.assign({}, obj);
        };
        // @ts-ignore
        BurlyClass.prototype.useTemplate = function (templateFragment) {
            this.pathname = this._prefix + encodeURI(templateFragment);
            return this;
        };
        // @ts-ignore
        BurlyClass.prototype.addParam = function (key, value, strict) {
            if (typeof key === 'object') {
                return this.parseMultipleParameters(key, !!value);
            }
            var previousPathname = this.pathname;
            this.pathname = this.pathname.replace(":" + key, encodeURIComponent(value));
            if (!strict && this.pathname === previousPathname) {
                return this.addQuery(key, value);
            }
            return this;
        };
        // @ts-ignore
        BurlyClass.prototype.addPrefix = function (prefix) {
            var safePath = this.pathname.substr(this._prefix.length);
            this._prefix = this._prefix + encodeURI(prefix);
            this.pathname = this._prefix + safePath;
            return this;
        };
        // @ts-ignore
        BurlyClass.prototype.addSegment = function (segment) {
            this.pathname = this.pathname + encodeURI(segment);
            return this;
        };
        // @ts-ignore
        BurlyClass.prototype.addQuery = function (key, value, allowNull) {
            if (allowNull === void 0) { allowNull = true; }
            if (allowNull) {
                this._query(key, value);
            }
            else if (!allowNull && !!value) {
                this._query(key, value);
            }
            return this;
        };
        // @ts-ignore
        BurlyClass.prototype.appendRawQueryString = function (rawQueryString) {
            var _this = this;
            if (!!rawQueryString) {
                var queryStringSplit = rawQueryString.split('&').map(function (raw) { return raw.split("="); });
                queryStringSplit.forEach(function (rawAssignment) {
                    var key = rawAssignment[0];
                    var value = rawAssignment[1];
                    _this._query(key, value);
                });
            }
            return this;
        };
        Object.defineProperty(BurlyClass.prototype, "get", {
            get: function () {
                return url_1.format(this).replace(/'/g, '%27');
            },
            enumerable: false,
            configurable: true
        });
        BurlyClass.prototype.fromString = function (baseURL) {
            var parsedURL = url_1.parse(baseURL);
            this.assignFields(parsedURL);
            this._prefix = this.pathname;
            if (this._prefix === '/') {
                this._prefix = '';
                this.pathname = '';
            }
            if (this.search.length > 1) {
                this.addQuery(querystring_1.parse(this.search.substring(1)));
            }
        };
        BurlyClass.prototype.fromInstance = function (instance) {
            // @ts-ignore
            this.assignFields(instance);
            this._query(instance.getParsedQuery());
            this._prefix = instance._prefix;
        };
        BurlyClass.prototype.parseMultipleParameters = function (fromObject, strict) {
            var _this = this;
            Object.keys(fromObject).forEach(function (key) {
                _this.addParam(key, fromObject[key], strict);
            });
            return this;
        };
        BurlyClass.prototype.assignFields = function (fromURL) {
            var _this = this;
            BurlyClass._keepFields.forEach(function (field) {
                var urlValue = fromURL[field];
                if (!!urlValue && !!fromURL[field]) {
                    _this[field] = urlValue;
                }
            });
        };
        BurlyClass.prototype.addQueryParameters = function (query) {
            var _this = this;
            var addMultipleParameters = function (aHash) {
                Object.keys(aHash).forEach(function (key) {
                    if (aHash[key] === null || aHash[key] === undefined) {
                        delete aHash[key];
                    }
                    else {
                        query[key] = aHash[key];
                    }
                });
            };
            var addNestedParameters = function (key, aHash) {
                var nestedQueryParam = [];
                Object.keys(aHash).forEach(function (hashKey) {
                    if (aHash[hashKey] !== null && aHash[hashKey] !== undefined) {
                        if (typeof aHash[hashKey] === 'string' && !aHash[hashKey].includes('/\'')) {
                            nestedQueryParam.push(hashKey + "='" + aHash[hashKey] + "'");
                        }
                        else {
                            nestedQueryParam.push(hashKey + "=" + aHash[hashKey]);
                        }
                    }
                });
                if (nestedQueryParam.length > 0) {
                    query[key] = nestedQueryParam.join('&');
                }
            };
            var addSingleParameter = function (key, value) {
                if (value !== null && value !== undefined) {
                    query[key] = value;
                }
            };
            return function (key, value) {
                if (typeof key === 'object') {
                    addMultipleParameters(key);
                }
                else if (!!value && typeof value === 'object') {
                    addNestedParameters(key, value);
                }
                else {
                    addSingleParameter(key, value);
                }
                return _this;
            };
        };
        BurlyClass._keepFields = [
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
        return BurlyClass;
    }());
    return new BurlyClass(any);
}
exports.Burly = Burly;
