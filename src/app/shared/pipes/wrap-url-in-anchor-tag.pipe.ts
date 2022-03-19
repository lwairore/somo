import { Pipe, PipeTransform } from '@angular/core';
import { convertItemToString, createTextLinks, stringIsEmpty } from '@sharedModule/utils';

@Pipe({
  name: 'wrapUrlInAnchorTag'
})
export class WrapUrlInAnchorTagPipe implements PipeTransform {

  transform(value: any, shortenURL = false, shortenToAbout = 50) {
    value = convertItemToString(value);

    if (stringIsEmpty(value)) {
      return value;
    }

    return createTextLinks(value, shortenURL, shortenToAbout);
  }

}
