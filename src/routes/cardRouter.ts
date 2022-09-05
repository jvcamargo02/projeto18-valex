import { Router, Request, Response } from "express";
import { activateCard, createCard, getBalance } from "../controllers/cardController";
import {
    findCardById,
    findEmployee,
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
    "/activate-card",
    schemaReqBodyValidator(cardActivateSchema),
    findCardById,
    itsValidCard,
    activateCard
);
cardRouter.get(
    "/:id",
    findCardById,
    getBalance
)

export default cardRouter;
