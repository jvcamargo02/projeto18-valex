import * as rechargeRepository from "../repositories/rechargeRepository";
import * as cardsFunctionsValidation from "../utils/cardsFunctions";

export async function rechargeCard(card: any, value: number) {
    const { password, expirationDate, id } = card;
    if (password) {
        cardsFunctionsValidation.checkExpiration(expirationDate);

        return await rechargeRepository.insert(id, value);
    } else throw { type: "bad_request", message: "Card doesn't active" };
}
