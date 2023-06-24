import { config } from 'dotenv'
config()

// Server Config
export const host = process.env.HOST
export const port = process.env.PORT || 3000
export const corsOrigin = ['localhost']
export const corsMethods = ['GET', 'POST']
export const isProduction = process.env.NODE_ENV === 'production'
export const tokenKey = process.env.TOKEN_KEY

// Logs
export const logLevel = process.env.LOG_LEVEL || 'info'

// Database Config
export const db = {
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT) || 0,
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || ''
}

// Redis Config
export const redis = {
    host: process.env.REDIS_HOST || '',
    port: parseInt(process.env.REDIS_PORT) || 0,
    user: process.env.REDIS_USER || '',
    password: process.env.REDIS_PASSWORD || ''
}