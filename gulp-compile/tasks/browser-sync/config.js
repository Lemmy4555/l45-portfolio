const globals = require('../../globals')

module.exports = () => {
  return {
    cwd: globals.config.paths.cwd.absolute,
    ui: {
      port: 3001,
      weinre: {
        port: 8080
      }
    },
    files: false,
    watchEvents: ['change'],
    watchOptions: {
      ignoreInitial: true
    },
    server: globals.config.paths.dist.browser.absolute,
    proxy: false,
    port: globals.config.serverPort,
    path: globals.config.paths.dist.browser.absolute,
    serveStatic: [],
    ghostMode: {
      clicks: false,
      scroll: false,
      location: false,
      forms: {
        submit: false,
        inputs: false,
        toggles: false
      }
    },
    logLevel: 'info',
    logPrefix: 'Browsersync',
    logConnections: false,
    logFileChanges: true,
    logSnippet: true,
    rewriteRules: [],
    open: false,
    browser: 'default',
    cors: false,
    xip: false,
    hostnameSuffix: false,
    reloadOnRestart: false,
    notify: true,
    scrollProportionally: true,
    scrollThrottle: 0,
    scrollRestoreTechnique: 'window.name',
    scrollElements: [],
    scrollElementMapping: [],
    reloadDelay: 0,
    reloadDebounce: 0,
    reloadThrottle: 0,
    plugins: [],
    injectChanges: true,
    startPath: null,
    minify: true,
    host: null,
    localOnly: false,
    codeSync: true,
    timestamps: true,
    clientEvents: [],
    socket: {
      socketIoOptions: {
        log: false
      },
      socketIoClientConfig: {
        reconnectionAttempts: 50
      },
      path: '/browser-sync/socket.io',
      clientPath: '/browser-sync',
      namespace: '/browser-sync',
      clients: {
        heartbeatTimeout: 5000
      }
    },
    tagNames: {
      less: 'link',
      scss: 'link',
      css: 'link',
      jpg: 'img',
      jpeg: 'img',
      png: 'img',
      svg: 'img',
      gif: 'img',
      js: 'script'
    }
  }
}