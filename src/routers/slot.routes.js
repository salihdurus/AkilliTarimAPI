const router = require("express").Router();
const { addSlot } = require("../controllers/slot.controller");
const { tokenCheck } = require("../middlewares/auth");

router.post("/add-slot", tokenCheck, addSlot);
module.exports = router;