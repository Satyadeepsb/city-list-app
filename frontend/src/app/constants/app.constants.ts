export class AppConstants {
  public static readonly BE_API_URL = 'http://localhost:8181';
  public static readonly REST = '/rest';
  public static readonly API = '/api';
  public static readonly VERSION_1 = '/v1';
  public static readonly BASE_URL_V1 =
    AppConstants.BE_API_URL +
    AppConstants.REST +
    AppConstants.API +
    AppConstants.VERSION_1;
  public static readonly CITIES = '/cities';
  public static readonly REST_CITIES =
    AppConstants.BASE_URL_V1 + AppConstants.CITIES;
}
