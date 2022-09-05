import { Request, Response, NextFunction } from "express";

export default async function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(error);

    return res.status(500).send(error);
}
