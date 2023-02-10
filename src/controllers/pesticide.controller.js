const pesticide = require("../models/pesticide.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");

const addPesticide = async (req, res) => {
    const { name, dosage, usageDisease } = req.body;
    const pesticideCheck = await pesticide.findOne({ name });
    if (pesticideCheck) throw new APIError("Girilen İlaç Daha Önce Eklenmiş !", 401);

    const newPesticide = new pesticide({
        name,
        dosage,
        usageDisease
    });
    await newPesticide.save()
        .then((data) => {
            return new Response(data, "İlaç başarıyla eklendi").created(res);
        })
        .catch((err) => {
            throw new APIError("İlaç Kayıt Edilemedi!", 400);
        })
}
module.exports = { addPesticide };