# SpringfieldAPI v.1.0

## Descripción

SpringfieldAPI es una base de datos que permite analizar la información de ciudadanos de los Simpsons. 

## Ejecución y configuración

### Ejecución desde local

Para ejecutar SpringfieldAPI en su máquina local, siga los siguientes pasos:

1. Clone el repositorio de GitHub
2. Abra una terminal en la carpeta raíz del proyecto
3. Instale las dependencias ejecutando `npm install`
4. Ejecute la API con el comando `npm start`

### Docker

Para levantar SpringfieldAPI en Docker, siga los siguientes pasos:

1. Clone el repositorio de GitHub
2. Abra una terminal en la carpeta raíz del proyecto
3. Construya la imagen de Docker ejecutando `docker build -t springfieldapi .`
4. Inicie un contenedor a partir de la imagen recién construida con `docker run -p 3000:3000 springfieldapi`

### Archivo de configuración

El archivo de configuración de SpringfieldAPI se encuentra dentro de la carpeta `src` y se llama `constants.ts`. En este archivo se pueden configurar los siguientes valores:

- `API_PORT`: Puerto donde se levanta la API
- `URLBASE_MONGO`: url base donde esta la bd de mongodb
- `PORT_MONGO`: puerto de la bd de mongodb
- `DBNAME_MONGO`: nombre de la base de datos en mongo
- `COLLECTIONS_SIMPSONS_MONGO`: nombre de la collection de donde se alojaran los datos

### Base de datos de MongoDB

La base de datos de MongoDB de SpringfieldAPI requiere un formato específico para cargar los ciudadanos de Springfield. A continuación se describe el formato y los valores necesarios:

Citizen = {
  name: 'Homer',
  lastName: 'Simpson',
  gender: 'Male',
  birthDate: '1980-01-01',
  address: '742 Evergreen Terrace, Springfield',
  job: 'Safety Inspector',
  isAlive: true
};

## Servicios

La API SpringfieldAPI v.1.0 ofrece los siguientes servicios para acceder y manipular la base de datos de ciudadanos de los Simpsons:

| Método | Ruta | Descripción |
| ------ | ---- | ----------- |
| GET    | /springfield/citizens | Obtiene todos los ciudadanos registrados en la base de datos |
| GET    | /springfield/citizens/:filter | Obtiene un ciudadano específico de la base de datos a través de un filtro |
| PUT    | /springfield/citizens/markAsDeceased/:name | Marca a un ciudadano como fallecido en la base de datos |
| POST   | /springfield/citizens/addCitizen | Agrega un nuevo ciudadano a la base de datos |

