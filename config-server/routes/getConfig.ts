import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify'

interface GetConfigRouteParams {
  fileName: string
}

const getConfigRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/:fileName',
    schema: {
      params: {
        type: 'object',
        properties: {
          fileName: { type: 'string' },
        },
        required: ['fileName'],
      },
    },
    handler: async (
      request: FastifyRequest<{ Params: GetConfigRouteParams }>,
      reply: FastifyReply,
    ) => {
      try {
        const { fileName } = request.params
        const configsDirectory =
          process.env.CONFIGS_DIRECTORY || '/var/www/configs'

        const filePath = join(configsDirectory, fileName)

        if (existsSync(filePath)) {
          const fileContents = readFileSync(filePath, 'utf8')
          const config = JSON.parse(fileContents)

          reply.send(config)
        } else {
          return reply
            .status(404)
            .send({ error: `Config file ${fileName} does not exist` })
        }
      } catch (err) {
        return reply.status(500).send(err)
      }
    },
  })
}

export default getConfigRoute
