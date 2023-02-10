const slot = require("../models/slot.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");

const addSlot = async (req, res) => {
    const { gardenId, slotNo, pesticideInSlot } = req.body;

    const newSlot = new slot({
        garden: gardenId,
        slotNo,
        pesticideInSlot,
    });
    await newSlot.save()
        .then((data) => {
            return new Response(data, "Slot Başarıyla Eklendi").created(res);
        })
        .catch((err) => {
            throw new APIError("Slot eklenemedi", 400);
        })

}
module.exports = { addSlot };