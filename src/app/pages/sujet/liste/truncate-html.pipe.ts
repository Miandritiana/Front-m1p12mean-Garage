import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateHtml',
  standalone: true
})
export class TruncateHtmlPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    const strippedText = value.replace(/(<([^>]+)>)/gi, ''); // Supprime les balises HTML
    return strippedText.length > limit
      ? strippedText.substring(0, limit) + '...'
      : strippedText;
  }

}
