const cfg = require('./config').get(process.env.node_env)

const conf = {}
conf.projectName = cfg.node_name // project name

// Enable appLog
conf.log = {}
conf.log.time = cfg.log.applog.rotation_time // Minute
conf.log.path = cfg.log.applog.path // path file
conf.log.level = cfg.log.applog.level // debug,info,warn,error
conf.log.console = cfg.log.applog.console
conf.log.file = cfg.log.applog.file

// Enable summaryLog
conf.summary = {}
conf.summary.time = cfg.log.summary.rotation_time
conf.summary.path = cfg.log.summary.path
conf.summary.console = cfg.log.summary.console
conf.summary.file = cfg.log.summary.file

// Enable detail
conf.detail = {}
conf.detail.time = cfg.log.detail.rotation_time
conf.detail.path = cfg.log.detail.path
conf.detail.console = cfg.log.detail.console
conf.detail.file = cfg.log.detail.file

// Enable stat
conf.stat = {}
conf.stat.time = cfg.log.stat.rotation_time
conf.stat.path = cfg.log.stat.path // , folder path DB
conf.stat.mode = cfg.log.stat.mode // 0 == file, 1== :memory:
conf.stat.pathDB = undefined // optional, folder path DB
conf.stat.statInterval = cfg.log.stat.statInterval
conf.stat.console = cfg.log.stat.console
conf.stat.file = cfg.log.stat.file

exports.conf = conf
