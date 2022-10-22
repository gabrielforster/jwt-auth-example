import { Request, Response, NextFunction } from "express"

import { RequestWithUser } from "../../interfaces/RequestWithUser"

export async function findAll(req: Request, res: Response, next: NextFunction) {
  const {user} = req as any
  console.log(user)
  try {
    return res.status(200).json({ gabriel: "https://github.com/gabrielforster.png", theo: "https://github.com/theobr.png" })
  } catch (error) {
    next(error)
  }
}