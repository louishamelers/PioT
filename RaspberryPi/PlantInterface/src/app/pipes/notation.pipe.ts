import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'notation'})
export class NotationPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'humidity':
        return '%';
      case 'light':
        return 'lux';
      case 'soil-moisture':
        return '%';
      case 'temperature':
        return '°C';
      default:
        return '';
    }
  }
}
