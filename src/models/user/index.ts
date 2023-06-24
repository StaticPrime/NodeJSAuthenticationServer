import { deleteRedisKeysByQuery, getRedisKey, saveRedisKey } from 'cache'
import { dbClient } from 'database'

import { UserSchema } from 'database/schema/users'
import { encryptPassword } from 'helpers/encrypt'
import { logger } from 'helpers/logger'
import { isEmpty } from 'lodash'

interface RegisterData {
    first_name: string,
    last_name: string
    email: string,
    password: string,
    birthdate: Date
}

interface UserData {
    first_name: string,
    last_name: string
    email: string,
    birthdate: Date
}

export const findUser = async (email: string): Promise<UserSchema> => {
    try {
        const cachedUser = getRedisKey<UserSchema>(`user_*_${email}`)
        if (!isEmpty(cachedUser)) return cachedUser

        const users = await dbClient.query(`SELECT * FROM users where email = '${email}' LIMIT 1`)
        return isEmpty(users.rows) ? null : users.rows[0]
    } catch (ex) {
        logger.error(`Unable to find user: ${email}`, ex)
        return null
    }
}

export const createUser = async (newUser: RegisterData): Promise<UserSchema> => {
    const encryptedPassword = await encryptPassword(newUser.password)

    if (isEmpty(encryptedPassword)) {
        return null
    } else {
        try {
            newUser.password = encryptedPassword
            const userInfo = await dbClient.query(`INSERT INTO users (first_name, last_name, email, password, birthdate) VALUES('${newUser.first_name}', '${newUser.last_name}', '${newUser.email}', '${newUser.password}', '${newUser.birthdate}') RETURNING *`)
            await saveRedisKey(`user_${userInfo.rows[0].id}_${newUser.email}`, JSON.stringify(userInfo.rows[0]))

            return userInfo.rows[0]
        } catch (ex) {
            logger.error(`Error creating user: ${newUser}`, ex)
            return null
        }
    }
}

export const updateUser = async (userId: number, userData: UserData): Promise<UserSchema> => {
    try {
        const userInfo = await dbClient.query(`UPDATE users SET first_name = '${userData.first_name}', last_name = '${userData.last_name}', email = '${userData.email}', birthdate = '${userData.birthdate}' WHERE id = '${userId}' RETURNING *`)
        await saveRedisKey(`user_${userInfo.rows[0].id}_${userData.email}`, JSON.stringify(userInfo.rows[0]))
        return userInfo.rows[0]
    } catch (ex) {
        logger.error(`Error updating user: ${userData}`, ex)
        return null
    }
}