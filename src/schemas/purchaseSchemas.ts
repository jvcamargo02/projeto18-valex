import joi from "joi"

export const posPurchaseSchema = joi.object({
    password: joi.string().required(),
    companyId: joi.number().required(),
    amount: joi.number().greater(0).required()
})

export const onlinePurchaseSchema = joi.object({
    number: joi.string().required(),
    cardholderName: joi.string().required(),
    expirationDate: joi.string().required(),
    securityCode: joi.string().required(),
    companyId: joi.number().required(),
    amount: joi.number().greater(0).required()
})