import { Pipe, PipeTransform } from '@angular/core';
import { IJobs } from '../Interface/Ijobs';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: IJobs[], filterText: string): IJobs[] {
    if (value.length === 0 || filterText === '') {
      return value;
    }
    const filtered: IJobs[] = [];
    for (let job of value) {
      if (
        job.title
          .toLocaleLowerCase()
          .indexOf(filterText.toLocaleLowerCase()) !== -1
      ) {
        filtered.push(job);
      }
    }
    return filtered;
  }
}
