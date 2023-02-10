const mongoose = require("mongoose");

const pesticideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    usageDisease: {
        type: String,
        required: true,
        trim: true,
    },
    dosage: {
        type: String,
        required: true,
        trim: true
    }
}, { collection: "pesticides", timestamps: true });

const pesticide = mongoose.model("pesticide", pesticideSchema);

module.exports = pesticide;