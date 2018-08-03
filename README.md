<h1 align="center">
  <img src="./logo.png" width="300" />
</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/raf-pause">
    <img src="https://img.shields.io/npm/v/raf-pause.svg?style=flat-square&" />
  </a>
  <a href="https://circleci.com/gh/rwu823/raf-pause" alt="Build Status">
    <img src="https://circleci.com/gh/rwu823/raf-pause.svg" />
  </a>
  <a href="https://codecov.io/gh/rwu823/raf-pause" alt="Coverage">
    <img src="https://img.shields.io/codecov/c/github/rwu823/raf-pause/master.svg?style=flat-square&" />
  </a>
  <img src="https://img.shields.io/github/license/rwu823/raf-pause.svg?style=flat-square&" />
</p>


## Installation

```sh
$ npm i raf-pause
```

or

```sh
$ yard add raf-pause
```

## API

### start()
Start the timer.

### loop()
Loop the timer.

### clean()
Clean the timer.

## Recipes

```js
import rafPause from 'raf-pause'

const run = rafPause(() => {
  // do something
}, 500)
run.start()


const runAndLoop = rafPause(() => {
  // do something in loop
  runAndLoop.start()
}, 500)

runAndLoop.start()
```

### In React

```js
import rafPause from 'raf-pause'

componentDidMount() {
  this.countDown.start()
}

componentWillUnMount() {
  this.countDown.clean()
}

countDown = rafPause(() => {
  this.setState({
    ...
  }, this.countDown)
}, 1000)

```

## Fallback
It'll fallback to `setTimeout` if browsers don't support `requestAnimationFrame`
