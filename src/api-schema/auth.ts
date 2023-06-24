import Joi from 'joi'

import { JoiAuthBearer } from 'middleware/validator'

class AuthUserRequest {
    public schema = Joi.object().keys({
        authorization: JoiAuthBearer().required()
    }).unknown(true)
}

export { AuthUserRequest }