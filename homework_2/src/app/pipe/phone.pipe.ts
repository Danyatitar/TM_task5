import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonePipe',
})
export class PhonePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const str = value.replace(/\D/g, '');
    return (
      '(' +
      str.substring(0, 3) +
      ') ' +
      str.substring(3, 6) +
      '-' +
      str.substring(6)
    );
  }
}
