const garden = require("../models/garden.model");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const plant = require("../models/plant.model");
const pesticide = require("../models/pesticide.model");

const addGarden = async (req, res) => {
    const { name, border } = req.body;
    const { _id } = req.user;

    const newGarden = new garden({
        owner: _id,
        name,
        border,
    });
    await newGarden.save()
        .then((data) => {
            return new Response(data, "Bahçe Başarıyla eklendi").created(res);
        })
        .catch((err) => {
            throw new APIError("Bahçe Kayıt Edilemedi !", 400);
        })
}

const getGardens = async (req, res) => {
    const { _id } = req.user;
    await garden.find({ owner: _id })
        // .findOne({owner:_id}).all()
        .then((data) => {
            return new Response(data.map((item, index) => {
                return { "id": item.id, "name": item.name, "status": item.status }
            }), "Bahçeler başarıyla listelendi").success(res)
        }).catch((err) => { throw new APIError("Bahçeler Listelenemedi !", 400); })

}

const getGardenDetails = async (req, res) => {
    const { gardenId } = req.query;
    let response = {};

    let diseasedPlants = [];
    let sprayingStatus = [];
    let usedMedicinesToBe = [];
    await garden.findOne({ _id: gardenId }).select("isNew automaticSpraying scan status")
        .then(async (data) => {
            response.garden = data;
            await plant.find({ garden: gardenId }).select("number position diseaseStatus disease").then(async (p) => {
                response.plants = p;

                await Promise.all(p.map(async (item) => {
                    if (item.diseaseStatus && item.diseaseStatus !== "healthy") {
                        diseasedPlants.push(`${item.number}. Ağaç - ${item.disease.name}`)
                        sprayingStatus.push(`${item.number}. Ağaç - ${item.disease.sprayingStatus ? item.disease.sprayingStatus : "Henüz İlaçlanmadı"}`)
                        await pesticide.findOne({ usageDisease: item.disease.name })
                            .then((disease) => {
                                disease ?
                                    usedMedicinesToBe.push(`${item.number}. Ağaç - ${disease.name}`)
                                    :
                                    usedMedicinesToBe.push(`${item.number}. Ağaç - Bulunamadı`);
                            })
                            .catch((err) => {
                                console.log(err.message);
                            })
                    }
                }
                )
                )
                response.numberOfPlant = p.length
                response.diseasedPlants = diseasedPlants;
                response.sprayingStatus = sprayingStatus;
                response.usedMedicinesToBe = usedMedicinesToBe;

            })

            return new Response(response, "Bahçe Başarıyla Listelendi").success(res);
        })
        .catch((err) => {
            throw new APIError(`Bahçe Listelenemedi ! :${err.message}`, 400);
        })
}

const getGardenSettings = async (req, res) => {
    const { _id } = req.user;
    let gardenSettings = [];
    let pesticides = [];
    await garden.find({ owner: _id })
        .then(async (data) => {
            data.map((item) => {
                gardenSettings.push({
                    gardenId: item.id,
                    gardenName: item.name,
                    automaticScan: item.automaticScan,
                    scanPeriode: item.scan.periode,
                    automaticSpraying: item.automaticSpraying,
                    slots: item.slots
                })
            })
            await pesticide.find()
                .then((data) => {
                    data.map((item) => {
                        pesticides.push({
                            pesticideId: item._id,
                            pesticideName: item.name,
                        })
                    })
                })

            return new Response({ gardens: gardenSettings, pesticides }, "Bahçe Ayarları Başarıyla Listelendi").success(res)

        })
        .catch((err) => {
            throw new APIError(err.message, 400);
        })
}

const updateGardenSettings = async (req, res) => {
    const { gardenId, automaticScan, automaticSpraying, scanPeriode } = req.body;
    let { slot1, slot2, slot3, slot4 } = req.body
    slot1 === "" ? slot1 = "63eae7048cf96b9cd73cd051" : slot1;
    slot2 === "" ? slot2 = "63eae7048cf96b9cd73cd051" : slot2;
    slot3 === "" ? slot3 = "63eae7048cf96b9cd73cd051" : slot3;
    slot4 === "" ? slot4 = "63eae7048cf96b9cd73cd051" : slot4;
    await garden.updateOne({ _id: gardenId }, {
        automaticScan,
        automaticSpraying,
        slots: {
            slot1,
            slot2,
            slot3,
            slot4,
        },
        scan: {
            periode: scanPeriode
        }
    })
        .then((data) => {
            new Response(data, "Başarıyla Güncellendi").success(res);
        })
        .catch((err) => {
            console.log(err.message);
            throw new APIError("Bahçe Güncellenemedi !", 400);
        })


}

module.exports = { addGarden, getGardens, getGardenDetails, getGardenSettings, updateGardenSettings };