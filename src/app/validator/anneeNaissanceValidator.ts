import { AbstractControl, ValidationErrors } from '@angular/forms';
import moment from 'moment';

export function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return { required: true };
  }
  // Vérifie si la date est au format DD/MM/YYYY
  const date = moment(value, 'YYYY-MM-DD', true);  // S'assurer que la date soit dans le format correct

  if (!date.isValid()) {
    return { invalidDate: true };  // Date invalide si le format ne correspond pas
  }

  const year = date.year();
  const thisYear = moment().year();  // Utilisation de moment() pour l'année actuelle
  const age = thisYear - year;

  // Vérifie si l'âge est inférieur à 11 ou supérieur à 80
  if (age < 11 || age > 80) {
    return { outOfRange: true };  // Âge invalide
  }

  return null;  // La date est valide
}
