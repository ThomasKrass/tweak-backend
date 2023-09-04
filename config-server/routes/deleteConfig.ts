import { existsSync, mkdirSync, unlinkSync } from 'fs'
import { join } from 'path'

import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify'

interface DeleteConfigRouteBody {
  scene: string
}

const deleteConfigRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  const configsDirectory = process.env.CONFIGS_DIRECTORY || '/var/www/configs'

  if (!existsSync(configsDirectory)) {
    mkdirSync(configsDirectory, { recursive: true })
  }

  fastify.route<{ Body: DeleteConfigRouteBody }>({
    method: 'DELETE',
    url: '/',
    schema: {
      body: {
        type: 'object',
        properties: {
          scene: { type: 'string' },
        },
        required: ['scene'],
      },
    },
    handler: async (
      request: FastifyRequest<{ Body: DeleteConfigRouteBody }>,
      reply: FastifyReply,
    ) => {
      try {
        const { scene } = request.body

        const fileName = join(configsDirectory, `${scene}.json`)

        if (!existsSync(fileName)) {
          return reply.status(404).send({
            error: `Streamer config ${scene} does not exist and can therefore not be deleted.`,
          })
        }

        unlinkSync(fileName)

        reply.send({
          message: `Streamer config ${scene} was successfully deleted.`,
        })
      } catch {
        reply.status(500).send({ error: 'An unknown error occurred' })
      }
    },
  })
}

export default deleteConfigRoute
