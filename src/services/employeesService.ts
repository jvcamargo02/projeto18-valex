import { findByTypeAndEmployeeId, TransactionTypes } from "../repositories/cardRepository";
import { findById } from "../repositories/employeeRepository";

export async function findEmployee(id: number) {
    const employee = await findById(id);

    if (!employee)
        throw {
            type: "Unprocessable Entity",
            message: "Employee id not existing",
        };

    return employee;
}

export async function findEmployeeCard(
    type: TransactionTypes,
    employeeId: number
) {
    const employeeCardType = await findByTypeAndEmployeeId(type, employeeId)

    if (employeeCardType !== 0) {
        throw {
            type: "Unprocessable Entity",
            message: "This employee already has a card like this"
        }
    }

    return employeeCardType
}
