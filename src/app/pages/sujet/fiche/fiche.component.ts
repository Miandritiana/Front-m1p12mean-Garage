import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent,
  ColComponent, 
  RowComponent, 
  TextColorDirective,  } from '@coreui/angular';
import { Sujet } from 'src/app/modele/Sujet';
import { LoaderService } from 'src/app/services/loader.service';
import { SujetService } from 'src/app/services/sujet.service';

@Component({
  selector: 'app-fiche',
  standalone: true,
  imports: [
    CardComponent, 
    CardHeaderComponent, 
    CardBodyComponent,
    CardFooterComponent, 
    ColComponent, 
    TextColorDirective,
    RowComponent ,
    ButtonDirective,
  ],
  templateUrl: './fiche.component.html',
  styleUrl: './fiche.component.scss'
})
export class FicheComponent {
  sujet :Sujet|undefined;
  idSujet:number=0;
  constructor(private loader:LoaderService,
    private sujetService:SujetService,
    private activatedRoute: ActivatedRoute,
    private router: Router){
      this.idSujet =parseInt( this.activatedRoute.snapshot.paramMap.get('id')!);
      this.getData();
  }

  public getData(){
    this.loader.show();
    this.sujetService.get(this.idSujet).subscribe(
      data=> {
        this.loader.hide();
        if(data) {
          this.sujet=data;
        }
      },
      error=>{
        this.loader.hide();
      }  
    )
  }

  
  redirigerUpdate(){
    this.router.navigate([`/sujet/update/${this.idSujet}`]);
  }


}
