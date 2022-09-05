import { Router } from "express"
import { onlinePurchase, purchase } from "../controllers/purchasesControler"
import { findCardById } from "../middlewares/cardsMiddlewares"
import { schemaReqBodyValidator } from "../middlewares/schemaValidate"
import { onlinePurchaseSchema, posPurchaseSchema } from "../schemas/purchaseSchemas"

const purchaseRoute = Router()

purchaseRoute.post(
    "/purchase/:id",
    schemaReqBodyValidator(posPurchaseSchema),
    findCardById,
    purchase
)
purchaseRoute.post(
    "/online-purchase",
    schemaReqBodyValidator(onlinePurchaseSchema),
    onlinePurchase
)

export { purchaseRoute }