
export class SessionService {
  /**
   * set user in local storage
   * */
  public static setUser(value: any): void {
    localStorage.setItem('qa.user', JSON.stringify(value) );
  }
  /**
   * get user from local storage
   * */
  public static getUser() {
    return JSON.parse(localStorage.getItem('qa.user'));
  }


  /**
   * set user in local storage
   * */
  public static setKey (value: any): void {
    SessionService.setStore(value, 'qa.key');
  }
  /**
   * get user from local storage
   * */
  public static getKey() {
    return SessionService.getStore('qa.key');
  }

  public static setStore(value, key: string) {
    localStorage.setItem(key, JSON.stringify(value) );
  }

  public static getStore(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
