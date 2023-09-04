import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyRequest,
  FastifyReply,
} from 'fastify'

interface ChatMessageRouteBody {
  username: string
  message: string
}

const chatMessageRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  fastify.route<{ Body: ChatMessageRouteBody }>({
    method: 'POST',
    url: '/chat-message',
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          message: { type: 'string' },
        },
        required: ['username', 'message'],
      },
    },
    handler: async (
      request: FastifyRequest<{ Body: ChatMessageRouteBody }>,
      reply: FastifyReply,
    ) => {
      const { username, message } = request.body

      // Emit an event to all connected Socket.io clients
      fastify.io.emit('newChatMessage', { username, message })

      reply.send({ message: 'newChatMessage event sent to connected clients' })
    },
  })
}

export default chatMessageRoute
