import { Injectable } from '@angular/core';

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
export class CompagnieService {

  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) {
    this.compagnieList = this.firebase.list("compagnies");
    this.compagnieList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      }
    );
  }

  compagnieList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nom: new FormControl('', Validators.required),
    directeur: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    numero: new FormControl('', [Validators.required, Validators.minLength(8)]),
    localisation: new FormControl(),
    pays: new FormControl(0),
    abnDate: new FormControl(''),
    isActivate: new FormControl(false)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nom: '',
      directeur: '',
      adresse: '',
      email: '',
      numero: '',
      localisation: '',
      pays: 0,
      abnDate: '',
      isActivate: false
    });
  }


  getCompagnies() {
    this.compagnieList = this.firebase.list("compagnies");
    return this.compagnieList.snapshotChanges();
  }

  
  insertCompagnie(compagnie) {
    this.compagnieList.push({
      nom: compagnie.nom,
      directeur: compagnie.directeur,
      adresse: compagnie.adresse,
      email: compagnie.email,
      numero: compagnie.numero,
      localisation: compagnie.localisation,
      pays: compagnie.pays,
      abnDate: compagnie.abnDate == "" ? "" : this.datePipe.transform(compagnie.abnDate, 'yyyy-MM-dd'),
      isActivate: compagnie.isActivate
    });
  }

  updateCompagnie(compagnie) {
    this.compagnieList.update(compagnie.$key,
      {
        nom: compagnie.nom,
        directeur: compagnie.directeur,
        adresse: compagnie.adresse,
        email: compagnie.email,
        numero: compagnie.numero,
        localisation: compagnie.localisation,
        pays: compagnie.pays,
        abnDate: compagnie.abnDate == "" ? "" : this.datePipe.transform(compagnie.abnDate, 'yyyy-MM-dd'),
        isActivate: compagnie.isActivate
      });
  }

  deleteCompagnie($key: string) {
    this.compagnieList.remove($key);
  }

  populateForm(compagnie){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recup??re avec une info d'autre service
    this.form.setValue(_.omit(compagnie, 'paysNom'));
  }

  getCompagnieNom($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['nom'];
    }
  }

  getCompagniePaysNom($key) {
    if ($key == "0")
      return "";
    else{
      return _.find(this.array, (obj) => { return obj.$key == $key; })['pays'];
    }
  }
  
}
