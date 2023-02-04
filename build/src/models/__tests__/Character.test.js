"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exampleCharacter = {
    name: 'Homer',
    lastName: 'Simpson',
    id: '12345',
    gender: 'Male',
    birthDate: new Date('1956-05-12'),
    address: '742 Evergreen Terrace, Springfield',
    job: 'Safety Inspector'
};
describe('Character interface', () => {
    it('matches the snapshot', () => {
        expect(exampleCharacter).toMatchSnapshot();
    });
});
