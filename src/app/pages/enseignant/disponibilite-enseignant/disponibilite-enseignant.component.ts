import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, ColComponent,  FormControlDirective, FormFeedbackComponent, FormLabelDirective, RowComponent, TextColorDirective } from '@coreui/angular';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { Enseignant } from 'src/app/modele/Enseignant';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';
import { DropdownModule } from 'primeng/dropdown';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { Calendrier } from 'src/app/modele/Calendrier';
import { ActivatedRoute, Router } from '@angular/router';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-disponibilite-enseignant',
  standalone: true,
  imports: [
    RowComponent, 
    ColComponent, 
    TextColorDirective, 
    CardComponent, 
    CardBodyComponent, 
    ReactiveFormsModule,
    FormsModule, 
    FormLabelDirective, 
    FormControlDirective, 
    MultiSelectModule,
    ButtonDirective, 
    FormFeedbackComponent,
    CommonModule,
    CalendarModule,
    DropdownModule
    
  ],
  templateUrl: './disponibilite-enseignant.component.html',
  styleUrl: './disponibilite-enseignant.component.scss'
})
export class DisponibiliteEnseignantComponent implements OnInit {
  datesIndisponibles: Date[] = [
    new Date('2024-11-10'),
    new Date('2024-11-11'),
    new Date('2024-11-12')
  ];
  form: FormGroup= this.formBuilder.group({
    idCalendrier: ['', Validators.required],
    debut: ['08:00:00', Validators.required],
    fin: ['17:00:00', [Validators.required]],
    idEnseignant: ['', [Validators.required]]
  });
  enseignant:Enseignant[]=[];
  calendriers:Calendrier[]=[];
  clickSave:boolean=false;
  idCalendrier:number|undefined;
  idEnseignant: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private enseignantService:EnseignantService,
    private loader:LoaderService,
    private calendrierService:CalendrierService,
    private route: ActivatedRoute,
    private router: Router) {
      this.getData();
      this.getCalendrierData();
      this.idCalendrier=parseInt(this.route.snapshot.queryParamMap.get('idCalendrier')!);
      if(this.idCalendrier){
        this.form.patchValue({ 'idCalendrier': this.idCalendrier });
      }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idEnseignant = params['idEnseignant'];

      if (this.idEnseignant) {
        this.form.patchValue({
          idEnseignant: [Number(this.idEnseignant)] // Ensure it’s an array for multiSelect
        });
      }

    });

    this.getData();

  }

  getDateDuJour(){
    var date=new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  }
  
  private getData(){
    this.loader.show();
    this.enseignantService.get().subscribe(
      data=> {
        this.loader.hide();
        if(data) {
          this.enseignant = data;
        }
      },  
      error=>{
        this.loader.hide();
      }
    )
  }

  private getCalendrierData(){
    this.loader.show();
    this.calendrierService.getAvenir().subscribe(
      data=> {
        this.loader.hide();
        if(data) {
          this.calendriers = data;
        }
      },  
      error=>{
        this.loader.hide();
      }
    )
  }
  save(){
    this.clickSave=false;
    if(this.form.status==='VALID'){
      this.loader.show();
      var data={
        idCalendrier: this.form.value.idCalendrier, 
        debut: this.form.value.debut+"00", 
        fin: this.form.value.fin+"00", 
        idEnseignant: this.form.value.idEnseignant
      }
      this.enseignantService.insert(data).subscribe(
        (response) => {
          this.loader.hide();
          this.form.reset();
          this.router.navigate(['/enseignant/liste-disponibilite-enseignant'], { queryParams: { page: 'last' } });
        },
        (error) => {
          this.loader.hide();
          var message = error.error.erreurs[0].messageErreur ;
          Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error'
          });
        }
      );
    }
    else{
      this.clickSave=true;
    }

    
  }

}
