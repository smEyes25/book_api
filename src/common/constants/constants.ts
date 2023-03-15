export class Constants {
  //SERVER
  public static SERVER_PORT = 4000;

  //HASH
  public static SALT_ROUNDS = 10;

  //SECRET KEY
  public static JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  public static JWT_EXPIRED_IN = process.env.JWT_EXPIRED_IN;

  //EXCEPTION ERROR
  public static HTTP_NOT_FOUND = 'NOT FOUND';
  public static HTTP_BAD_REQUEST = 'BAD REQUEST';
  public static HTPP_UNAUTHORIZED = 'UNAUTHORIZED';
  public static HTTP_FORBIDDEN = 'FORBIDDEN';
}
