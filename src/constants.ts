export class Constants{
    // API
    public API_NAME = 'Springfield API';
    public API_VERSION= "1.0.0";
    public API_AUTOR= 'Pablo Barrera';
    public API_FECHA= '2023/02/06';
    // API Config
    public API_PORT = 3030;

    // MongoDB
    public URLBASE_MONGO = 'localhost';
    public PORT_MONGO = '27017';
    public DBNAME_MONGO = 'simpsons';
    public COLLECTIONS_SIMPSONS_MONGO = 'characters';

    public MAIN_MESSAGE = `Bienvenidos a ${this.API_NAME} v${this.API_VERSION} by ${this.API_AUTOR}@${this.API_FECHA}`; 
}