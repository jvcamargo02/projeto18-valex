import { Request, Response } from "express";
import {
    insert,
    TransactionTypes,
} from "../repositories/cardRepository";
import * as cardService from "../services/cardService";

export async function createCard(req: Request, res: Response) {
    const { employeeId, type } = req.body as {
        employeeId: number;
        type: TransactionTypes;
    };
    const fullName: string = res.locals.employee;

    const cardData = cardService.generateCardData(type, employeeId, fullName);

    try {
        await insert(cardData);

        return res.status(201).send("Created Card");
    } catch (e) {
        console.log(e);

        throw { type: "server_error", message: "Error inserting in database" };
    }
}

export async function activateCard(
    req: Request,
    res: Response
) {
    const { id, password } = req.body
    const { card } = res.locals

    try {
        await cardService.activateCard(id, password, card)
        
        return res.status(200).send("Activate Card")
    } catch (e) {
        console.log(e)

        return res.status(500).send()
    }

}

export async function getBalance(req: Request, res: Response) {
    const { id } = res.locals.card
    const balance = await cardService.getBalance(id)

    res.status(200).send(balance)
    
}

