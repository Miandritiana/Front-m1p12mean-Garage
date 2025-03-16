import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, GutterDirective, InputGroupComponent, InputGroupTextDirective, RowComponent } from '@coreui/angular';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { LoaderService } from '../../../services/loader.service';
import { SujetService } from '../../../services/sujet.service';
import { NiveauService } from '../../../services/niveau.service';
import { NgFor } from '@angular/common';
import { NiveauTypeFormation } from '../../../modele/NiveauTypeFormation';

@Component({
  selector: 'app-saisie',
  standalone: true,
  imports: [
    EditorModule,
    ButtonDirective,
    FormsModule,
    ReactiveFormsModule,
    FormLabelDirective, 
    FormControlDirective,
    RowComponent,ColComponent,
    FormSelectDirective,
    NgFor
  ],
  templateUrl: './saisie.component.html',
  styleUrl: './saisie.component.scss'
})
export class SaisieComponent {
  myForm: FormGroup;
  @ViewChild('editor') editor!: EditorComponent;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
    height:500,
    resize: false,
    menubar: false,
    language: 'fr_FR',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  };
  niveau: NiveauTypeFormation[]=[]
  mois: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  save(){
    const data = this.myForm.value
    
    this.sujetService.insert(data).subscribe(
      data=> {
        this.router.navigate([`/sujet/fiche/${data.idSujet}`]);
      },  
    )

  }

  constructor(private router: Router, private formeBuilder: FormBuilder,  
    private loader : LoaderService,
    private sujetService:SujetService,
    private niveauService:NiveauService
  ) {
    this.myForm = this.formeBuilder.group({
      sujet: [''],
      idNiveau:[''],
      mois:[''],
      annee:['']
    });
    this.getData();
  }

  private getData(){
    this.loader.show();
    this.niveauService.getListeNiveau(0).subscribe(
      data=> {
        this.loader.hide();
        if(data) {
          this.niveau = data;
        }
      }, 
      error=>{
        this.loader.hide();
      } 
    )
  }

  formatedNomNiveau(nomNiveau: string, nomTypeFormation: string): string {
    return nomNiveau.split(' - ')[0] + " (" + nomTypeFormation.split(' - ')[1] + ")";
  }

}
