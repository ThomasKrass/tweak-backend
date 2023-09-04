import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify'

const getAllConfigsRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  fastify.route({
    method: 'GET',
    url: '/configs',
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const configsDirectory =
          process.env.CONFIGS_DIRECTORY || '/var/www/configs'

        if (!existsSync(configsDirectory)) {
          return reply
            .status(404)
            .send({ error: `Config directory does not exist` })
        }

        const fileNames = readdirSync(configsDirectory)

        const result: { [key: string]: unknown } = {}

        for (const fileName of fileNames) {
          if (!fileName.endsWith('.json')) continue

          const filePath = join(configsDirectory, fileName)

          const fileContents = readFileSync(filePath, 'utf8')
          const config = JSON.parse(fileContents)

          const configName = fileName.replace('.json', '')
          result[configName] = config
        }

        reply.send(result)
      } catch (err) {
        return reply.status(500).send(err)
      }
    },
  })
}

export default getAllConfigsRoute
