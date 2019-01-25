const variables = require('@gulp-compile/globals')
const Log = require('@gulp-compile/Log')
const log = new Log('print-config')

confLog = () =>
`
===============================================
Compile configuration:

${JSON.stringify(variables.config, null, 2)}

===============================================
`

module.exports = () => {
  console.info(log.message(confLog()))
  
  return Promise.resolve()
}
