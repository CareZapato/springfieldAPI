"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const CharacterService_1 = require("../services/CharacterService");
class CharacterController {
    constructor() {
        this.url = 'mongodb://localhost';
        this.PORT = '27017';
        this.router = express_1.default.Router();
        this.path = '/characters';
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const options = {
                useUnifiedTopology: true
            };
            const client = new mongodb_1.MongoClient(this.url + ":" + this.PORT, options);
            client.connect();
            const db = client.db('test');
            const characters = yield db.collection('characters').find().toArray();
            res.send(characters);
        });
        this.characterService = new CharacterService_1.CharacterService();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.path, this.getAll);
    }
}
exports.CharacterController = CharacterController;
