export class UserModel {
  public id: number;
  public name: string;
  public email: string;
  public firstName: string;
  public lastName: string;

  constructor(data) {
    this.id = data;
  }
}
