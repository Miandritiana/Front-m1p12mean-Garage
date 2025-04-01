import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string, format: string = 'medium'): string {
    if (!value) return '';
    
    const datePipe = new DatePipe('en-US');
    
    // Formats that include time
    const timeInclusiveFormats: Record<string, string> = {
      'short': 'M/d/yy, h:mm a',         // e.g., 3/30/25, 3:00 PM
      'medium': 'MMM d, y, h:mm:ss a',   // e.g., Mar 30, 2025, 3:00:00 PM
      'long': 'MMMM d, y, h:mm:ss a z',  // e.g., March 30, 2025 at 3:00:00 PM GMT+1
      'full': 'EEEE, MMMM d, y, h:mm a', // e.g., Sunday, March 30, 2025 at 3:00:00 PM GMT+01:00
      'shortTime': 'h:mm a',              // e.g., 3:00 PM
      'mediumTime': 'h:mm:ss a',          // e.g., 3:00:00 PM
      'custom': 'yyyy-MM-dd HH:mm:ss'     // e.g., 2025-03-30 15:00:00
    };

    // Use a time-inclusive format (defaults to 'medium' if no match)
    const timeFormat = timeInclusiveFormats[format] || format;
    return datePipe.transform(value, timeFormat) || '';
  }
}