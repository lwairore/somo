import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeEncodedUriString'
})
export class DecodeEncodedUriStringPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value?.length) { return ''; }
    let queryDecode = window.decodeURIComponent(value);
    if (queryDecode) {
      queryDecode = queryDecode.replace(/\+/g, ' ');
    }

    return queryDecode ? queryDecode : '';
  }

}
