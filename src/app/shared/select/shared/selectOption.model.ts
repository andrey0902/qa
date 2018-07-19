export class SelectOptionModel {
  id: any;
  name: string;
  isChecked: boolean;
  disabled?: boolean;
  isLabel?: boolean;
  parentId?: any;
  params?: any;
  classes?: string;
  image?: string;
  value?: any;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.isChecked = false;
    this.disabled = data.disabled;
    this.isLabel = data.isLabel;
    this.image = data.image;
    this.value = data.value;
 }

 public get sendValue() {
    return this.value;
 }
}
