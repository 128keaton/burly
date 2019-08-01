"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs = __importStar(require("qs"));
var BaseURL = __importStar(require("url"));
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
        BurlyClass.prototype.useTemplate = function (templateFragment) {
            this.pathname = this._prefix + encodeURI(templateFragment);
            return this;
        };
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
        BurlyClass.prototype.addPrefix = function (prefix) {
            var safePath = this.pathname.substr(this._prefix.length);
            this._prefix = this._prefix + encodeURI(prefix);
            this.pathname = this._prefix + safePath;
            return this;
        };
        BurlyClass.prototype.addSegment = function (segment) {
            this.pathname = this.pathname + encodeURI(segment);
            return this;
        };
        BurlyClass.prototype.addQuery = function (key, value) {
            this._query(key, value);
            return this;
        };
        Object.defineProperty(BurlyClass.prototype, "get", {
            get: function () {
                return BaseURL.format(this);
            },
            enumerable: true,
            configurable: true
        });
        BurlyClass.prototype.fromString = function (baseURL) {
            var parsedURL = BaseURL.parse(baseURL);
            this.assignFields(parsedURL);
            this._prefix = this.pathname;
            if (this._prefix === '/') {
                this._prefix = '';
                this.pathname = '';
            }
            if (this.search.length > 1) {
                this.addQuery(qs.parse(this.search.substring(1)));
            }
        };
        BurlyClass.prototype.fromInstance = function (instance) {
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
            var addSingleParameter = function (key, value) {
                if (value !== null && value !== undefined) {
                    query[key] = value;
                }
            };
            return function (key, value) {
                if (!value && typeof key === 'object') {
                    addMultipleParameters(key);
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
