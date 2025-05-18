import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/product';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(products: Product[], searchTerm: string = ''): Product[] {
    if (!products) return [];

    // 1. Név szerinti szűrés
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    // 2. Név szerinti ABC sorrendű rendezés
    return filtered.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();

      if (aName < bName) return -1;
      if (aName > bName) return 1;
      return 0;
    });
  }
}
