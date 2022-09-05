import dayjs from "dayjs";
import Cryptr from "cryptr";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt"

export function isEmployeed(companyId: number, companyReqId: number) {
    if (companyId !== companyReqId)
        throw {
            type: "unauthorized",
            message: "Id sent does not match company employee",
        };

    return true;
}

export function checkExpiration(expirationDate: string) {
    const reqDay = dayjs().format("MM/YY");
    const isValid = !dayjs(reqDay).isAfter(dayjs(expirationDate));

    if (!isValid) throw { type: "unauthorized", message: "Card it's expired" };

    return isValid;
}

export function isActivateCard(password: any) {
    if (password)
        throw {
            type: "unauthorized",
            message: "Card is already active and has a password",
        };
}

export function uncryptCvv(securityCode: string, cvv: string) {
    const SECRET = `${process.env.SECRET}`;
    const cryptr = new Cryptr(SECRET);
    const uncryptCvv = cryptr.decrypt(securityCode);
    
    console.log(uncryptCvv);

    if (cvv !== uncryptCvv)
        throw {
            type: "unauthorized",
            message: "Invalid CVV",
        };

    return true;
}

export function encryptCVV() {
    const SECRET = `${process.env.SECRET}`
    const cryptr = new Cryptr(SECRET);
    return cryptr.encrypt(faker.finance.creditCardCVV());
}

export function verifyPassword(hashPassword: string, password: string) {
    const verify = bcrypt.compareSync(password, hashPassword);

    if (!verify) throw { type: "unathorized", message: "Wrong password" };
}