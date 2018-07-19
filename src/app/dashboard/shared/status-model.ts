export class StatusModel {
  id: number;
  name: string;
  isChecked: boolean;

  constructor(data, status = false) {
    this.id = data.id;
    this.name = data.name;
    this.isChecked = status;
  }
}
