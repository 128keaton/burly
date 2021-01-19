import {BurlyInstance, Burly} from "../src/burly";

const testURL = 'http://test.com/test';
const templateFragment = '/template-fragment';

let emptyBuilder: BurlyInstance;
let emptyBuilderWithTemplate: BurlyInstance;

class BadClass {}

beforeEach(() => {
    emptyBuilder = Burly();
    emptyBuilderWithTemplate = Burly().useTemplate(templateFragment);
});

test('#simple', () => {
    const testBuilder = Burly(testURL);
    expect(Burly).toBeInstanceOf(Function);

    expect(testBuilder.name).toEqual('Burly');
    expect(testBuilder.get).toEqual(testURL);
});

test('#no-base-url', () => {
    const emptyBuilder = Burly();
    expect(emptyBuilder.get).toEqual('');
});

test('#empty-add-prefix', () => {
    expect(emptyBuilder.addPrefix('/test').get).toEqual('/test');
});

test('#template-no-params', () => {
    expect(emptyBuilderWithTemplate.useTemplate(templateFragment).get).toEqual(templateFragment);
});

test('#template-no-params-add-prefix', () => {
    const prefix = '/test-prefix';
    const toAddPrefix = emptyBuilderWithTemplate.useTemplate(templateFragment).addPrefix(prefix);

    expect(toAddPrefix.get).toEqual(prefix + templateFragment);
});


test('#template-no-params-add-param', () => {
    const paramKey = 'key';
    const paramVal = 'value';
    const toAddParam = emptyBuilderWithTemplate.useTemplate(templateFragment).addParam(paramKey, paramVal);

    expect(toAddParam.get).toEqual(`${templateFragment}?${paramKey}=${paramVal}`);
});

it('#test-param-no-query', function () {
    expect(emptyBuilderWithTemplate.addParam('a', 'bc', true).get).toEqual(templateFragment);
});

it('#test-param-add-query', function () {
    const paramKey = 'key';
    const paramVal = 5678;
    expect(emptyBuilderWithTemplate.addParam(paramKey, paramVal).get).toEqual(`${templateFragment}?${paramKey}=${paramVal}`);
});

it('#test-query-null', function () {
    const paramKey = 'key';
    const paramVal = null;
    expect(emptyBuilderWithTemplate.addQuery(paramKey, paramVal).get).toEqual(templateFragment);
});

it('#test-query-null-object', function () {
    const paramKey = 'key1';
    const paramVal = 'not-null';
    emptyBuilderWithTemplate.addQuery({
        key1: paramVal,
        key2: null
    });

    expect(emptyBuilderWithTemplate.addQuery(paramKey, paramVal).get).toEqual(`${templateFragment}?${paramKey}=${paramVal}`);
});

it('#test-create-instance', function () {
    const paramKey = 'key1';
    const paramVal = 'not-null';
    emptyBuilderWithTemplate.addQuery({
        key1: paramVal,
        key2: null
    });

    const newBuilder = Burly(emptyBuilderWithTemplate);
    expect(newBuilder.get).toEqual(`${templateFragment}?${paramKey}=${paramVal}`);
});

it('#test-create-instance-invalid', function () {
    const badInstance = () => {
       return  Burly(new BadClass())
    };

    expect(badInstance).toThrow(TypeError)
});

it('#test-param-object', function () {
    const firstParamKey = 'key1';
    const secondParamKey = 'key2';

    const firstParamVal = 'val1';
    const secondParamVal = 'val2';

    emptyBuilderWithTemplate.addParam({
        key1: firstParamVal,
        key2: secondParamVal
    });

    expect(emptyBuilderWithTemplate.get).toEqual(`${templateFragment}?${firstParamKey}=${firstParamVal}&${secondParamKey}=${secondParamVal}`);
});


it('#test-param-string', function () {
    const paramKey = 'key1';
    const paramVal = 'val1';

    emptyBuilderWithTemplate.addParam(paramKey, paramVal);

    expect(emptyBuilderWithTemplate.get).toEqual(`${templateFragment}?${paramKey}=${paramVal}`);
});

it('#test-prefix', function () {
    expect(Burly('/').get).toEqual('');
});

it('#test-search', function () {
    expect(Burly(testURL + '?search').get).toEqual(testURL + '?search');
});

it('#test-add-segment', function () {
    const segment = '/test';
    expect(emptyBuilderWithTemplate.useTemplate(testURL).addSegment(segment).get).toEqual(testURL + segment);
});

it('#test-add-nested-query', function () {
    const object: {[key: string]: any } = {
        yes: 'no',
        maybe: '/test/',
        cool: 1234,
        bad: null,
        realBad: undefined
    };

    let queryURL = '';
    const queryKey = 'where';
    const queryURLHash: string[] = [];

    Object.keys(object).forEach(hashKey => {
        if (object[hashKey] !== undefined && object[hashKey] !== null) {
            if (typeof object[hashKey] === 'string' && !object[hashKey].includes('/\'')) {
                queryURLHash.push(`${hashKey}='${object[hashKey]}'`)
            } else {
                queryURLHash.push(`${hashKey}=${object[hashKey]}`)
            }
        }
    });

    if (queryURLHash.length > 0) {
        queryURL = queryKey + '=' + encodeURIComponent(`${queryURLHash.join('&')}`).replace(/'/g, '%27');
    }

    let result = emptyBuilderWithTemplate.useTemplate(testURL).addQuery(queryKey, object).get

    console.log('Result:', result);
    expect(result).toEqual(testURL + '?' + queryURL);
});

it('#test-add-empty-nested-query', function () {
    const object: {[key: string]: any } = {
        bad: null,
        realBad: undefined
    };

    const queryKey = 'where';
    expect(emptyBuilderWithTemplate.useTemplate(testURL).addQuery(queryKey, object).get).toEqual(testURL);
});

it('#test-add-raw-query-string', function () {
    const rawQueryString = 'limit=50&page=0';
    const finalURL = `${testURL}?${rawQueryString}`;
    const builtURL = emptyBuilderWithTemplate.useTemplate(testURL).appendRawQueryString(rawQueryString).get;

    console.log('Result:', builtURL, '===', finalURL);

    expect(builtURL).toEqual(finalURL);
});

it('#test-add-raw-query-string-null', function () {
    const rawQueryString = null;
    const finalURL = `${testURL}`;
    const builtURL = emptyBuilderWithTemplate.useTemplate(testURL).appendRawQueryString(rawQueryString).get;

    console.log('Result:', builtURL, '===', finalURL);

    expect(builtURL).toEqual(finalURL);
});

