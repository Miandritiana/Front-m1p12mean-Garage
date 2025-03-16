import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, GutterDirective, InputGroupComponent, InputGroupTextDirective, RowComponent } from '@coreui/angular';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { Niveau } from 'src/app/modele/Niveau';
import { Sujet } from 'src/app/modele/Sujet';
import { LoaderService } from 'src/app/services/loader.service';
import { NiveauService } from 'src/app/services/niveau.service';
import { SujetService } from 'src/app/services/sujet.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    EditorModule,
    ButtonDirective,
    FormsModule,
    ReactiveFormsModule,
    InputGroupComponent, InputGroupTextDirective,
    FormDirective, 
    FormLabelDirective, 
    FormControlDirective,
    RowComponent,ColComponent,
    FormSelectDirective,
    NgFor
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  myForm: FormGroup;
  @ViewChild('editor') editor!: EditorComponent;
  sujet:Sujet|undefined;
  idSujet:number=0;
  niveau:Niveau[]=[]
  mois: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
    height:500,
    resize: false,
    menubar: false,
    language: 'fr_FR',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  };


  save(){
    const data = this.myForm.value;
    this.sujetService.update(this.idSujet,data).subscribe(
      data=> {
        this.router.navigate([`/sujet/fiche/${data.idSujet}`]);
      },  
    )

  }

  constructor(private router: Router, private formeBuilder: FormBuilder,  
    private loader : LoaderService,
    private sujetService:SujetService,
    private activatedRoute: ActivatedRoute,
    private niveauService:NiveauService
  ) {
    this.idSujet =parseInt( this.activatedRoute.snapshot.paramMap.get('id')!);
    this.getData();
    this.myForm = this.formeBuilder.group({
      sujet: [''],
      idNiveau:[''],
      mois:[''],
      annee:['']
    });
    this.sujetService.get(this.idSujet).subscribe(
      data=> {
        if(data) {
          this.sujet=data;
          this.myForm.setValue({
            sujet: this.sujet?.sujet,
            idNiveau: this.sujet?.idNiveau,
            mois: this.sujet?.mois,
            annee: this.sujet?.annee,
          });
        }
      },  
    )
    
  }

  
  private getData(){
    this.niveauService.getAll().subscribe(
      data=> {
        if(data) {
          this.niveau = data;
          console.log(this.niveau)
        }
      },  
    )
  }

}
