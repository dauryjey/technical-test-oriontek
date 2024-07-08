import express, { Application } from "express"
import cookieParser from "cookie-parser"
import company from "./routers/company"
import address from "./routers/address"
import customer from "./routers/customer"
import cors from "cors"

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use("/api", company.router)
app.use("/api", address.router)
app.use("/api", customer.router)

export default app
