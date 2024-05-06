import Tesseract from 'tesseract.js';


export const Post_Text = async (req, res) => {
    const { base64IMG } = req.body

    Tesseract.recognize(base64IMG)
        .then(function (result) {
            let data = result.data.text
            res.status(404).send({ message: 'Extracted successfully', status: 200, data })
        });


    // const schema = joi.object({
    //     fullName: joi.string().required().min(3),
    //     email: joi.string().required().min(3).email(),
    //     message: joi.string().required().min(3)

    // })

    // if (joi.valid(schema, req.body)) {
    //     const result = await saved.save()
    //     res.status(201).send({ result, message: 'successfully submited', status: 200 })
    // }




    // res.status(201).send("result")

}
