import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseService";

export async function purchase(req: Request, res: Response) {
    const { card } = res.locals;
    const { amount, password, companyId } = req.body;
    const itsOnlinePurchase = false;
    try {
        await purchaseService.purchase(
            card,
            amount,
            password,
            companyId,
            itsOnlinePurchase
        );

        res.sendStatus(200);
    } catch (e) {
        console.log(e);

        res.status(500).send(e);
    }
}

export async function onlinePurchase(req: Request, res: Response) {
    const {
        number,
        cardholderName,
        expirationDate,
        amount,
        companyId,
    } = req.body;
    const cvv = req.body.securityCode
    const password = null
    const itsOnlinePurchase = true;

    try {
        const card = await purchaseService.onlinePurchase(
            cardholderName,
            number,
            expirationDate,
            cvv
        );
        
        await purchaseService.purchase(
            card,
            amount,
            password,
            companyId,
            itsOnlinePurchase)
        
        
        res.sendStatus(200)
    } catch (e) {
        console.log(e);

        res.status(500).send(e);
    }
}
