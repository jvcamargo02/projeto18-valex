import { Router } from "express";
import { activateCard, createCard, getBalance, lockCard } from "../controllers/cardController";
import {
    findCardById,
    findEmployee,
    isBlockedCard,
    isValidCardType,
    itsValidCard,
    keyApiValidator,
} from "../middlewares/cardsMiddlewares";
import {
    schemaReqBodyValidator,
    schemaReqHeadersValidator,
} from "../middlewares/schemaValidate";
import {
    apiKeySchema,
    cardActivateSchema,
    createCardSchema,
    cardLockSchema
} from "../schemas/cardSchemas";

const cardRouter = Router();

cardRouter.post(
    "/new-card",
    schemaReqHeadersValidator(apiKeySchema),
    schemaReqBodyValidator(createCardSchema),
    keyApiValidator,
    findEmployee,
    isValidCardType,
    createCard
);
cardRouter.post(
    "/new-card/:id",
    schemaReqBodyValidator(cardActivateSchema),
    findCardById,
    itsValidCard,
    activateCard
);
cardRouter.get(
    "/card/:id",
    findCardById,
    getBalance
)
cardRouter.post(
    "/card/:id/lock",
    schemaReqBodyValidator(cardLockSchema),
    findCardById,
    isBlockedCard("lock"),
    lockCard
)
cardRouter.post(
    "/card/:id/unlock",
    schemaReqBodyValidator(cardLockSchema),
    findCardById,
    isBlockedCard("unlock"),
    lockCard
)


export default cardRouter;
