import { CitizenService } from '../services/CitizenService';

export class CitizenController {
  public path = '/springfield';

  public citizenService: CitizenService;

  constructor(app?: any) {
    this.citizenService = new CitizenService();
    this.initRoutes(app);
  }

  initRoutes(app?: any) {
    console.log("initRoutes");
    app.get(`${this.path}/citizens`, this.citizenService.getAll);
    app.get(`${this.path}/:filter`, this.citizenService.getCitizen);
    console.log(`${this.path}/citizens`);
  }
}

