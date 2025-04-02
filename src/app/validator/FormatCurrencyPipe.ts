import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrencyMGA',
  standalone: true
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: number, symbol: boolean = true): string {
    if (value == null) return '';

    // Convert to string and format with space as thousands separator
    let formatted = value.toLocaleString('fr-FR'); // "83 000"

    return symbol ? `${formatted} MGA` : formatted;
  }
}
