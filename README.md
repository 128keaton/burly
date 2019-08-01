<p align="center">
  <img src="https://images.128keaton.com/burly.png" alt="Burly">
  <br>
  <a href="https://coveralls.io/github/128keaton/burly?branch=master">
    <img src="https://coveralls.io/repos/github/128keaton/burly/badge.svg?branch=master" alt="Coverage">
  </a>
  
  <a href="https://travis-ci.com/128keaton/burly">
    <img src="https://travis-ci.com/128keaton/burly.svg?branch=master" alt="Travis">
  </a>

  <p align="center">A simple Typescript URL builder<p>
</p>

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
