"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const CharacterService_1 = require("../services/CharacterService");
class CharacterController {
    constructor(app) {
        this.path = '/characters';
        this.characterService = new CharacterService_1.CharacterService();
        this.initRoutes(app);
    }
    initRoutes(app) {
        console.log("initRoutes");
        app.get(this.path, this.characterService.getAll);
        app.get(`${this.path}/:filter`, this.characterService.getCharacter);
    }
}
exports.CharacterController = CharacterController;
