import express, { Request, Response } from 'express';
import { MongoClient, MongoClientOptions } from 'mongodb';
import { CharacterService } from '../services/CharacterService';

export class CharacterController {
  public url = 'mongodb://localhost:27017';
  public router = express.Router();
  public path = '/characters';
  public characterService: CharacterService;

  constructor(app?: any) {
    this.characterService = new CharacterService();
    this.initRoutes(app);
  }

  initRoutes(app?: any) {
    console.log("initRoutes");
    app.get(this.path, this.getAll);
    app.get(`${this.path}/:filter`, this.getCharacter);
  }

  getAll = async (req: Request, res: Response) => {
    console.log("getAll");
    const options: MongoClientOptions = {
      useUnifiedTopology: true
    } as MongoClientOptions;
    try {
      const client = await new MongoClient(this.url, options).connect();
      const db = client.db('simpsons');
      const characters = await db.collection('characters').find().toArray();
      res.send(characters);
      client.close();
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error al consultar la base de datos' });
    }
  };

  getCharacter = async (req: Request, res: Response) => {
    console.log("getCharacter");
    const options: MongoClientOptions = {
      useUnifiedTopology: true
    } as MongoClientOptions;
    try {
      const client = await new MongoClient(this.url, options).connect();
      const db = client.db('simpsons');
      const filter = req.params.filter;
      const characters = await db.collection('characters').find({
        $or: [
          { name: filter },
        ]
      }).toArray();
      res.send(characters);
      client.close();
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error al consultar la base de datos' });
    }
  };
}

