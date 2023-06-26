import DotEnv from 'dotenv'
import Fastify from 'fastify'
import FastifySocketIO from 'fastify-socket.io'

import routes from './routes'

DotEnv.config({
  path: `.env${process.env.NODE_ENV === 'development' ? '.local' : ''}`,
})

const server = Fastify({
  logger: true,
})

const port = Number(process.env.PORT) || 80

server.register(routes)
server.register(FastifySocketIO)

server.listen({ port, host: '0.0.0.0' }, (error, address) => {
  if (error) {
    server.log.error(error)
    process.exit(1)
  }

  server.log.info(`event-bridge is now listening on ${address}...`)
})

server.ready((error) => {
  if (error) throw error

  // Access Socket.io instance via 'server.io'
  server.io.on('connection', (socket) => {
    server.log.info('New client connected')

    socket.on('disconnect', () => {
      server.log.info('Client disconnected')
    })
  })
})
