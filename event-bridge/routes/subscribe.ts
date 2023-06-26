import { FastifyInstance, FastifyPluginAsync } from 'fastify'

const subscribeRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/subscribe',
    handler: async (request, reply) => {
      fastify.log.debug({ request, reply })
    },
  })
}

export default subscribeRoute
