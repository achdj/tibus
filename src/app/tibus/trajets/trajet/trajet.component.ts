import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { TrajetService } from '../../../general/services/trajet.service';
import { NotificationService } from '../../../general/services/notification.service';
import { CompagnieService } from '../../../general/services/compagnie.service';
import { StationService } from '../../../general/services/station.service';

@Component({
  selector: 'app-trajet',
  templateUrl: './trajet.component.html',
  styleUrls: ['./trajet.component.scss']
})
export class TrajetComponent implements OnInit {

  constructor(
    public service: TrajetService,
    public compagnieService: CompagnieService,
    public stationService: StationService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<TrajetComponent>
  ) { }

  ngOnInit(): void {
    this.service.getTrajets();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value){
        this.service.insertTrajet(this.service.form.value);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updateTrajet(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Modifier avec succes');
        this.onClose();
      }
      
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  getStationList(event){
    /*getStationNom($key) {
      if ($key == "0")
        return "";
      else{
        return _ .find(this.array, (obj) => { return obj.$key == $key; })['nom'];
      }
    }*/
    const c = event.value;
    this.stationService.getStations(c);
  }
}
