import { Citizen } from '../Citizen';

const exampleCitizen: Citizen = {
  name: 'Homer',
  lastName: 'Simpson',
  id: '12345',
  gender: 'Male',
  birthDate: new Date('1956-05-12'),
  address: '742 Evergreen Terrace, Springfield',
  job: 'Safety Inspector',
  isAlive: true
};

describe('Citizen interface', () => {
  it('matches the snapshot', () => {
    expect(exampleCitizen).toMatchSnapshot();
  });
});
