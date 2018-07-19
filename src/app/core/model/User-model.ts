export class UserModel {
  public id: number;
  public name: string;
  public email: string;
  public firstName: string;
  public lastName: string;

  constructor(data) {
    this.id = data.pk;
    this.email = data.email;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.name = data.username;
  }
}
