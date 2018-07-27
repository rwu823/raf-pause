import rafPause from './'

describe('Test `rafPause` Spec', () => {
  it('should be pause 300 ms', (done) => {
    const start = Date.now()

    const run = rafPause(() => {
      expect(Date.now() - start).toBeGreaterThan(300)
      done()
    }, 300)

    run.start()
  })

  it('test clean running', (done) => {
    let mock = null

    const run = rafPause(() => {
      mock = 1
    }, 100)

    run.start()
    run.clean()

    setTimeout(() => {
      expect(mock).toBeNull()
      done()
    }, 300)
  })
})
