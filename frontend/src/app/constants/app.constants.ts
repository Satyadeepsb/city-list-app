export class AppConstants {
  public static readonly BE_API_URL = '';
  public static readonly REST = '/rest';
  public static readonly API = '/api';
  public static readonly AUTH = '/auth';
  public static readonly VERSION_1 = '/v1';
  public static readonly BASE_URL_V1 =
    AppConstants.BE_API_URL +
    AppConstants.REST +
    AppConstants.API +
    AppConstants.VERSION_1;
  public static readonly CITIES = '/cities';
  public static readonly REST_CITIES =
    AppConstants.BASE_URL_V1 + AppConstants.CITIES;

  public static readonly AUTH_API =
    AppConstants.BE_API_URL + AppConstants.API + AppConstants.AUTH;
  public static readonly IMAGE_NOT_FOUND_URL =
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';
}
