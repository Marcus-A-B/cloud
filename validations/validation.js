const joi = require('joi')

const registerValidation = (data) => {
    const schemaValidation = joi.object({
        username:joi.string().required().min(3).max(256),
        email:joi.string().required().min(6).max(256).email(),
        password:joi.string().required().min(6).max(1024),
        firstName:joi.string().required().min(1).max(15),
        lastName:joi.string().required().min(1).max(15)
    })
    return schemaValidation.validate(data)
}

const loginValidation = (data) => {
    const schemaValidation = joi.object({        
        email:joi.string().required().min(6).max(256).email(),
        password:joi.string().required().min(8).max(1024)
    })
    return schemaValidation.validate(data)
}

const postValidation = (data) => {
    const schemaValidation = joi.object({
        title:joi.string().required().min(1).max(128),
        body:joi.string().required().min(1).max(2048),
        ownerId:joi.string().required().min(24).max(24)
    })
    return schemaValidation.validate(data)
}

const commentValidation = (data) => {
    const schemaValidation = joi.object({
        text:joi.string().required().min(1).max(512),
        postId:joi.string().required().min(24).max(24)
    })
    return schemaValidation.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.postValidation = postValidation
module.exports.commentValidation = commentValidation