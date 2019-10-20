import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'util';

@Pipe({
  name: 'siteName'
})
export class SiteNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (args && isArray(args[0])) {
      return ((args[0] as []).find((val: any, index, thisArg) => {
        return val.siteId === value;
      }) as any).siteName;
    }

    return '';
  }

}
