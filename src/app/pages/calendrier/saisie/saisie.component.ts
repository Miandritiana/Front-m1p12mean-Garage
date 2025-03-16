import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, ColComponent, ModalModule, RowComponent, ButtonCloseDirective } from '@coreui/angular';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saisie',
  standalone: true,
  imports: [
    ButtonDirective,
    FormsModule,
    ReactiveFormsModule,
    RowComponent, ColComponent,
    ModalModule,
    ButtonCloseDirective,
    CalendarModule,
    CommonModule,
    ChipModule
  ],
  templateUrl: './saisie.component.html',
  styleUrl: './saisie.component.scss'
})
export class SaisieComponent {

  form: FormGroup;
  messages: string = "";
  formattedDates: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private calendrierService: CalendrierService,
    private loader: LoaderService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      dateConcours: [[], Validators.required]  // Doit être un tableau []
    });
  }

  @Input() showSaisie: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  save() {
    console.log("Save fonction appelée !");
    console.log("Valeurs du formulaire :", this.form.value);

    if (this.form.valid) {
      const calendriers = this.form.value.dateConcours.map((date: Date) => ({
        dateConcours: date.toISOString().split('T')[0],
        description: "Concours programmé"
      }));

      this.loader.show();
      this.calendrierService.saveMultiple(calendriers).subscribe(
        (response) => {
          this.loader.hide();
          this.form.reset();
          this.close.emit(true);
          this.showSaisie = false;
          this.router.navigate(['/calendrier/liste'], { queryParams: { page: 'last' } });
        },
        (error) => {
          this.loader.hide();
          this.messages = error.error.erreurs[0]?.messageErreur || "Une erreur est survenue";
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: this.messages,
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.log("Formulaire invalide !");
    }
  }

  toggleLiveDemo() {
    this.showSaisie = !this.showSaisie;
  }

  updateChips() {
    this.formattedDates = this.form.value.dateConcours.map((date: Date) =>
      new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
    );
  }

  removeDate(index: number) {
    const dates = this.form.value.dateConcours;
    dates.splice(index, 1);
    this.form.patchValue({ dateConcours: dates });
    this.updateChips();
  }
}
