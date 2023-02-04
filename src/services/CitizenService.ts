import { CharacterModel } from '../models/citizen.model';
import { Citizen } from '../models/Citizen';
import { MongoClient, MongoClientOptions } from 'mongodb';
import express, { Request, Response } from 'express';
import moment from 'moment';


export class CitizenService {
  public url = 'mongodb://127.0.0.1:27017';
  public router = express.Router();
  public ajusteEdad = 0;

  constructor(){
  }
  
  public getAll = async (req: Request, res: Response) => {
    
    const options: MongoClientOptions = {
      useUnifiedTopology: true
    } as MongoClientOptions;
    try {
      const client = await new MongoClient(this.url, options).connect();
      const db = client.db('simpsons');
      const citizens = await db.collection('characters').find().toArray();
      
      //QueryParams

      // ciudadanos filtrados
      let filteredCitizens = citizens;

      // en un rango de edad: minimo de edad, maximo de edad, rango de edad
      if (req.query.ageMin || req.query.ageMax) {
        filteredCitizens = filteredCitizens.filter(citizen => {
          const birthdate = moment(citizen.birthdate, "MM/DD/YYYY");
          const age = moment().diff(birthdate, "years")-this.ajusteEdad;
          if (req.query.ageMin && age < parseInt(req.query.ageMin.toString())) {
            return false;
          }
          if (req.query.ageMax && age > parseInt(req.query.ageMax.toString())) {
            return false;
          }
          return true;
        });
      }

      // el nombre
      let name = '';
      if (req.query.name && typeof req.query.name === 'string') {
        name = req.query.name.toLowerCase();
      }
      if (name) {
        filteredCitizens = filteredCitizens.filter(citizen => {
          console.log(citizen.name.toLowerCase()+" --- "+(name.toLowerCase()));
            return citizen.name.toLowerCase().includes(name.toLowerCase());
        });
      }

      // el apellido
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
          const age = moment().diff(birthdate, "years")-this.ajusteEdad;
    
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
      
      res.send(filteredCitizens);
      client.close();
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error al consultar la base de datos' });
    }
  };
  
  public getCitizen = async (req: Request, res: Response) => {
    const options: MongoClientOptions = {
      useUnifiedTopology: true
    } as MongoClientOptions;
    try {
      const client = await new MongoClient(this.url, options).connect();
      const db = client.db('simpsons');
      const filter = req.params.filter;
      const citizens = await db.collection('characters').find({
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
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error al consultar la base de datos' });
    }
  };
}


