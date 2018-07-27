const raf = window.requestAnimationFrame || window.setTimeout
const caf = window.cancelAnimationFrame || window.clearTimeout

interface RafPause {
  clean(): void;
  start(): void;
}

const rafPause = (func: Function, timeout = 0) => {
  let timer = 0

  const main: RafPause = {
    start: () => {
      const start = new Date().getTime()

      const run = () => {
        if (new Date().getTime() - start >= timeout) {
          timer = raf(() => func())
        } else {
          timer = raf(run)
        }
      }

      run()
    },

    clean: () => {
      caf(timer)
    },
  }

  return main
}

export default rafPause
