import { findByApiKey } from "../repositories/companyRepository"

export async function findApiKey(apiKey: any) {
    const company = await findByApiKey(apiKey)

    if (!company) throw { type: "notFound", message: "notFound" }
    
    return company
}
