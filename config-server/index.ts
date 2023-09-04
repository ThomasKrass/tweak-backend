import CORS from '@fastify/cors'
import DotEnv from 'dotenv'
import Fastify from 'fastify'

import routes from './routes'

DotEnv.config({
  path: `.env${process.env.NODE_ENV === 'development' ? '.local' : ''}`,
})

const server = Fastify({
  logger: true,
})

const port = Number(process.env.PORT) || 80

// Register plugins and routes
server.register(CORS, {
  origin: true,
  methods: ['GET', 'POST', 'DELETE'],
})

server.register(routes)

server.listen({ port, host: '0.0.0.0' }, (error, address) => {
  if (error) {
    server.log.error(error)
    process.exit(1)
  }

  server.log.info(`config-server is now listening on ${address}...`)
})
