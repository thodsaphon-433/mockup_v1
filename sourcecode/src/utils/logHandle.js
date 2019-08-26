const logg = require('commonlog-kb')

module.exports = (session) => {
  const l = {
    debug: (...msg) => {
      logg.debug(session, ...msg)
    },
    info: (...msg) => {
      logg.info(session, ...msg)
    },
    error: (...msg) => {
      logg.error(session, ...msg)
    },
    warn: (...msg) => {
      logg.warn(session, ...msg)
    },
    stat: (...msg) => {
      logg.stat(...msg)
    }
  }
  return l
}
