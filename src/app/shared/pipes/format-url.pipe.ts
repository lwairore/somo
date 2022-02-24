import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatUrl'
})
export class FormatUrlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
