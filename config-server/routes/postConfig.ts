import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify'

interface PostConfigRouteBody {
  scene: string
  config: object
}

const postConfigRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  const configsDirectory = process.env.CONFIGS_DIRECTORY || '/var/www/configs'

  if (!existsSync(configsDirectory)) {
    mkdirSync(configsDirectory, { recursive: true })
  }

  fastify.route<{ Body: PostConfigRouteBody }>({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        properties: {
          scene: { type: 'string' },
          config: { type: 'object' },
        },
        required: ['scene', 'config'],
      },
    },
    handler: async (
      request: FastifyRequest<{ Body: PostConfigRouteBody }>,
      reply: FastifyReply,
    ) => {
      try {
        const { scene, config } = request.body

        const fileName = join(configsDirectory, `${scene}.json`)
        const configAsString = JSON.stringify(config, null, 2)

        writeFileSync(fileName, configAsString)

        reply.send({
          message: `Streamer config for scene ${scene} successfully stored in config server.`,
          data: configAsString,
        })
      } catch {
        reply.status(500).send({ error: 'An unknown error occurred' })
      }
    },
  })
}

export default postConfigRoute
