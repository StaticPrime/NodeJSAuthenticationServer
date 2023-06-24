import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isEmpty } from 'lodash'

import { tokenKey } from 'config/env'
import { logger } from 'helpers/logger'
import { findMultipleRedisKeys, saveRedisKey } from 'cache'

export const createUserToken = async (userId: number): Promise<string> => {
    try {
        const tokenExpire = 60 * 60
        const signedToken = jwt.sign({ id: userId }, tokenKey, { expiresIn: tokenExpire })

        const keySuccess = await saveRedisKey(`user_${userId.toString()}_token_${signedToken}`, signedToken)
        return keySuccess ? signedToken : null
    } catch (ex) {
        logger.error(`Error generating auth token from ${userId}`, ex)
        return null
    }
}

export const validateUserToken = async (token: string): Promise<boolean> => {
    try {
        const tokenResults = await findMultipleRedisKeys(`user_*_token_${token}`)
        return !isEmpty(tokenResults)
    } catch (ex) {
        logger.error(`Unable to validate token ${token}`)
        return null
    }
}

export const decryptUserToken = (token: string): Object => {
    try {
        const decodedInfo = jwt.decode(token)
        return decodedInfo instanceof Object ? decodedInfo : null
    } catch (ex) {
        logger.error(`Error decrypting user token ${token}`)
        return null
    }
}

export const validatePassword = (password: string, hash: string): boolean => {
    return bcryptjs.compareSync(password, hash)
}

export const encryptPassword = async (password: string): Promise<string> => {
    const saltRounds = 10
    try {
        const salt = await bcryptjs.genSalt(saltRounds)
        return await bcryptjs.hash(password, salt)
    } catch (ex) {
        logger.error(`Error Encrypting password`, ex)
        return null
    }
}