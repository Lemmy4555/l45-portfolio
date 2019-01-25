module.exports = class Log {
  constructor(name) {
    this.name = name
  }

  message(message) {
    return `[${this.name}] ${message}`
  }
}