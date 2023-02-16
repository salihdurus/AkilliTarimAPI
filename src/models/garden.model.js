const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gardenSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    border: {
        x: {
            type: Number,
            default: null
        },
        y: {
            type: Number,
            default: null
        }
    },
    isTheNew: {
        type: Boolean,
        default: true,
        trim: true,
    },
    slots: {
        slot1: {
            type: Schema.Types.ObjectId,
            default: "63eae7048cf96b9cd73cd051"
        },
        slot2: {
            type: Schema.Types.ObjectId,
            default: "63eae7048cf96b9cd73cd051"
        },
        slot3: {
            type: Schema.Types.ObjectId,
            default: "63eae7048cf96b9cd73cd051"
        },
        slot4: {
            type: Schema.Types.ObjectId,
            default: "63eae7048cf96b9cd73cd051"
        }

    },
    status: {
        type: String,
        default: "Yeni Eklendi Tanımlanmayı Bekliyor"
    },
    automaticScan: {
        type: Boolean,
        default: false
    },
    scan: {
        time: {
            type: String,
            default: null,
        },
        periode: {
            type: String,
            default: null,
        },
        next: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        }
    },
    automaticSpraying: {
        type: Boolean,
        default: true,
    }
}, { collection: "gardens", timestamps: true });

const garden = mongoose.model("garden", gardenSchema);
module.exports = garden;