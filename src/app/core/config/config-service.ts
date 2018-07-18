import { environment } from '../../../environments/environment';

export class ConfigService {
  public static basePath: string = environment.basePath;
  public static basePathApi: string = environment.basePathApi;

  public static signInPath = `${ConfigService.basePath}api/profiles/login/`;
  public static signUpPath = `${ConfigService.basePath}api/profiles/`;
}
