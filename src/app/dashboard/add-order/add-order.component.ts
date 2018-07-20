import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StatusList } from './shared/status-list';
import { BidType } from './shared/bid-type';

@Component({
  selector: 'qa-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  public orderForm: FormGroup;
  public edit = false;
  public statusList = StatusList;
  public bidType = BidType;
  public statusSettings = {
    showCheckAll: true,
    closeOnClickOutside: true,
    dynamicTitleMaxItems: 1,
    isMultiple: false,
    isShoveChecked: false,
    closeOnSelect: true,
    maxHeight: '100px'
  };
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
    this.init();
  }

  public init() {
    console.log('this.data', this.data);
    if (this.data && this.data.order) {
      this.patchForm(this.data.order);
      this.edit = true;
    }
  }

  public createForm() {
    this.orderForm = this.fb.group({
      name: null,
      quantity: null,
      cost: null,
      status: null,
      bidType: null,
      id: null
    });
  }

  public patchForm(data) {
    this.orderForm.patchValue({
      name: data.name,
      quantity: data.quantity,
      cost: data.cost,
      status: data.status,
      bidType: data.bidType,
      id: data.id
    });
  }

  public onSubmit(form: FormGroup) {
    console.log(form.value);
    this.dialogRef.close({
      edit: this.edit,
      data: form.value
    });
  }
}
