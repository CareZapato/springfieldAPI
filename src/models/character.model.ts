import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  identification: { type: String, required: true },
  gender: { type: String, required: true },
  birthDate: { type: Date, required: true },
  address: { type: String, required: true },
  job: { type: String, required: true }
});

export const CharacterModel = mongoose.model('Character', characterSchema);