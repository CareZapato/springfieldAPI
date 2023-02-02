"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const CharacterController_1 = require("././src/controllers/CharacterController");
exports.app = (0, express_1.default)();
exports.port = 3030;
exports.url = 'mongodb://localhost:27017';
const characterController = new CharacterController_1.CharacterController();
exports.app.use(characterController.path, characterController.router);
console.log("characterController.path ", characterController.path);
console.log("characterController.router ", characterController.router);
exports.app.listen(exports.port, () => {
    console.log(`API running at http://localhost:${exports.port}`);
});
