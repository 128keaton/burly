# burly
[![Coverage Status](https://coveralls.io/repos/github/128keaton/burly/badge.svg?branch=master)](https://coveralls.io/github/128keaton/burly?branch=master)
[![Build Status](https://travis-ci.com/128keaton/burly.svg?branch=master)](https://travis-ci.com/128keaton/burly)

A simple Typescript URL builder

## Installation

```sh
npm i --save burly
```

## Usage

#### Basic Example:

```ts
const burly = Burly('https://api.com/find?thing').addParam('id', 1234);            
```
