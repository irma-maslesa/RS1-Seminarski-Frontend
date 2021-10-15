export class StatistikaApi {
  public static GET_STATISTIKA_BY_UTAKMICA_ID = "https://api.p2036.app.fit.ba/statistika/#";
  static CREATE_STATISTIKA = 'https://api.p2036.app.fit.ba/statistika';

  public static GET_STATISTIKA_KLUB_BY_ID = "https://api.p2036.app.fit.ba/statistika-klub/#";
  public static GET_STATISTIKA_KLUB = 'https://api.p2036.app.fit.ba/statistika-klub'; 
  static CREATE_STATISTIKA_KLUB = 'https://api.p2036.app.fit.ba/statistika-klub';
  public static GET_STATISTIKA_SEZONA_BY_KLUB = "https://api.p2036.app.fit.ba/statistika-klub/#/sezone";

  public static GET_STATISTIKA_IGRAC_BY_ID = "https://api.p2036.app.fit.ba/statistika-igrac/#";
  public static GET_STATISTIKA_IGRAC = 'https://api.p2036.app.fit.ba/statistika-igrac'; 
  static CREATE_STATISTIKA_IGRAC = 'https://api.p2036.app.fit.ba/statistika-igrac';
  public static GET_STATISTIKA_UTAKMICA_BY_IGRAC = 'https://api.p2036.app.fit.ba/statistika-igrac/#/utakmice';
  public static GET_STATISTIKA_SEZONA_BY_IGRAC = 'https://api.p2036.app.fit.ba/statistika-igrac/#/sezone';
}