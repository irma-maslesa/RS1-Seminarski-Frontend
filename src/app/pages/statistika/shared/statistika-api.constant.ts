export class StatistikaApi {
  public static GET_STATISTIKA_BY_UTAKMICA_ID = "https://localhost:5001/statistika/#";
  static CREATE_STATISTIKA = 'https://localhost:5001/statistika';

  public static GET_STATISTIKA_KLUB_BY_ID = "https://localhost:5001/statistika-klub/#";
  public static GET_STATISTIKA_KLUB = 'https://localhost:5001/statistika-klub'; 
  static CREATE_STATISTIKA_KLUB = 'https://localhost:5001/statistika-klub';
  public static GET_STATISTIKA_SEZONA_BY_KLUB = "https://localhost:5001/statistika-klub/#/sezone";

  public static GET_STATISTIKA_IGRAC_BY_ID = "https://localhost:5001/statistika-igrac/#";
  public static GET_STATISTIKA_IGRAC = 'https://localhost:5001/statistika-igrac'; 
  static CREATE_STATISTIKA_IGRAC = 'https://localhost:5001/statistika-igrac';
  public static GET_STATISTIKA_UTAKMICA_BY_IGRAC = 'https://localhost:5001/statistika-igrac/#/utakmice';
  public static GET_STATISTIKA_SEZONA_BY_IGRAC = 'https://localhost:5001/statistika-igrac/#/sezone';
}