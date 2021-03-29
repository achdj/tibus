import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { keys } from 'lodash-es';
import * as _ from 'lodash';
//import _ from "lodash";
import { DatePipe } from '@angular/common';
import { __assign } from 'tslib';

@Injectable({
  providedIn: 'root'
})



export class PaygateService {

  constructor(
    private http: HttpClient,
  ) { }

  configUrl = 'assets/config.json';

  getConfig() {
    return this.http.get(this.configUrl);
  }

  transactionList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    num: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    auth_token: new FormControl('', Validators.required),
    phone_number: new FormControl('', [Validators.required, Validators.minLength(8)]),
    amount: new FormControl('', Validators.required),
    description: new FormControl(''),
    identifier: new FormControl('', Validators.required),
    isActivate: new FormControl(false)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      num: '',
      nom: '',
      auth_token: '',
      phone_number: '',
      amount: '',
      description: '',
      identifier: '',
      isActivate: false
    });
  }


  /*getCompagnies() {
    this.transactionList = this.firebase.list("transactions");
    return this.transactionList.snapshotChanges();
  }*/

  
  insertTransaction(transaction) {
    this.transactionList.push({
      num: transaction.num,
      nom: transaction.nom,
      auth_token: transaction.auth_token,
      phone_number: transaction.phone_number,
      amount: transaction.amount,
      description: transaction.description,
      identifier: transaction.identifier,
      isActivate: transaction.isActivate
    });
  }

}
