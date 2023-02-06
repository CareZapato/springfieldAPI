import { MongoClient, MongoClientOptions } from 'mongodb';
import express, { Request, Response } from 'express';
import moment from 'moment';
import { Citizen } from '../models/Citizen';
import { Constants } from '../constants';


export class CitizenService {
  //ruta de conexion bd
  public constants = new Constants;
  public url = `mongodb://${this.constants.URLBASE_MONGO}:${this.constants.PORT_MONGO}`;
  // Parametros de inicialización de la conexión a la base de datos con MongoDB
  public options: MongoClientOptions = {
    useUnifiedTopology: true
  } as MongoClientOptions;

  constructor(){
  }

  /**
   * Funcion que retorna todos los ciudadanos en la base de datos que cumplan con los filtros especificados en los parametros de la consulta (queryParams).
   * 
   * @param {Request} req - La solicitud HTTP con los parametros de la consulta
   * @param {Response} res - La respuesta HTTP con la lista filtrada de ciudadanos
   */
  public getAll = async (req: Request, res: Response) => {
    console.log('[INFO][CitizenService] Servicio getAll');
    try {
      const client = await new MongoClient(this.url, this.options).connect();
      const db = client.db(this.constants.DBNAME_MONGO);
      const citizens = await db.collection(this.constants.COLLECTIONS_SIMPSONS_MONGO).find().toArray();
      
      //QueryParams

      // ciudadanos filtrados
      let filteredCitizens = citizens;

      // en un rango de edad: minimo de edad, maximo de edad, rango de edad
      if (req.query.ageMin || req.query.ageMax) {
        filteredCitizens = filteredCitizens.filter(citizen => {
          const birthdate = moment(citizen.birthdate, "MM/DD/YYYY");
          const age = moment().diff(birthdate, "years");
          if (req.query.ageMin && age < parseInt(req.query.ageMin.toString())) {
            return false;
          }
          if (req.query.ageMax && age > parseInt(req.query.ageMax.toString())) {
            return false;
          }
          return true;
        });
      }

      // nombre
      let name = '';
      if (req.query.name && typeof req.query.name === 'string') {
        name = req.query.name.toLowerCase();
      }
      if (name) {
        filteredCitizens = filteredCitizens.filter(citizen => {
            return citizen.name.toLowerCase().includes(name.toLowerCase());
        });
      }

      // apellido
      let lastName = '';
      if (req.query.lastName && typeof req.query.lastName === 'string') {
        lastName = req.query.lastName.toLowerCase();
      }
      if (req.query.lastName) {
        filteredCitizens = filteredCitizens.filter(citizen => {
          return citizen.lastName.toLowerCase().includes(lastName.toLowerCase());
        });
      }

      // si esta vivo
      if (req.query.isAlive) {
        filteredCitizens = filteredCitizens.filter(
          citizen => citizen.isAlive === (req.query.isAlive === 'true')
        );
      }
    
      // si es adulto
      if (req.query.isAdult) {
        filteredCitizens = filteredCitizens.filter(citizen => {
          const birthdate = moment(citizen.birthdate, "MM/DD/YYYY");
          const age = moment().diff(birthdate, "years");
    
          return age >= 18 === (req.query.isAdult === "true");
        });
      }
      
      // de que genero es: m, f, nodef
      if (req.query.gender) {
        filteredCitizens = filteredCitizens.filter(citizen => {
          return citizen.gender === req.query.gender;
        });
      }
      
      // un extracto de la direccion
      let address = '';
      if (typeof req.query.address === 'string') {
          address = req.query.address.toLowerCase();
      }
      if (req.query.address) {
        filteredCitizens = filteredCitizens.filter(citizen => {
          return citizen.address.toLowerCase().includes(address);
        });
      }
      
      // su trabajo
      let job = '';
      if (typeof req.query.address === 'string') {
        address = req.query.address.toLowerCase();
      }
      if (req.query.job) {
        filteredCitizens = filteredCitizens.filter(citizen => {
          return citizen.job.toLowerCase().includes(job);
        });
      }
      
      // Se envian al controlador los valores de los ciudadanos filtrados
      res.send(filteredCitizens);
      client.close();
    } catch (error) {
      console.error(error);
      console.error('[ERROR][CitizenService] Servicio getAll',error);
      res.status(500).send({ message: 'Error al consultar la base de datos' });
    }
    console.log('[INFO][CitizenService] Fin Servicio getAll');
  };
  
  /**
   * Método que obtiene los ciudadanos de la base de datos de acuerdo al filtro enviado en la petición.
   * 
   * @param req Objeto Request con la petición del usuario.
   * @param res Objeto Response para enviar la respuesta al usuario.
   */
  public getCitizen = async (req: Request, res: Response) => {
    console.log('[INFO][CitizenService] Servicio getCitizen');
    try {
      const client = await new MongoClient(this.url, this.options).connect();
      const db = client.db(this.constants.DBNAME_MONGO);
      
      //
      const filter = req.params.filter;
      // Esta busqueda compara con algunos campos del ciudadano
      const citizens = await db.collection(this.constants.COLLECTIONS_SIMPSONS_MONGO).find({
        $or: [
          { name: filter },
          { job: filter },
          { gender: filter }, 
          { occupation: filter }
        ]
      }).toArray();
      //se envian los ciudadanos filtrados
      res.send(citizens);
      client.close();
    } catch (error) {
      console.error(error);
      console.error('[ERROR][CitizenService] Servicio getCitizen',error);
      res.status(500).send({ message: 'Error al consultar la base de datos' });
    }
    console.log('[INFO][CitizenService] Fin Servicio getCitizen');
  };

