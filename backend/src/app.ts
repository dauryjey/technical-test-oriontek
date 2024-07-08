import express, { Application } from "express"
import cookieParser from "cookie-parser"
import company from "./routers/company"

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/api", company.router)

export default app
