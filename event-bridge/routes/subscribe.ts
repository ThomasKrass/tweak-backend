import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify'

interface SubscribeRouteBody {
  username: string
}

const subscribeRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.route<{ Body: SubscribeRouteBody }>({
    method: 'POST',
    url: '/subscribe',
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' },
        },
        required: ['username'],
      },
    },
    handler: async (
      request: FastifyRequest<{ Body: SubscribeRouteBody }>,
      reply: FastifyReply,
    ) => {
      const { username } = request.body

      // Emit an event to all connected Socket.io clients
      fastify.io.emit('newSubscription', { username })

      reply.send({ message: 'newSubscription event sent to connected clients' })
    },
  })
}

export default subscribeRoute
