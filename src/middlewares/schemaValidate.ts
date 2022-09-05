import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export function schemaReqHeadersValidator(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const apikey = req.headers.apikey;
        const { error } = schema.validate({ apikey });

        if (error) {
            console.log(error);

            throw { type: "unauthorized", message: error };
        }

        next();
    };
}

export function schemaReqBodyValidator(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);

        if (error) {
            console.log(error);

            throw { type: "wrong_schema", message: error };
        }

        next();
    };
}
