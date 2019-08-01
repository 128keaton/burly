import {Burly, BurlyInstance} from '../src/';

const testURL = 'http://test.com/test';
const templateFragment = '/template-fragment';

let emptyBuilder: BurlyInstance;
let emptyBuilderWithTemplate: BurlyInstance;

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
