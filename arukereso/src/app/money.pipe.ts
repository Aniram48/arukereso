import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {
  transform(value: number, currency: string = 'USD', symbol: boolean = true, format: string = '1.0-0'): string {
    if (!value) return `${symbol ? '$' : ''}0`;

    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: format.includes('0') ? 0 : 2,
      maximumFractionDigits: format.includes('0') ? 0 : 2,
    }).format(value);

    return formattedValue;
  }
}