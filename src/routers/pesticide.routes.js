const router = require("express").Router();
const { addPesticide } = require("../controllers/pesticide.controller");
const { tokenCheck } = require("../middlewares/auth");

router.post("/add-pesticide", tokenCheck, addPesticide);

module.exports = router;