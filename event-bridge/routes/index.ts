import { FastifyInstance, FastifyPluginAsync } from 'fastify'

import subscribeRoute from './subscribe'

const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(subscribeRoute)
}

export default router
