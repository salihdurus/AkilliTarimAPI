const router = require("express").Router();
const { addGarden,getGardens,getGardenDetails } = require("../controllers/garden.controller");
const { tokenCheck } = require("../middlewares/auth");


router.post("/add-garden", tokenCheck, addGarden);
router.get("/get-gardens", tokenCheck, getGardens);
router.get("/get-garden-details?:gardenId", tokenCheck, getGardenDetails);

module.exports = router;