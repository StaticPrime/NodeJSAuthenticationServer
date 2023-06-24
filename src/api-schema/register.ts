import Joi from 'joi'

import { sanitizeObject } from 'helpers/sanitizers'

class RegisterUserRequest {
    public schema = Joi.object().keys({
        first_name: Joi.string().required().min(3),
        last_name: Joi.string().required().min(3),
        birthdate: Joi.date().optional(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })
}

class RegisterUserResponse {
    private schema: object = {
        id: '',
        first_name: '',
        last_name: '',
        birthdate: null,
        created_at: null,
        updated_at: null,
        token: null
    }

    addToken(token: string) {
        this.schema['token'] = token
    }

    sanatize(returnValues: object): object {
        return sanitizeObject(returnValues, this.schema)
    }
}

export { RegisterUserRequest, RegisterUserResponse }