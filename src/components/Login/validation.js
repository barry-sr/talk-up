const Joi = require('@hapi/joi');

const validateSignUpForm = (data)=>{
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .pattern(/^[a-zA-Z0-9]+$/)
            .required(),
        
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
                
        password: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,30}$/)
    })

    return schema.validate(data)
}

const validateLoginForm = (data) => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .pattern(/^[a-zA-Z0-9]+$/)
            .required(),

        password: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,30}$/)
    })
     
   return schema.validate(data);
}

module.exports = {validateSignUpForm, validateLoginForm};