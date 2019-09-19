var async = require('async')
const Kafka = require('kafka-node')

var consumerOptions = {
  kafkaHost: '25.11.124.188:9092',
  groupId: 'ExampleTestGroup',
  sessionTimeout: 15000,
  protocol: ['roundrobin'],
  fromOffset: 'latest' // equivalent of auto.offset.reset valid values are 'none', 'latest', 'earliest'
}

var topics = ['broadcast-int', 'broadcast-ext']

var client = new Kafka.KafkaClient({
  kafkaHost: '25.11.124.188:9092',
  autoConnect: true,
  connectTimeout: 1000,
  requestTimeout: 3000,
  maxAsyncRequests: 20
  // connectRetryOptions: {
  //   retries: 10,
  //   factor: 1
  // minTimeout: number,
  // maxTimeout: number,
  // randomize: boolean
  // }
})

var consumerGroup = new Kafka.ConsumerGroup(Object.assign({ id: 'test-consumer' }, consumerOptions), topics)

consumerGroup.on('error', onError)

consumerGroup.on('message', onMessage)

function onError (error) {
  consumerGroup.client.close(() => {
    console.error('close ==> ')
  })
  console.error('error ==> ' + error)
  console.error('error stack ==> ' + error.stack)
}

function onMessage (message) {
  console.log(
    '%s read msg Topic="%s" Partition=%s Offset=%d value=%s',
    this.client.clientId,
    message.topic,
    message.partition,
    message.offset,
    message.value
  )
}

client.on('error', () => {
  console.error('kafka client => error')
})

client.on('reconnect', () => {
  console.log('kafka client => reconnect to ' + consumerOptions.kafkaHost)
})

client.once('connect', () => {
  console.log('kafka client => connect to ' + consumerOptions.kafkaHost)
})

client.on('ready', () => {
  console.log('kafka consumer => connect success')
})

process.once('SIGINT', function () {
  async.each([consumerGroup], function (consumer, callback) {
    consumer.close(true, callback)
  })
})
