const raf = window.requestAnimationFrame || window.setTimeout
const caf = window.cancelAnimationFrame || window.clearTimeout

interface RafPause {
  clean(): void;
  start(callback?: Function): void;
  loop(): void;
}

const rafPause = (func: Function, timeout = 0) => {
  let timer = 0

  const main: RafPause = {
    start: (cb) => {
      const start = new Date().getTime()

      const run = () => {
        if (Date.now() - start >= timeout) {
          timer = raf(async () => {
            await func()

            if (typeof cb === 'function') {
              cb()
            }
          })
        } else {
          timer = raf(run)
        }
      }

      run()
    },

    clean: () => {
      caf(timer)
    },

    loop() {
      this.start(() => this.loop())
    },
  }

  return main
}

export = rafPause
