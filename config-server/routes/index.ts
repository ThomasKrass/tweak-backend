import { FastifyInstance, FastifyPluginAsync } from 'fastify'

import deleteConfigRoute from './deleteConfig'
import getAllConfigsRoute from './getAllConfigs'
import getConfigRoute from './getConfig'
import postConfigRoute from './postConfig'

const router: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(postConfigRoute)
  fastify.register(deleteConfigRoute)
  fastify.register(getConfigRoute)
  fastify.register(getAllConfigsRoute)
}

export default router
