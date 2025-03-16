import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonDirective, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, GutterDirective, InputGroupComponent, InputGroupTextDirective, RowComponent, ButtonCloseDirective, ModalModule } from '@coreui/angular';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
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
    NgFor,
    IconDirective,
    ModalModule,
    ButtonDirective,
    ButtonCloseDirective,
    ReactiveFormsModule, 
    FormsModule, 
    FormLabelDirective, 
    FormControlDirective,
    InputGroupComponent, InputGroupTextDirective,
    NgIf
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {

  form: FormGroup;

  messages: string="";

  constructor(
    private formBuilder: FormBuilder,
    private calendrierService:CalendrierService,
    private loader:LoaderService,
    private router: Router
  ){
    this.form = this.formBuilder.group({
      dateConcours: ['', Validators.required]
    });
  }

  @Input() showUpdate:boolean=false;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input() id: string | number | undefined;
  @Input() dateConcours: string | undefined;

  save() {
    if (this.form.status === 'VALID') {
      this.loader.show();
  
      const body = this.form.value;
      const id = this.id ? Number(this.id) : undefined;
  
      if (id !== undefined && !isNaN(id)) {
        this.calendrierService.update(id, body).subscribe(
          (response) => {
            this.loader.hide();
            this.form.reset();
            this.close.emit(true);
            this.showUpdate = false;
            this.router.navigate(['/calendrier/liste'], { queryParams: { page: 'last' } });
          },
          (error) => {
            this.loader.hide();
            this.messages = error.error.erreurs[0]?.messageErreur || 'An error occurred';
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: this.messages,
              confirmButtonText: 'OK'
            });
          }
        );
      }else{
        console.log("ID non trouvé");
        
      }
    }
  }
  

  toggleLiveDemo() {
    this.showUpdate = !this.showUpdate;
  }

  ngOnChanges() {
    console.log('Received dateConcours:', this.dateConcours);
    if (this.dateConcours && this.form) {
      this.form.patchValue({ dateConcours: this.dateConcours });
    }
  }
  

}
