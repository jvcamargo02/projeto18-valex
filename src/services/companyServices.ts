import * as companyRepository from "../repositories/companyRepository"

export async function findApiKey(apiKey: any) {
    const company = await companyRepository.findByApiKey(apiKey)

    if (!company) throw { type: "notFound", message: "notFound" }
    
    return company
}