import express, { Request, Response } from 'express';
import { CitizenController } from './src/controllers/CitizenController';
import { Constants } from './src/constants';

const constants = new Constants;

export const app = express();
export const port = constants.API_PORT;

const citizenController = new CitizenController(app);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

