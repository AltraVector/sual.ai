import express, { urlencoded } from "express";
import dotenv from 'dotenv'
//import cors from 'cors'
import { Post_Text } from "./src/views/api.js";

const app = express()
// app.use(express.static(path.join(__dirname + "/public")))

const PORT = process.env.PORT || 5000
app.use(express.json())
//app.use(cors())

dotenv.config()



app.use('/texttoimage', Post_Text)




app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
