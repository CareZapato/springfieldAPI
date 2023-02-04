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
exports.CitizenService = void 0;
const mongodb_1 = require("mongodb");
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
class CitizenService {
    constructor() {
        this.url = 'mongodb://127.0.0.1:27017';
        this.router = express_1.default.Router();
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("req:", req);
            console.log("getAll");
            const options = {
                useUnifiedTopology: true
            };
            try {
                const client = yield new mongodb_1.MongoClient(this.url, options).connect();
                const db = client.db('simpsons');
                const citizens = yield db.collection('characters').find().toArray();
                //QueryParams
                // ciudadanos filtrados
                let filteredCitizens = citizens;
                // en un rango de edad: minimo de edad, maximo de edad, rango de edad
                if (req.query.ageMin || req.query.ageMax) {
                    filteredCitizens = filteredCitizens.filter(citizen => {
                        const birthdate = (0, moment_1.default)(citizen.birthdate, "MM/DD/YYYY");
                        const age = (0, moment_1.default)().diff(birthdate, "years");
                        if (req.query.ageMin && age < parseInt(req.query.ageMin.toString())) {
                            return false;
                        }
                        if (req.query.ageMax && age > parseInt(req.query.ageMax.toString())) {
                            return false;
                        }
                        return true;
                    });
                }
                // si esta vivo
                if (req.query.isAlive) {
                    filteredCitizens = filteredCitizens.filter(citizen => citizen.isAlive === (req.query.isAlive === 'true'));
                }
                // si es adulto
                if (req.query.isAdult) {
                    filteredCitizens = filteredCitizens.filter(citizen => {
                        const birthdate = (0, moment_1.default)(citizen.birthdate, "MM/DD/YYYY");
                        const age = (0, moment_1.default)().diff(birthdate, "years");
                        return age >= 18 === (req.query.isAdult === "true");
                    });
                }
                if (req.query.gender) {
                    filteredCitizens = filteredCitizens.filter(citizen => {
                        return citizen.gender === req.query.gender;
                    });
                }
                if (req.query.address) {
                    filteredCitizens = filteredCitizens.filter(citizen => {
                        return citizen.address.toLowerCase().includes(req.query.address.toLowerCase());
                    });
                }
                if (req.query.job) {
                    filteredCitizens = filteredCitizens.filter(citizen => {
                        return citizen.job.toLowerCase().includes(req.query.job.toLowerCase());
                    });
                }
                res.send(citizens);
                client.close();
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Error al consultar la base de datos' });
            }
        });
        this.getCitizen = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("getCitizen");
            const options = {
                useUnifiedTopology: true
            };
            try {
                const client = yield new mongodb_1.MongoClient(this.url, options).connect();
                const db = client.db('simpsons');
                const filter = req.params.filter;
                const citizens = yield db.collection('characters').find({
                    $or: [
                        { name: filter },
                        { job: filter },
                        { catchPhrase: filter },
                        { age: filter },
                        { gender: filter },
                        { occupation: filter }
                    ]
                }).toArray();
                res.send(citizens);
                client.close();
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ message: 'Error al consultar la base de datos' });
            }
        });
    }
}
exports.CitizenService = CitizenService;
