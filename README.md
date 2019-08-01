<center>
![Burly](https://images.128keaton.com/burly.png)


[![Coverage Status](https://coveralls.io/repos/github/128keaton/burly/badge.svg?branch=master)](https://coveralls.io/github/128keaton/burly?branch=master)
[![Build Status](https://travis-ci.com/128keaton/burly.svg?branch=master)](https://travis-ci.com/128keaton/burly)

A simple Typescript URL builder
</center>

## Installation

```sh
npm i --save kb-burly
```

## Usage
[![Edit gallant-hodgkin-t6lzw](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gallant-hodgkin-t6lzw?fontsize=14)
#### Basic Example:

```ts
const burly = Burly("https://api.com/find")
              .addParam("id", 1234)
              .get; // = https://api.com/find?id=1234
```

## Credits

_Based heavily on [url-assembler](https://github.com/Floby/node-url-assembler) by Florent Jaby_
