import joi from "joi"

export const createCardSchema = joi.object({
    employeeId: joi.number().required(),
    type: joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health')
})

export const apiKeySchema = joi.object({
    apikey: joi.string().required()
})

export const cardActivateSchema = joi.object({
    id: joi.number().required(),
    cvv: joi.number().required(),
    password: joi.string().length(4).pattern(/^[0-9]+$/).required()
})
