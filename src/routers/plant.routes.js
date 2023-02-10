const router = require("express").Router();
const { addPlant } = require("../controllers/plant.controller");
const { tokenCheck } = require("../middlewares/auth");

router.post("/add-plant", tokenCheck, addPlant);

module.exports = router;