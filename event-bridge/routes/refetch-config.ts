import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify'

const refetchConfigRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  fastify.route({
    method: 'POST',
    url: '/refetch-config',
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      // Emit an event to all connected Socket.io clients
      fastify.io.emit('updatedStreamerConfig')

      reply.send({
        message: 'updatedStreamerConfig event sent to connected clients',
      })
    },
  })
}

export default refetchConfigRoute