  /**
  setIsAlive es una función que se encarga de actualizar el estado de vida de un ciudadano en la base de datos.
  Recibe como parámetro el nombre del ciudadano y actualiza su estado de vida en la base de datos a false.
  Este servicio es accedido a través del método PUT y actualiza en tiempo real el estado de vida del ciudadano.
  */
  public markAsDeceased = async (req: Request, res: Response) => {
    console.log('[INFO][CitizenService] Servicio markAsDeceased');
    try {
      const client = await new MongoClient(this.url, this.options).connect();
      const db = client.db(this.constants.DBNAME_MONGO);

      // Obtener el nombre del ciudadano a partir de la petición
      const name = req.params.name;

      // Actualizar el estado de isAlive a false en la base de datos
      const updatedCitizen = await db.collection(this.constants.COLLECTIONS_SIMPSONS_MONGO).updateOne(
        { name: name },
        { $set: { isAlive: false } }
      );

      // Mensaje para la respuesta
      let message='';
      if(updatedCitizen.matchedCount>0){

        // Obtener los datos del ciudadano actualizado
        const citizen = await db.collection(this.constants.COLLECTIONS_SIMPSONS_MONGO).find({ name: name }).toArray();
        message = updatedCitizen.modifiedCount == 1 ? 
        `Se ha confirmado el fallecimiento de ${citizen[0].name} ${citizen[0].lastName}` :
        `Ya se había inscrito a ${citizen[0].name} ${citizen[0].lastName} anteriormente en la funeraria Springfield`
      }else{
        message = `No se ha encontrado a ${req.params.name} dentro de los registros de springfield`;
      }
      res.send({ message: message});
      client.close();
    } catch (error) {
      console.error('[ERROR][CitizenService] Servicio markAsDeceased',error);
      res.status(500).send({ message: 'Error al actualizar el estado en la base de datos' });
    }
    console.log('[INFO][CitizenService] Fin Servicio markAsDeceased');
  };

  /**
   * Este método permite agregar un nuevo ciudadano a la base de datos.
   * Recibe un objeto JSON con los valores del ciudadano y los guarda en la base de datos.
   * 
   * @param req Petición HTTP que contiene el objeto JSON con los valores del ciudadano.
   * @param res Respuesta HTTP que indica si la operación fue exitosa o no.
   */
  public addCitizen = async (req: Request, res: Response) => {
    console.log('[INFO][CitizenService] Servicio addCitizen');
    try {
      // Conectarse a la base de datos
      const client = await new MongoClient(this.url, this.options).connect();
      const db = client.db(this.constants.DBNAME_MONGO);

      // Extraer los valores del ciudadano de la petición
      const citizen: Citizen = req.body;

      // Se verifica que no exista previamente en la BD
      const citizens = await db.collection(this.constants.COLLECTIONS_SIMPSONS_MONGO).find({
        $and: [
          { name: citizen.name },
          { lastName: citizen.lastName }
        ]
      }).toArray();
      let message = '';
      if(citizens.length == 0){
        // Agregar el nuevo ciudadano a la base de datos
        const result = await db.collection(this.constants.COLLECTIONS_SIMPSONS_MONGO).insertOne(citizen);

        // Verificar si el ciudadano fue agregado exitosamente      
        if (result.insertedId) {
          message = `${citizen.name} ${citizen.lastName} ha sido agregado exitosamente a la base de datos.`;
        } else {
          message = `No se pudo agregar a ${citizen.name} ${citizen.lastName} a la base de datos.`;
        }        
      }else{
        // Mensaje si el ciudadano ya estaba en la BD
        message = `${citizen.name} ${citizen.lastName} ya esta previamente en la base de datos, No se agrega.`;
      }
      // Enviar la respuesta a la petición
      res.send({ message: message });

      // Cerrar la conexión con la base de datos
      client.close();
    } catch (error) {
      console.error('[ERROR][CitizenService] Servicio addCitizen',error);
      res.status(500).send({ message: 'Error al agregar el ciudadano a la base de datos.' });
    }
    console.log('[INFO][CitizenService] Fin Servicio addCitizen');
  };

  /**
   * Este servicio se encarga de dar el mensaje de presentacion al estar en la ruta host//springfield/
   */
  public main = async (req: Request, res: Response) => {
    console.log('[INFO][CitizenService] Servicio main');
      // Enviar la respuesta a la petición
    res.send({ message: this.constants.MAIN_MESSAGE });
    console.log('[INFO][CitizenService] Fin Servicio addCitizen');
  }
}


