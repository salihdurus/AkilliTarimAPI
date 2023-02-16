const router = require("express").Router();
const { addGarden, getGardens, getGardenDetails, getGardenSettings, updateGardenSettings } = require("../controllers/garden.controller");
const { tokenCheck } = require("../middlewares/auth");


router.post("/add-garden", tokenCheck, addGarden);
router.get("/get-gardens", tokenCheck, getGardens);
router.get("/get-garden-details?:gardenId", tokenCheck, getGardenDetails);
router.get("/get-garden-settings", tokenCheck, getGardenSettings);
router.post("/update-garden-settings", tokenCheck, updateGardenSettings);


module.exports = router;