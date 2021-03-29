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
export class StationService {

  constructor(private firebase: AngularFireDatabase) {
    this.stationList = this.firebase.list("stations");
    this.stationList.snapshotChanges().subscribe(
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

  stationList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nom: new FormControl('', Validators.required),
    localites: new FormControl(0, Validators.required),
    isActivate: new FormControl(false)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nom: '',
      localites: 0,
      isActivate: false
    });
  }


  getStations() {
    this.stationList = this.firebase.list("stations");
    return this.stationList.snapshotChanges();
  }

  getStations2() {
    this.stationList = this.firebase.list("stations");
    return this.stationList.snapshotChanges();
  }

  
  insertStation(station) {
    this.stationList.push({
      nom: station.nom,
      localites: station.localites,
      isActivate: station.isActivate
    });
  }

  updateStation(station) {
    this.stationList.update(station.$key,
      {
        nom: station.nom,
        localites: station.localites,
        isActivate: station.isActivate
      });
  }

  deleteStation($key: string) {
    this.stationList.remove($key);
  }

  populateForm(station){
    //this.form.setValue(_.omit(station, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(station, 'localiteNom'));
  }

  getStationNom($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['nom'];
    }
  }
}
