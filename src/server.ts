import express, { Application } from 'express'
import cors from 'cors'

import { corsMethods, corsOrigin, port } from 'config/env'
import { logger } from 'helpers/logger'
import { errorLogger, errorResponder } from 'middleware/error-handler'
import SetAPIRoutes from 'middleware/api-routes'

const authApp: Application = express()

async function initializeServer(app: Application): Promise<string> {
    logger.info(`Starting Authentication Service`)

    app.use(cors({
        origin: corsOrigin,
        methods: corsMethods
    }))

    app.use(express.json());
    app.use(express.urlencoded())

    // Configure Routes
    SetAPIRoutes(app)

    // Error Logging & Responder
    app.use(errorLogger)
    app.use(errorResponder)

    // Start server
    app.listen(port, () => {
        logger.info(`Authentication Server Listening on port: ${port}`)
    })

    return 'Authentication Server Started Successfully'
}

initializeServer(authApp)
    .then((startMessage) => {
        logger.info(startMessage)
    })
    .catch((ex) => {
        logger.error(`There was an error initializing the server: ${ex.message}`)
        process.exit(1)
    })

process.on('uncaughtExceptionMonitor', (ex) => {
    logger.error(`uncaught exception detected`, {
        name: ex.name,
        message: ex.message,
        ex,
    })
})