const redisUrl = process.env.REDIS_URL || "redis://:5G4sk77fpDzwgTOALAx@bfxadtj3b-redis.services.clever-cloud.com:3079"
const http = require('http')

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
  pin: 'role:salutation,cmd:hi'
})
.listen()

http.createServer((request, response) => {
  console.log(request.url)
  response.end('Hello!')
})
.listen(port, (err) => {
  console.info(`🌍 service is listening on ${port}`)
})
