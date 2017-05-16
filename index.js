const redisUrl = process.env.REDIS_URL

const seneca = require('seneca')({
  transport: {
    redis: {
      url: redisUrl
    }
  }
})

const port = process.env.PORT || 8080

function hi(options) {
  this.add({role: "salutation", cmd: "hi"}, (message, reply) => {
    reply(null, {answer: "Hi!..."})
  })
}

seneca
.use(hi)
.use('redis-transport')
.use('mesh', {
  isbase: true,
  pin: 'role:salutation,cmd:hi',
  type: 'redis'
})
.listen({
  port: port
})
//  host: '0.0.0.0',
console.info(`🌍 service is listening on ${port}`)
