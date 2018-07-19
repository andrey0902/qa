import { Injectable } from '@angular/core';
import { IMultiSelectOption } from '../type';
import { SelectOptionModel } from '../selectOption.model';

@Injectable()
export class SelectService {
  public checkedAll = false;
  public settings;
  public type;
  private _model: any[] = [];

  constructor() {
  }

  public getModel() {
    if (this.settings.isMultiple) {
      return this._model;
    } else {
      return this._model[0];
    }
  }

  public setModel(value: IMultiSelectOption) {
    if (value) {
      if (this.type !== 'string') {
        this._model.push(value);
      } else {
        this._model.push(value.name);
      }
    }
  }

  public removeModel(option: IMultiSelectOption): void {
    let index;
    if (this.type !== 'string') {
      index = this._model.findIndex(item => {
        return item.id === option.id;
      });
    } else {
      index = this._model.findIndex(item => {
        return item === option.name;
      });
    }

    if (index !== -1) {
      this._model.splice(index, 1);
    }
  }

  public removeAllModel() {
    this._model = [];
  }

  public setAllModel(options: any) {

    if (typeof options === 'string') {
      this._model.push(options);
    } else if (typeof options === 'object' && options[0] !== 'string' && this.type !== 'string') {
      if (options.map) {
        this._model = options.map(option => Object.assign(option));
      } else {
        this._model.push(Object.assign(options));
      }
    } else if (typeof options === 'object' && this.type === 'string' && typeof options[0] !== 'string') {
      options.forEach(item => {
        this._model.push(item.name);
      });
    } else if (typeof options === 'object' && this.type === 'string' && typeof options[0] === 'string') {
      options.forEach(item => {
        this._model.push(item);
      });
    }
  }

  public notMultipleSet(options, option) {
    if (this._model.length === 1) {
      this.setUnchecked(options, option);
      this.removeAllModel();
      this.setModel(option);
    } else {
      this.setModel(option);
    }
  }

  public setUnchecked(list: SelectOptionModel[], option: SelectOptionModel) {
    list.forEach(item => {
      if (item.id !== option.id) {
        item.isChecked = false;
      }
    });
  }

  public maybeStopPropagation(e?: { stopPropagation?: Function }) {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
  }

  public maybePreventDefault(e?: { preventDefault?: Function }) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  }

  public updateTitle(countTitleShow): string {
    let str = '';
    const length = this._model.length - 1;
    if (this.type !== 'string') {
      for (let i = 0; i <= length; i++) {
        if (i === countTitleShow) {
          break;
        }
        if (i <= length - 1) {
          str += this._model[i].name + ', ';
        } else {
          str += this._model[i].name;
        }
      }
    } else {
      for (let i = 0; i <= length; i++) {
        if (i === countTitleShow) {
          break;
        }
        if (i <= length - 1) {
          str += this._model[i] + ', ';
        } else {
          str += this._model[i];
        }
      }
    }
    return str;
  }

  public updatePath(list: IMultiSelectOption[]) {
    if (!this._model[0] || !list) {
      return;
    }
    if ( typeof this._model[0] === 'string') {
      this._model.forEach((item: any) => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].name === item) {
            list[i].isChecked = true;
            break;
          }
        }
      });
    } else {
      this._model.forEach(item => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === item.id) {
            list[i].isChecked = item.isChecked;
            break;
          }
        }
      });
    }
  }
}
