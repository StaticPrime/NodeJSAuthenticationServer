import Joi from 'joi'

import { sanitizeObject } from 'helpers/sanitizers'

class LoginUserRequest {
    public schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })
}

class LoginUserResponse {
    private schema: object = {
        token: ''
    }

    sanatize(returnValues: object): object {
        return sanitizeObject(returnValues, this.schema)
    }
}

export { LoginUserRequest, LoginUserResponse }