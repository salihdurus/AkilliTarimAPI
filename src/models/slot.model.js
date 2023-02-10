const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const slotSchema = new mongoose.Schema({
    garden: {
        type: Schema.Types.ObjectId,
        ref: "gardens"
    },
    slotNo: {
        type: Number,
        require: true
    },
    pesticideInSlot: {
        type: Schema.Types.ObjectId,
        ref: "pesticides"
    }
}, { collection: "slots", timestamps: true });

const slot = mongoose.model("slot", slotSchema);
module.exports = slot;