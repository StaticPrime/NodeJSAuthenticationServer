import { createClient } from 'redis'
import { isEmpty } from 'lodash'

import { logger } from 'helpers/logger'
import { redis } from 'config/env'

const redisClient = createClient({
    socket: {
        host: redis.host,
        port: redis.port
    },
    username: redis.user,
    password: redis.password
})

redisClient.on('ready', () => logger.info('Cache Connection Successful'))
redisClient.on('end', () => logger.info('Cache Connection Terminated'))
redisClient.on('error', (e) => logger.error(`Cache Error: ${e}`));

(async () => {
    logger.info('Cache Disconnected')
    redisClient.connect()
})()

export const saveRedisKey = async (key: string, data: string): Promise<boolean> => {
    try {
        await redisClient.set(key, data)
        return true
    } catch (ex) {
        logger.error(`Error saving to Redis Cache ${key}, ${data}`, ex)
        return false
    }
}

export const getRedisKey = async <T>(key: string): Promise<T> => {
    try {
        const redisResult = await redisClient.get(key)
        return isEmpty(redisResult) ? null : JSON.parse(redisResult)
    } catch (ex) {
        logger.error(`Error finding key in Redis cache: ${key}`, ex)
        return null
    }
}

export const findMultipleRedisKeys = async (query: string): Promise<string[]> => {
    try {
        const redisResult = await redisClient.keys(query)
        return redisResult ?? null
    } catch (ex) {
        logger.error(`Error finding multiple keys in Redis cache: ${query}`, ex)
        return null
    }
}

export const deleteRedisKey = (key: string) => {
    redisClient.del(key)
}

export const deleteRedisKeysByQuery = async (query: string) => {
    let cursor = 0

    try {
        const reply = await redisClient.scan(cursor, { MATCH: query, COUNT: 1000 });
        for (let key of reply.keys) {
            cursor = reply.cursor;
            await redisClient.del(key);
        }
    } catch (ex) {
        logger.error(`Error deleting Redis keys by query: ${query}`, ex)
    }
}

// If the Node process ends, close the Cache connection
process.on('SIGINT', () => {
    redisClient.disconnect()
})