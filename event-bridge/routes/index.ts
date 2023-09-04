import { FastifyInstance, FastifyPluginAsync } from 'fastify'

import chatMessageRoute from './chat-message'
import refetchConfigRoute from './refetch-config'

const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(chatMessageRoute)
  fastify.register(refetchConfigRoute)
}

export default router
