import Tesseract from 'tesseract.js';
import fs from 'fs';
import OpenAI from "openai";
import dotenv from 'dotenv'
// gemini
import { GoogleGenerativeAI } from "@google/generative-ai";



dotenv.config();


// about gemini
const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro",
    geminiConfig,
});


// Generating caption from the input image
export const sualAI_IMG_Caption = async (req, res) => {
    try {
        // base64 image from the user (base64 is generated from the client - Mobile)
        const { base64IMG } = req.body
        const { imageType } = req.body

        const promptConfig = [
            { text: "Can you tell me about this image whats happening there?" },
            {
                inlineData: {
                    mimeType: `${imageType}`,
                    data: base64IMG,
                },
            },
        ];

        const result = await geminiModel.generateContent({
            contents: [{ role: "user", parts: promptConfig }],
        });
        const response = await result.response.text();
        res.status(200).send({ status: 200, response })

    } catch (error) {
        let rr = error.message
        res.status(404).send({ rr })
    }
}


// Chatting Sual.AI
export const sualAI_Chat = async (req, res) => {
    try {
        const { message } = req.body
        const result = await geminiModel.generateContent(message);

        let response = result.response.candidates[0].content.parts[0].text

        res.status(200).send({ status: 200, response })

    } catch (error) {
        let rr = error.message
        res.status(404).send({ rr })
    }
}


// image to text: base64IMG to text
export const imageToText = async (req, res) => {
    let extractedText;
    const { base64IMG } = req.body

    Tesseract.recognize(base64IMG)
        .then(function (result) {
            extractedText = result.data.text

        });

    const schema = joi.object({
        base64IMG: joi.string().required().min(10),
    })

    if (joi.valid(schema, req.body)) {
        // saved to db
        // const result = await saved.save()

        res.status(200).send({ message: 'Extracted successfully', status: 200, extractedText })
    }
    else res.status(404).send("something wrong")









}
