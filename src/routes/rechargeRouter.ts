import { Router } from "express"
import { rechargeCard } from "../controllers/rechargeController"
import { findCardById, keyApiValidator } from "../middlewares/cardsMiddlewares"
import { schemaReqBodyValidator, schemaReqHeadersValidator } from "../middlewares/schemaValidate"
import { apiKeySchema } from "../schemas/cardSchemas"
import { rechargeSchema } from "../schemas/rechargeSchemas"

const rechargeRoute = Router()

rechargeRoute.post(
    "/recharge/:id",
    schemaReqHeadersValidator(apiKeySchema),
    schemaReqBodyValidator(rechargeSchema),
    keyApiValidator,
    findCardById,
    rechargeCard
)

export { rechargeRoute }