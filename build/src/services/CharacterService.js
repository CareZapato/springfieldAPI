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
exports.CharacterService = void 0;
const mongodb_1 = require("mongodb");
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
class CharacterService {
    constructor() {
        this.url = 'mongodb://127.0.0.1:27017/simpsons';
        this.router = express_1.default.Router();
        this.mongoose = new mongoose_1.Mongoose();
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("getAll");
            const options = {
                useUnifiedTopology: true,
                useNewUrlParser: true
            };
            try {
                const client = yield this.mongoose.connect(this.url);
                const db = this.mongoose.connection;
                ;
                const characters = yield db.collection('characters').find().toArray();
                res.send(characters);
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Error al consultar la base de datos' });
            }
        });
        this.getCharacter = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("getCharacter");
            const options = {
                useUnifiedTopology: true
            };
            try {
                const client = yield new mongodb_1.MongoClient(this.url, options).connect();
                const db = client.db('simpsons');
                const filter = req.params.filter;
                const characters = yield db.collection('characters').find({
                    $or: [
                        { name: filter },
                        { job: filter },
                        { catchPhrase: filter },
                        { age: filter },
                        { gender: filter },
                        { occupation: filter }
                    ]
                }).toArray();
                res.send(characters);
                client.close();
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Error al consultar la base de datos' });
            }
        });
        this.mongoose.set('strictQuery', true);
    }
}
exports.CharacterService = CharacterService;
