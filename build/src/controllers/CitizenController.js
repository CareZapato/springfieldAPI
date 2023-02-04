"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitizenController = void 0;
const CitizenService_1 = require("../services/CitizenService");
class CitizenController {
    constructor(app) {
        this.path = '/springfield';
        this.citizenService = new CitizenService_1.CitizenService();
        this.initRoutes(app);
    }
    initRoutes(app) {
        console.log("initRoutes");
        app.get(`${this.path}/citizens`, this.citizenService.getAll);
        app.get(`${this.path}/:filter`, this.citizenService.getCitizen);
        console.log(`${this.path}/citizens`);
    }
}
exports.CitizenController = CitizenController;
