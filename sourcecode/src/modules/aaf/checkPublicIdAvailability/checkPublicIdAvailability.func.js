// const kafka = require('../../services/kafka-service-produce')
// const httpService = require('../../services/httpService')
const mongoModel = require('../../models')

// exports.fetchMessages = async function (dat, appLog, detail, summary) {
//   const mFetchMessages = await kafka.KafkaServiceConsumer(dat, appLog, detail, summary)
//   return mFetchMessages
// }

// exports.findSubscriber = async function (dat, appLog, detail, summary) {
//   const findDoc = await mongoModel.subscribe.find(dat)
//   return findDoc
// }

// exports.updateSubscriber = async function (schema, dat, appLog, detail, summary) {
//   appLog.debug('schema:', schema)
//   let resSubUpdate = await mongoModel.subscribe.updateOne(schema, dat)
//   return resSubUpdate
// }
