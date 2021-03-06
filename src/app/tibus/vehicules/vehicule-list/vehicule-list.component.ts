import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiculeService } from 'src/app/general/services/vehicule.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VehiculeComponent } from '../vehicule/vehicule.component';
import { NotificationService } from 'src/app/general/services/notification.service';
import { DialogService } from 'src/app/general/services/dialog.service';
import { CommonModule } from '@angular/common';
import { CompagnieService } from 'src/app/general/services/compagnie.service';


@Component({
  selector: 'app-vehicule-list',
  templateUrl: './vehicule-list.component.html',
  styleUrls: ['./vehicule-list.component.scss']
})
export class VehiculeListComponent implements OnInit {

  constructor(
    private service: VehiculeService,
    private compagnieService: CompagnieService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
  ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['numImmat', 'marque', 'placeTotal', 'placePassager', 'compagnieNom', 'isActivate','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.service.getVehicules().subscribe(
      list => {
        let array = list.map(item => {
          let compagnieNom = this.compagnieService.getCompagnieNom(item.payload.val()['compagnies']);
          return {
            $key: item.key,
            compagnieNom,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        /*this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };*/
      }
    );
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(VehiculeComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(VehiculeComponent, dialogConfig);
  }

  onDelete($key){

    this.dialogService.openConfirmDialog('??tes-vous s??r de supprimer cet enregistrement?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteVehicule($key);
        this.notificationService.warn('! Supprimer avec succes');
      }
    });
    
  }

}
