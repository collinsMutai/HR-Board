import { Pipe, PipeTransform } from '@angular/core';
import { IJobs } from '../Interface/Ijobs';

@Pipe({
  name: 'filtertitle'
})
export class FiltertitlePipe implements PipeTransform {

  transform(value: IJobs[], filterTitle: string): IJobs[] {
    if (value.length === 0 || filterTitle === '') {
      return value;
    }
    const filtered: IJobs[] = [];
    for (let job of value) {
      if (
        job.title
          .toLocaleLowerCase()
          .indexOf(filterTitle.toLocaleLowerCase()) !== -1
      ) {
        filtered.push(job);
      }
    }
    return filtered;
  }
}
