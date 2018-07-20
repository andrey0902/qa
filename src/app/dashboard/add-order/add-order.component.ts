import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StatusList } from './shared/status-list';
import { BidType } from './shared/bid-type';
import { takeUntil } from 'rxjs/internal/operators';
import { ProfileService } from '../../core/services/profile.service';
import { UserModel } from '../../core/model/User-model';
import { Subject } from 'rxjs/index';

@Component({
  selector: 'qa-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit, OnDestroy {
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
  public user: UserModel;
  public onDestroy = new Subject();
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddOrderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.getUser();
    this.init();
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
  }

  public init() {
    if (this.data && this.data.order) {
      this.patchForm(this.data.order);
      this.edit = true;
    }
  }

  public getUser() {
    this.profileService.profileSource$
      .pipe(takeUntil(this.onDestroy))
      .subscribe(res => {
        this.user = res;
        this.createForm();
      });
  }

  public createForm() {
    this.orderForm = this.fb.group({
      name: null,
      quantity: null,
      cost: null,
      status: null,
      bidType: null,
      id: null,
      owner: this.user.id,
    });
  }

  public patchForm(data) {
    this.orderForm.patchValue({
      name: data.name,
      quantity: data.quantity,
      cost: data.cost,
      status: data.status,
      bidType: data.bidType,
      id: data.id,
      owner: this.user.id
    });
  }

  public onSubmit(form: FormGroup) {
    this.dialogRef.close({
      edit: this.edit,
      data: form.value
    });
  }
}
