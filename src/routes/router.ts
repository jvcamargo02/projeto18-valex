import { Router } from "express"
import cardRouter from "./cardRouter"
import { purchaseRoute } from "./purchaseRouter"
import { rechargeRoute } from "./rechargeRouter"

const router = Router()

router.use(cardRouter)
router.use(rechargeRoute)
router.use(purchaseRoute)

export default router;


