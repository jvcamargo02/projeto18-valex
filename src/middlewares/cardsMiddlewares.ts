import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";
import * as cardRepository from "../repositories/cardRepository";
import { findApiKey } from "../services/companyServices";
import * as employeesService from "../services/employeesService";
import { existingCard } from "../services/cardService";
import * as cardFunctionsValidate from "../utils/cardsFunctions";

export async function keyApiValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const apiKey: any = req.headers.apikey;

    try {
        const company = await findApiKey(apiKey);

        res.locals.company = company;

        next();
    } catch (e) {
        console.log(e);

        return res.status(404).send("Company not existing");
    }
}

export async function findEmployee(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.body.employeeId);
    const companyReqId = Number(res.locals.company.id);

    try {
        const { fullName, companyId } = await employeesService.findEmployee(id);

        cardFunctionsValidate.isEmployeed(companyId, companyReqId);

        res.locals.employee = fullName;

        next();
    } catch (e) {
        console.log(e);

        return res.status(422).send(e);
    }
}

export async function isValidCardType(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { employeeId, type } = req.body as {
        employeeId: number;
        type: cardRepository.TransactionTypes;
    };

    try {
        await employeesService.findEmployeeCard(type, employeeId);

        next();
    } catch (e) {
        console.log(e);

        return res
            .status(422)
            .send("This employee already has a card like this");
    }
}

export async function findCardById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const  id  = req.body.id || Number(req.params.id);

    try {
        
        const card = await existingCard(id);

        res.locals.card = card;

        next();
    } catch (e) {
        console.log(e);

        return res.status(404).send(e);
    }
}

export function itsValidCard(req: Request, res: Response, next: NextFunction) {
    const { expirationDate, password, securityCode } = res.locals.card;
    const { cvv } = req.body;

    cardFunctionsValidate.checkExpiration(expirationDate);
    cardFunctionsValidate.isActivateCard(password);
    cardFunctionsValidate.uncryptCvv(securityCode, cvv);

    next();
}
