"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const CitizenController_1 = require("./src/controllers/CitizenController");
exports.app = (0, express_1.default)();
exports.port = 3030;
exports.url = 'mongodb://mongo:27017';
const citizenController = new CitizenController_1.CitizenController(exports.app);
exports.app.listen(exports.port, () => {
    console.log(`Servidor corriendo en http://localhost:${exports.port}`);
});
