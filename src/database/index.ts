import { Pool } from 'pg'
import { logger } from 'helpers/logger'
import { db } from 'config/env'

const dbClient = new Pool({
    user: db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port
});

(async () => {
    await dbClient.connect()
})()

dbClient.on('connect', () => logger.info('Database Connection Successful'))

process.on('SIGINT', () => {
    logger.info('Database Conntection Terminated')
    dbClient.end()
})

export { dbClient }
