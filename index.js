import express, { urlencoded } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { imageToText, sualAI_Chat, sualAI_IMG_Caption } from "./src/views/api.js";
// import bodyParser from "body-parser";

const app = express()
// app.use(express.static(path.join(__dirname + "/public")))

const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())

dotenv.config()

app.use(express.json({ limit: '969.36kb' }));
app.use('/api/imagetotext', imageToText)
app.use('/api/sual_ai/chatting', sualAI_Chat)
app.use('/api/sual_ai/imagecaption', sualAI_IMG_Caption)






app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})