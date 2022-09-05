import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import {
    TransactionTypes,
    findById,
    update,
} from "../repositories/cardRepository";
import { checkExpiration, encryptCVV } from "../utils/cardsFunctions";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as paymentRepository from "../repositories/paymentRepository";

export function generateCardData(
    type: TransactionTypes,
    employeeId: number,
    fullName: string
) {
    return {
        employeeId,
        number: faker.finance.creditCardNumber(),
        cardholderName: generateCardHolderName(fullName),
        securityCode: encryptCVV(),
        expirationDate: dayjs().add(5, "year").format("MM/YY"),
        password: undefined,
        isVirtual: false,
        originalCardId: undefined,
        isBlocked: false,
        type,
    };
}

export async function existingCard(id: number) {
    const card = await findById(id);

    if (!card) throw { type: "not_found", message: "card id doesn't exist" };

    return card;
}

function generateCardHolderName(fullName: string) {
    const names = fullName.split(" ");
    let holdName: string[] = [];

    names.forEach((name, index) => {
        if (name.length > 3 && (index === 0 || index === names.length - 1)) {
            holdName.push(name);
        } else if (name.length > 3) {
            holdName.push(name[0]);
        }
    });

    return holdName.join(" ").toUpperCase();
}

export async function activateCard(id: number, password: string, card: object) {
    const encryptedPassword = await encryptPassword(password);
    const cardData = { ...card, password: encryptedPassword };

    await update(id, cardData);
}

export async function encryptPassword(password: string) {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password, salt);
}

export async function getBalance(id: number) {
    const recharges = await rechargeRepository.findByCardId(id);
    const transactions = await paymentRepository.findByCardId(id);
    const balance = sum(recharges) - sum(transactions);

    return {
        balance,
        transactions,
        recharges,
    };
}

export async function lockCard(card: any, password: string) {
    const { expirationDate, isBlocked } = card;

    checkExpiration(expirationDate);
    verifyPassword(card.password, password);

    const cardData = { ...card, isBlocked: !isBlocked };

    await update(card.id, cardData);
}

function sum(object: any): number {
    let totalAmount = 0;

    for (let i = 0; i < object.length; i++) {
        const { amount } = object[i];

        totalAmount += amount;
    }

    return totalAmount;
}

function verifyPassword(hashPassword: string, password: string) {
    const verify = bcrypt.compareSync(password, hashPassword);

    if (!verify) throw { type: "unathorized", message: "Wrong password" };
}
