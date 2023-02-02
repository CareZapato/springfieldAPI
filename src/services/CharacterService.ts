import { CharacterModel } from '../models/character.model';
import { Character } from '../models/Character';

export class CharacterService {
  
  constructor(){
  }
  
  public async getAllCharacters(): Promise<Character[]> {
    return await CharacterModel.find();
  }
  
}


