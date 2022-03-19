import { Pipe, PipeTransform } from '@angular/core';
import { convertItemToString, stringIsEmpty } from '@sharedModule/utils';
import { shortUrl } from '@sharedModule/utils/short_url.util';

@Pipe({
  name: 'formatUrl'
})
export class FormatUrlPipe implements PipeTransform {


  transform(value: any, shortenToAbout = 50): unknown {
    const URL_TO_STRING = convertItemToString(value);

    if (stringIsEmpty(URL_TO_STRING)) {
      return '';
    }

    return shortUrl(URL_TO_STRING, shortenToAbout);
  }
}
