import { Request, Response, NextFunction } from "express";
import * as rechargesServices from "../services/rechargesServices";

export async function rechargeCard(
    req: Request,
    res: Response,
    next: NextFunction
) { 
    const value = +req.body.amount
    const { card } = res.locals;

    try {
        await rechargesServices.rechargeCard(card, value);

        res.sendStatus(200);
    } catch (e) {
        console.log(e);

        res.status(500).send(e);
    }
}
