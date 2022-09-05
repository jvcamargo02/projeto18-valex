import { findById } from "../repositories/businessRepository";
import { findByCardDetails } from "../repositories/cardRepository";
import { insert } from "../repositories/paymentRepository";
import * as cardsFunctionsValidation from "../utils/cardsFunctions";
import { getBalance } from "./cardService";

export async function purchase(
    card: any,
    amount: number,
    password: string | null,
    companyId: number,
    itsOnlinePurchase: boolean
) {
    if (card.password && !card.isBlocked) {
        cardsFunctionsValidation.checkExpiration(card.expirationDate);

        try {
            verifyOnlinePurchase(itsOnlinePurchase, card.password, password);
            await isValidPurchase(card.type, companyId);
            await haveBalance(card.id, amount);

            const paymentData = {
                cardId: card.id,
                businessId: companyId,
                amount,
            };

            return await insert(paymentData);
        } catch (e) {
            console.log(e);

            throw e;
        }
    } else
        throw {
            type: "bad_request",
            message: "Card doesn't active or it's blocked",
        };
}

export async function onlinePurchase(
    cardholderName: string,
    number: string,
    expirationDate: string,
    cvv: string
) {
    const card = await findByCardDetails(
        number,
        cardholderName,
        expirationDate
    );
    if(!card) throw { type: "unathorized", message: "Invalid Card data"}

    if (cardsFunctionsValidation.uncryptCvv(card.securityCode, cvv)) {
        return card;
    }
}

async function isValidPurchase(cardType: string, companyId: number) {
    const company = await findById(companyId);

    if (!company) throw { type: "notFound", message: "notFound" };

    if (company.type !== cardType)
        throw { type: "unauthorized", message: "Establishment not allowed" };
}

async function haveBalance(id: number, amount: number) {
    const { balance } = await getBalance(id);

    if (!balance || balance < amount)
        throw { type: "unauthorized", message: "Insufficient funds" };
}

async function verifyOnlinePurchase(
    itsOnlinePurchase: boolean,
    hashPassword: string,
    password: string | null
) {
    if (!itsOnlinePurchase && password) {
        return cardsFunctionsValidation.verifyPassword(hashPassword, password);
    }
}
