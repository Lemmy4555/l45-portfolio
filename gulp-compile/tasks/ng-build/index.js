const spawn = require('child_process').spawn

const globals = require('../../globals')
const Log = require('../../Log')
const log = new Log('ng-build')

module.exports = (taskToRun, onCompile) => {
  let compileTimeout = null

  if (!taskToRun) {
    return Promise.reject("Non e stato specificato nessun task da buildare con ng")
  }

  return new Promise((resolve, reject) => {
    let params = ['run', taskToRun]
    if (globals.config.watch) {
      params.push('--watch')
    }
    if (globals.config.sourcemaps) {
      params.push('--source-map')
    }
    
    ngBuild = spawn('ng', params, { shell: true })

    ngBuild.stdout.on('data', (data) => {
      console.info(log.message(`(${taskToRun}) ${data.toString()}`))
      
      if (compileTimeout) {
        clearTimeout(compileTimeout)
        compileTimeout = null
      }

      if (onCompile) {
        compileTimeout = setTimeout(() => {
          onCompile()
        }, 1000)
      }
      
    })

    ngBuild.stderr.on('data', (data) => {
      console.error(log.message(`(${taskToRun}) ${data.toString()}`))
    })

    ngBuild.on('exit', function (code) {
      if (code === 0) {
        resolve()
      } else {
        const error = `exit con codice: ${code.toString()}`
        console.error(log.message(`(${taskToRun}) ${error}`))
        reject(error)
      }
    })
    
    if (globals.config.watch) {
      console.info(log.message("Build di Angular in background"))
      resolve()
    }
  })
}