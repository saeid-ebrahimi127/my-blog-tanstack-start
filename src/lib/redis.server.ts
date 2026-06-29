import Redis from 'ioredis'
import { APP_NAME_EN } from './const'
import { serverEnv } from './env.server'

const env = serverEnv()

declare global {
  var redis: Redis | undefined
}

export const keyPrefix = `${APP_NAME_EN}:`

const getRedisClient = () => {
  if (!globalThis.redis) {
    globalThis.redis = new Redis(env.REDIS_URL, {
      keyPrefix,
      lazyConnect: false,
      enableReadyCheck: true,
      enableOfflineQueue: true,
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        return Math.min(times * 200, 2000)
      },
    })

    globalThis.redis.on('connect', () => console.log('[Redis] connected.'))
    globalThis.redis.on('ready', () => console.log('[Redis] ready.'))
    globalThis.redis.on('error', (error) =>
      console.error('[Redis] error:', error),
    )
  }

  return globalThis.redis
}

export const redisClient = getRedisClient()

export const flushAppRedisKeys = async () => {
  if (redisClient.status !== 'ready') {
    await new Promise((res) => redisClient.once('ready', res))
  }

  console.log(`[Redis] scanning for keys with prefix "${keyPrefix}"...`)

  const keys = await redisClient.keys(`${keyPrefix}*`)

  if (keys.length < 1) {
    console.log(
      `[Redis] no keys found with prefix "${keyPrefix}". nothing to delete.`,
    )
    return
  }

  const strippedKeys = keys.map((k) => k.slice(keyPrefix.length))

  console.log(
    `[Redis] found ${strippedKeys.length} key(s) to delete:`,
    strippedKeys,
  )

  const deletedKeysCount = await redisClient.del(...strippedKeys)

  console.log(`[Redis] deleted ${deletedKeysCount} key(s).`)
}
