<p align="center">
  <img src="https://images.128keaton.com/burly.png" alt="Burly">
  <br>
  <a href="https://coveralls.io/github/128keaton/burly?branch=master">
    <img src="https://coveralls.io/repos/github/128keaton/burly/badge.svg?branch=master" alt="Coverage">
  </a>
  
  <a href="https://travis-ci.com/128keaton/burly">
    <img src="https://travis-ci.com/128keaton/burly.svg?branch=master" alt="Travis">
  </a>

  <a href="https://badge.fury.io/js/kb-burly">
    <img src="https://badge.fury.io/js/kb-burly.svg" alt="npm version" height="20">
  </a>
  
  <p align="center">A simple Typescript URL builder<p>
</p>

## Installation

```sh
npm i --save kb-burly
```

## Usage
[![Edit burly-examples-t6lzw](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/burly-examples-t6lzw)
#### Basic Example:

```ts
const burly = Burly("https://api.com/find")
              .addParam("id", 1234)
              .get; // = https://api.com/find?id=1234
```
#### Nested Example:

```ts
const object = {
  yes: 'no',
  maybe: '/test/',
  bad: null
}

const burly = Burly('http://test.com')
              .addQuery('where', object)
              .get; // = http://test.com?where=yes%3D%27no%27%26maybe%3D%27%2Ftest%2F%27
```
### Bad Parameter Example:
```ts
const burly = Burly("http://bad-param.blog")
              .addParam('bad', null)
              .get; // = http://bad-param.blog
```

## Credits

_Based heavily on [url-assembler](https://github.com/Floby/node-url-assembler) by Florent Jaby_
