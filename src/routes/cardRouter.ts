import { Router }from "express"
import { appendFile } from "fs"

const cardRouter = Router()

cardRouter.get("/new-card", (req, res) => res.status(200).send("ufa"))

export default cardRouter