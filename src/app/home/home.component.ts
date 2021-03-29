import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToasterService } from 'angular2-toaster';
import { PaygateService } from 'src/app/general/services/paygate.service';


export interface PeriodicElement {
  $key: string;
  num: string;
  nom: string;
  auth_token: string;
  phone_number: string;
  amount: number;
  description: string;
  identifier: string;
  isActivate: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {$key: '1', num: '1', nom: 'one', auth_token: 'ea4bd962-bd47-4d94-96c8-fce5b03db76c' , phone_number: '93289404', amount: 1500, description: 'teste un', identifier: 't-one', isActivate: false},
  {$key: '2', num: '2', nom: 'two', auth_token: 'ea4bd962-bd47-4d94-96c8-fce5b03db76c' , phone_number: '93289404', amount: 500, description: 'teste two', identifier: 't-two', isActivate: false},
  {$key: '3', num: '3', nom: 'trois', auth_token: 'ea4bd962-bd47-4d94-96c8-fce5b03db76c' , phone_number: '93289404', amount: 10, description: 'teste trois', identifier: 't-trois', isActivate: false},
  {$key: '4', num: '4', nom: 'quatre', auth_token: 'ea4bd962-bd47-4d94-96c8-fce5b03db76c' , phone_number: '93289404', amount: 150, description: 'teste quatre', identifier: 't-quatre', isActivate: false},
  {$key: '5', num: '5', nom: 'cinq', auth_token: 'ea4bd962-bd47-4d94-96c8-fce5b03db76c' , phone_number: '93289404', amount: 300, description: 'teste cinq', identifier: 't-cinq', isActivate: false},
  {$key: '6', num: '6', nom: 'six', auth_token: 'ea4bd962-bd47-4d94-96c8-fce5b03db76c' , phone_number: '93289404', amount: 12500, description: 'teste six', identifier: 't-six', isActivate: false},
  {$key: '7', num: '7', nom: 'sept', auth_token: 'ea4bd962-bd47-4d94-96c8-fce5b03db76c' , phone_number: '93289404', amount: 450, description: 'teste sept', identifier: 't-sept', isActivate: false},
  
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  urlName = 'compagnie';
  constructor(
    public router: Router,
    public service: PaygateService,
    //private route: ActivatedRoute,
  ) { 
    //super(router, toasterService);
  }

  ngOnInit(): void {
  }

  dataSource = ELEMENT_DATA;

  reserverPage() {
    //this.router.navigate([this.urlName + '/add']);
    this.service.insertTransaction(this.dataSource);
    /*if (this.service.form.valid) {
        !this.service.form.get('$key').value
        this.service.insertTransaction(this.dataSource);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
    }*/
  }
}
