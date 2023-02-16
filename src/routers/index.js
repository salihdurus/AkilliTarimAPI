const router = require("express").Router();
const multer = require("multer");
const upload = require("../middlewares/lib/upload");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const auth = require("./auth.routes");
const garden = require("./garden.routes");
const plant = require("./plant.routes");
const pesticide = require("./pesticide.routes");
const slot = require("./slot.routes");

router.use(auth,garden,plant,pesticide,slot);


router.post("/upload", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError)
            throw new APIError("Resim yüklenirken Multer Kaynaklı Hata Oluştu : ", err);
        else if (err)
            throw new APIError("Resim yüklenirken Hata Oluştu : ", err);
        else return new Response(req.savedImages, "Yükleme Başarılı").success(res);
    })
})


module.exports = router;