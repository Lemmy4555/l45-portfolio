const browserSync = require('browser-sync')
const configFactory = require('./config')

const Log = require('../../Log')
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
    if(/^.+(\.js|\.js\.map|\.html)$/g.test(file)) {
      console.info(log.message('Reloading page...'))
      browser.reload()
    } else {
      console.info(log.message(`Reloading file ${file}`))
      browser.reload(file)
    }
  }, 1000)
}

module.exports = server
