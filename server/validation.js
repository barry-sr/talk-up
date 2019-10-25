const Joi = require('@hapi/joi');

const validateSignUpata = (data)=>{
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        
        email: Joi.string()
            .email()
            .pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    
        password: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,30}$/)
    })

    return schema.validate(data)
}


const validateLoginData =()=>{
    const schema = Joi.object.keys({
        username: Joi.string().alphanum()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,30}$/)
    })
     
   return schema.valid(data, schema);
}

module.exports = {validateSignUpata, validateLoginData};