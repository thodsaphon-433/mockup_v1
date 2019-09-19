/* ------------- [START SERVER CONFIG VARIABLES] ------------ */
var config = {
  development: {
    node_name: 'MOCKUP_AEMF',
    app_host: '0.0.0.0',
    app_port: '8989',
    use_https: false,
    key: 'key1.pem',
    cert: 'cert1.pem',
    broadcast: 'internal',
    service: {
      mongo: {
        default: {
          conn_type: 'mongodb',
          url: '127.0.0.1:27017',
          dbname: 'aemf'
        }
      },
      callAPIOut: {
        default: {
          max_retry: 3,
          timeout: 2,
          retry_condition: 'TIMEOUT'
        },
        a: {
          max_retry: 3,
          timeout: 2,
          retry_condition: 'TIMEOUT'
        }
      },
      deliveryStatus: {
        default: {
          max_retry: 3,
          timeout: 2,
          retry_condition: 'TIMEOUT'
        }
      }
    },
    log: {
      applog: {
        path: './logs/appLog/',
        level: 'debug',
        console: true,
        file: false,
        rotation_time: 60
      },
      summary: {
        path: './logs/summary/',
        console: false,
        file: false,
        rotation_time: 60
      },
      detail: {
        path: './logs/detail/',
        console: false,
        file: false,
        rotation_time: 60
      },
      stat: {
        path: './logs/stat/',
        console: true,
        file: false,
        rotation_time: 60,
        statInterval: 1,
        mode: 0
      }
    }
  }
}
/* ------------- [END SERVER CONFIG VARIABLES] ------------ */

/* ------------- [START SERVER GET FUNTION] ------------ */
exports.get = function get (env) {
  var cfg = config[env] || config.development
  cfg.app_host = process.env.app_host || cfg.app_host
  cfg.node_name = process.env.node_name || cfg.node_name
  cfg.app_port = process.env.app_port || cfg.app_port
  cfg.use_https = process.env.use_https || cfg.use_https
  cfg.key = process.env.key || cfg.key
  cfg.cert = process.env.cert || cfg.cert
  cfg.rdr_social = process.env.rdr_social || cfg.rdr_social
  // cfg.http_req_timeout = process.env.http_req_timeout || cfg.http_req_timeout
  // cfg.maxretry = process.env.maxretry || cfg.maxretry
  cfg.session = process.env.session || cfg.session
  cfg.jwt_expire = process.env.jwt_expire || cfg.jwt_expire
  cfg.tmp_path = process.env.TMP_PATH || cfg.tmp_path
  var envService = null
  var envLog = null
  try {
    if (process.env.service && process.env.service.length > 0) {
      envLog = JSON.parse(process.env.log)
      envService = JSON.parse(process.env.service)
    }
  } catch (error) {
    envService = null
  }
  cfg.log = envLog !== null ? envLog : cfg.log
  cfg.service = envService !== null ? envService : cfg.service
  // console.log('cfg.service: ', cfg.service)
  return cfg
}
/* ------------- [END SERVER GET FUNTION] ------------ */
