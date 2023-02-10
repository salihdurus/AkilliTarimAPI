const garden = require("../models/garden.model");
const plant = require("../models/plant.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");

const addPlant = async (req, res) => {
    const { gardenId, number, position } = req.body;
    const { _id } = req.user;
    const addedGarden = await garden.findOne({ _id: gardenId, owner: _id });
    if(!addedGarden) throw new APIError("Bitki Eklemeye Çalıştığınız Bahçe Sizin Değil !",400);

    const newPlant = new plant({
        garden: gardenId,
        number,
        position 
    });
    await newPlant.save()
        .then((data) => {
            return new Response(data, "Bitki Başarıyla Eklendi").created(res);
        })
        .catch((err) => {
            throw new APIError("Bitki kayıt edilemedi !", 400);
        })
}

module.exports = { addPlant };
