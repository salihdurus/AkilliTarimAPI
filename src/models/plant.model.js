const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const plantSchema = new mongoose.Schema({
    garden: {
        type: Schema.Types.ObjectId,
        ref: "gardens"
    },
    number: {
        type: Number,
        required: true,
    },
    position: {
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        }
    },
    diseaseStatus: {
        type: String,
        default: null
    },
    disease: {
        name: {
            type: String,
            default: null
        },
        photoURL: {
            type: String,
            default: null,
        },
        sprayingStatus: {
            type: Boolean,
            default: null
        },
        usagePesticide: {
            type: Schema.Types.ObjectId,
            ref: "pesticides"
        }

    }
}, { collection: "plants", timestamps: true });

const plant = mongoose.model("plant", plantSchema);
module.exports = plant;