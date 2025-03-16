import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { allowedDomains } from '../modele/allowedMailOrigins';

// Custom Validator function
export function emailDomainValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // don't validate empty value
    }
    
    const emailParts = control.value.split('@');
    const domain = emailParts[1];
    if (!allowedDomains.includes(domain)) {
      return { invalidDomain: 'Le domaine de votre e-mail n\'est pas prise en charge' };
    }

    return null; // return null when the input is valid
  };
}
