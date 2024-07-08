import { Router, Request, Response } from "express"
import { prisma } from "../utils/db"
import { Prisma } from "@prisma/client"

const router = Router()

router.post("/address/", async (req: Request, res: Response) => {
  const { street, city, state, zip } = req.body as Prisma.AddressCreateInput

  if (!street || street.length === 0) {
    return res.status(400).json({ error: "Street is required" })
  }

  if (!city || city.length === 0) {
    return res.status(400).json({ error: "City is required" })
  }

  if (!state || state.length === 0) {
    return res.status(400).json({ error: "State is required" })
  }

  if (!zip || zip.length === 0) {
    return res.status(400).json({ error: "Zip is required" })
  }

  try {
    const address = await prisma.address.create({
      data: {
        street,
        city,
        state,
        zip,
        customer: {
          connect: {
            id: req.body.customerId,
          },
        },
      },
    })

    return res.status(201).json(address)
  } catch {
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.delete("/address/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id || id.length === 0) {
    return res.status(400).json({ error: "ID is required" })
  }

  try {
    const address = await prisma.address.delete({
      where: {
        id,
      },
    })

    return res.status(200).json(address)
  } catch {
    return res.status(500).json({ error: "Internal server error" })
  }
})

export default { router } as const
