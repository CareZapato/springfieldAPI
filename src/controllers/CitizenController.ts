import { CitizenService } from '../services/CitizenService';
import bodyParser  from 'body-parser';
export class CitizenController {
  public path = '/springfield';

  public citizenService: CitizenService;

  constructor(app?: any) {
    this.citizenService = new CitizenService();
    this.initRoutes(app);
  }

  //rutas de la API para Citizen
  initRoutes(app?: any) {
    //inicializamos bodyparser para poder obtener el body de los request
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    //se inicializan las rutas de nuestra API
    app.get(`${this.path}/citizens`, this.citizenService.getAll);
    app.get(`${this.path}/citizens/:filter`, this.citizenService.getCitizen);
    app.put(`${this.path}/citizens/markAsDeceased/:name`, this.citizenService.markAsDeceased);
    app.post(`${this.path}/citizens/addCitizen`, this.citizenService.addCitizen);
  }
  
  
}

