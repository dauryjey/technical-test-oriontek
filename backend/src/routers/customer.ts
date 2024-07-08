import { Request, Response, Router } from "express"
import { prisma } from "../utils/db"

const router = Router()

router.get("/customer/:id", async (req: Request, res: Response) => {
  if (!req.params.id || req.params.id.length === 0) {
    return res.status(400).json({ error: "ID is required" })
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        Addresses: true,
      }
    })

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" })
    }

    return res.status(200).json(customer)
  } catch {
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/customer/", async (req: Request, res: Response) => {
  const { firstName, lastName, companyId } = req.body

  if (!firstName || firstName.length === 0) {
    return res.status(400).json({ error: "First Name is required" })
  }

  if (!lastName || lastName.length === 0) {
    return res.status(400).json({ error: "Last Name is required" })
  }

  if (!companyId || companyId.length === 0) {
    return res.status(400).json({ error: "Company ID is required" })
  }

  try {
    const customer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        companyId,
      },
    })

    return res.status(201).json(customer)
  } catch {
    return res.status(500).json({ error: "Internal server error" })
  }
})


router.delete("/customer/:id", async (req: Request, res: Response) => {
  if (!req.params.id || req.params.id.length === 0) {
    return res.status(400).json({ error: "ID is required" })
  }

  try {
    const customer = await prisma.customer.delete({
      where: {
        id: req.params.id,
      },
    })

    return res.status(200).json(customer)
  } catch {
    return res.status(500).json({ error: "Internal server error" })
  }
})

export default { router } as const