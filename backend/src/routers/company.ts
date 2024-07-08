import { Router, Request, Response } from "express"
import { prisma } from "../utils/db"
import { Prisma } from "@prisma/client"

const router = Router()

router.get("/company/", async (_, res: Response) => {
  try {
    const companies = await prisma.company.findMany()

    if (!companies || companies.length === 0) {
      return res.status(404).json({ error: "Companies not found" })
    }

    return res.status(200).json(companies)
  } catch {
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/company/:id", async (req: Request, res: Response) => {
  if (!req.params.id || req.params.id.length === 0) {
    return res.status(400).json({ error: "ID is required" })
  }

  try {
    const company = await prisma.company.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        Customers: true,
      },
    })

    if (!company) {
      return res.status(404).json({ error: "Company not found" })
    }

    return res.status(200).json(company)
  } catch {
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/company/", async (req: Request, res: Response) => {
  const { name } = req.body as Prisma.CompanyCreateInput

  if (!name || name.length === 0) {
    return res.status(400).json({ error: "Name is required" })
  }

  try {
    const company = await prisma.company.create({
      data: {
        name,
      },
    })

    return res.status(201).json(company)
  } catch {
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.delete("/company/:id", async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id || id.length === 0) {
    return res.status(400).json({ error: "ID is required" })
  }

  try {
    const company = await prisma.company.delete({
      where: {
        id,
      },
    })

    return res.status(200).json(company)
  } catch {
    return res.status(500).json({ error: "Internal server error" })
  }
})

export default { router } as const
