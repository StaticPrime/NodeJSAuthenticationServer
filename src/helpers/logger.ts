import { logLevel } from 'config/env'
import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
    transports: [
        new transports.Console({
            level: logLevel,
            format: format.json(),
            silent: false
        })
    ]
})