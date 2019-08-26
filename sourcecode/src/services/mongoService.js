const mongoose = require('mongoose')
const genUtil = require('../utils/genUtil')
const stat = require('../constants/stat.const')

module.exports = {
  findOne: findOne,
  insertOne: insertOne,
  updateOne: updateOne,
  findOneAndUpdate: findOneAndUpdate
}

async function findOne (col, schema, opt, appLog, detail) {
  appLog.info('findOne mongo...')
  let trancLog = ''
  const xTid = genUtil.genTid()

  mongoose.set('debug', function (coll, method, query, doc, options) {
    trancLog = 'CALL_SERVICE|_TO=MONGO __COMMAND=' + opt.cmd +
              ' __QUERY=' + `${coll}.${method}(${JSON.stringify(query)})` +
              ' __RESPBODY='

    detail.addOutputRequest(opt.desNode, opt.cmd, xTid, null, {
      Query: `${coll}.${method}(${JSON.stringify(query)})`
    }, opt.desNode)
    detail.end()
  })

  if (mongoose.connection.readyState !== 1) {
    appLog.debug('connection mongo lost.')

    const error = new Error()
    error.code = 'mongo_error'
    error.desNode = opt.desNode
    error.cmd = opt.cmd

    detail.addInputResponse(opt.desNode, opt.cmd, xTid, JSON.stringify(null), {
      Body: null
    })

    throw error
  }
  appLog.debug('mongo connected.')

  appLog.stat(stat.sentReq(opt.desNode, opt.cmd))
  const doc = await col.findOne(schema)

  detail.addInputResponse(opt.desNode, opt.cmd, xTid, JSON.stringify(doc), {
    Body: doc
  })

  appLog.debug(trancLog + JSON.stringify(doc))

  return doc
}

async function insertOne (col, schema, opt, appLog, detail) {
  appLog.info('insertOne mongo...')
  let trancLog = ''
  const xTid = genUtil.genTid()

  mongoose.set('debug', function (coll, method, query, doc, options) {
    trancLog = 'CALL_SERVICE|_TO=MONGO __COMMAND=' + opt.cmd +
              ' __QUERY=' + `${coll}.${method}(${JSON.stringify(query)})` +
              ' __RESPBODY='

    detail.addOutputRequest(opt.desNode, opt.cmd, xTid, null, {
      Query: `${coll}.${method}(${JSON.stringify(query)})`
    }, opt.desNode)
    detail.end()
  })

  if (mongoose.connection.readyState !== 1) {
    appLog.debug('connection mongo lost.')

    const error = new Error()
    error.code = 'mongo_connection_error'
    error.desNode = opt.desNode
    error.cmd = opt.cmd

    detail.addInputResponse(opt.desNode, opt.cmd, xTid, JSON.stringify(null), {
      Body: null
    })

    throw error
  }
  appLog.debug('mongo connected.')

  appLog.stat(stat.sentReq(opt.desNode, opt.cmd))

  let doc
  try {
    doc = await col.create(schema)
  } catch (error) {
    const err = new Error()
    err.code = 'mongo_error'
    err.message = error.message
    err.desNode = opt.desNode
    err.cmd = opt.cmd

    throw err
  }
  

  detail.addInputResponse(opt.desNode, opt.cmd, xTid, JSON.stringify(doc) || null, {
    Body: doc
  })

  appLog.debug(trancLog + JSON.stringify(doc))

  return doc
}

async function updateOne (col, schema, dat, opt, appLog, detail) {
  appLog.info('updateOne mongo...')
  let trancLog = ''
  const xTid = genUtil.genTid()

  mongoose.set('debug', function (coll, method, query, doc, options) {
    trancLog = 'CALL_SERVICE|_TO=MONGO' +
              '__COMMAND=' + opt.cmd +
              '__QUERY=' + `${coll}.${method}(${JSON.stringify(query)})` +
              '__RESPBODY='

    detail.addOutputRequest(opt.desNode, opt.cmd, xTid, null, {
      Query: `${coll}.${method}(${JSON.stringify(query)})`
    }, opt.desNode)
    detail.end()
  })

  if (mongoose.connection.readyState !== 1) {
    appLog.debug('connection mongo lost.')

    const error = new Error()
    error.code = 'mongo_error'
    error.desNode = opt.desNode
    error.cmd = opt.cmd

    detail.addInputResponse(opt.desNode, opt.cmd, xTid, JSON.stringify(null), {
      Body: null
    })

    throw error
  }
  appLog.debug('mongo connected.')

  appLog.stat(stat.sentReq(opt.desNode, opt.cmd))
  const doc = await col.updateOne(schema, dat)

  detail.addInputResponse(opt.desNode, opt.cmd, xTid, JSON.stringify(doc), {
    Body: doc
  })

  appLog.debug(trancLog + JSON.stringify(doc))

  return doc
}

async function findOneAndUpdate (col, schema, dat, opt, appLog, detail) {
  appLog.info('findOneAndUpdate mongo...')
  let trancLog = ''
  const xTid = genUtil.genTid()

  mongoose.set('debug', function (coll, method, query, doc, options) {
    trancLog = 'CALL_SERVICE|_TO=MONGO' +
              '__COMMAND=' + opt.cmd +
              '__QUERY=' + `${coll}.${method}(${JSON.stringify(query)})` +
              '__RESPBODY='

    detail.addOutputRequest(opt.desNode, opt.cmd, xTid, null, {
      Query: `${coll}.${method}(${JSON.stringify(query)})`
    }, opt.desNode)
    detail.end()
  })

  if (mongoose.connection.readyState !== 1) {
    appLog.debug('connection mongo lost.')

    const error = new Error()
    error.code = 'mongo_error'
    error.desNode = opt.desNode
    error.cmd = opt.cmd

    detail.addInputResponse(opt.desNode, opt.cmd, xTid, JSON.stringify(null), {
      Body: null
    })

    throw error
  }
  appLog.debug('mongo connected.')

  appLog.stat(stat.sentReq(opt.desNode, opt.cmd))
  const doc = await col.findOneAndUpdate(schema, dat, { new: true })

  detail.addInputResponse(opt.desNode, opt.cmd, xTid, JSON.stringify(doc), {
    Body: doc
  })

  appLog.debug(trancLog + JSON.stringify(doc))

  return doc
}
