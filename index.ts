import express, { Request, Response } from 'express';
import { CharacterController } from './src/controllers/CharacterController';

export const app = express();
export const port = 3030;
export const url = 'mongodb://localhost:27017';

const characterController = new CharacterController(app);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

