"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var qs = __importStar(require("qs"));
function BurlyFactory(any) {
    var BurlyClass = /** @class */ (function () {
        function BurlyClass(_any) {
            this._prefix = '';
            this.search = '';
            this.pathname = '';
            if (_any instanceof String) {
                this.fromString(any.toString());
            }
            else if (_any instanceof BurlyClass) {
                this.fromInstance(any);
            }
        }
        BurlyClass.prototype.fromString = function (baseURL) {
            var parsedURL = url_1.parse(baseURL);
            this.assignFields(parsedURL);
            this._prefix = this.pathname;
            if (this._prefix === '/') {
                this._prefix = '';
                this.pathname = '';
            }
            if (this.search.length > 1) {
                qs.parse(this.search.substring(1));
            }
        };
        BurlyClass.prototype.fromInstance = function (instance) {
            this._prefix = instance._prefix;
        };
        BurlyClass.prototype.useTemplate = function (templateFragment) {
            this.pathname = this._prefix + encodeURI(templateFragment);
            return this;
        };
        BurlyClass.prototype.addParam = function (key, value, strict) {
            if (typeof key === 'object') {
                return this.parseMultipleParameters(key, !!value);
            }
            else {
                var previousPathname = this.pathname;
                this.pathname = this.pathname.replace(":" + key, encodeURIComponent(value));
                if (!strict && this.pathname === previousPathname) {
                    // dunno yet
                    //   return chainable.query(key, value);
                }
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
        BurlyClass.prototype.get = function () {
            return url_1.format(this);
        };
        BurlyClass.prototype.parseMultipleParameters = function (fromObject, strict) {
            var _this = this;
            Object.keys(fromObject).forEach(function (key) {
                _this.addParam(key, fromObject[key], strict);
            });
            return this;
        };
        Object.defineProperty(BurlyClass, "_keepFields", {
            get: function () {
                return [
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
            },
            enumerable: true,
            configurable: true
        });
        BurlyClass.prototype.assignFields = function (fromURL) {
            var _this = this;
            BurlyClass._keepFields.forEach(function (field) {
                var urlValue = fromURL[field];
                if (!!urlValue && !!fromURL[field]) {
                    _this[field] = urlValue;
                }
            });
        };
        return BurlyClass;
    }());
    return new BurlyClass(any);
}
exports.BurlyFactory = BurlyFactory;
