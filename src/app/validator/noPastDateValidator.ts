import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const noPastDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
  
    return selectedDate < today ? { pastDate: true } : null;
}