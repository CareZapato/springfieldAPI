"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const characterSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    identification: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: Date, required: true },
    address: { type: String, required: true },
    job: { type: String, required: true }
});
exports.CharacterModel = mongoose_1.default.model('Character', characterSchema);
