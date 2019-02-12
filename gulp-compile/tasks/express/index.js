const spawn = require('child_process').spawn

const globals = require('../../globals')
const Log = require('../../Log')
const log = new Log('express')

module.exports = () => {
  return new Promise((resolve, reject) => {
    let serverPath = `${globals.config.paths.dist.server.relative}/server.js`
    let params = [serverPath]
    
    ngBuild = spawn('node', params, { shell: true })

    ngBuild.stdout.on('data', (data) => {
      console.info(log.message(data.toString()))
    })

    ngBuild.stderr.on('data', (data) => {
      console.error(log.message(data.toString()))
    })

    ngBuild.on('exit', function (code) {
      if (code === 0) {
        resolve()
      } else {
        const error = `exit con codice: ${code.toString()}`
        console.error(log.message(error))
        reject(error)
      }
    })
  })
}