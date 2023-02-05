import express, { Request, Response } from 'express';
import { CitizenController } from './src/controllers/CitizenController';

export const app = express();
export const port = 3030;

const citizenController = new CitizenController(app);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

