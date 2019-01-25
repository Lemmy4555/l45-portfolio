const browserSync = require('browser-sync')
const configFactory = require('./config')

const Log = require('@gulp-compile/Log')
const log = new Log('browser-sync')

let reloadTimeout = null
let browser = null

const server = () => {
  return new Promise((resolve, reject) => {
    try {
      browser = browserSync.create()
      browser.init(configFactory(), (err) => {
        if (err) {
          console.error(log.message(err))
          reject(err)
        }
        resolve()
      })
      
      browser.watch('dist/**/*.*').on('change', (file) => reload(file))
      browser.watch('dist/index.html').on('change', () => reload())
      browser.watch('dist/**/*.js').on('change', () => reload())
      browser.watch('dist/**/*.js.map').on('change', () => reload())
    } catch (err) {
      console.error(log.message(err))
      reject(err)
    }
  })
}

const reload = (file) => {
  if (reloadTimeout) {
    clearTimeout(reloadTimeout)
    reloadTimeout = null
  }

  reloadTimeout = setTimeout(() => {
    browser.reload(file)
  }, 1000)
}

module.exports = server
