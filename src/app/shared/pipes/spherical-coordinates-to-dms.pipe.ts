import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sphericalCoordinatesToDms'
})
export class SphericalCoordinatesToDmsPipe implements PipeTransform {

  transform(coordinate: any, reference: 'lat' | 'lng'): string {

    if (isNaN(coordinate)) { return coordinate; }

    coordinate = +coordinate;

    if (reference === 'lat') {
      const latitude = this.toDegreesMinutesAndSeconds(coordinate);
      const latitudeCardinal = coordinate >= 0 ? 'N' : 'S';
      return latitude + ' ' + latitudeCardinal;
    }
    else if (reference === 'lng') {
      var longitude = this.toDegreesMinutesAndSeconds(coordinate);
      var longitudeCardinal = coordinate >= 0 ? 'E' : 'W';

      return longitude + ' ' + longitudeCardinal;
    }

    return coordinate;
  }

  toDegreesMinutesAndSeconds(coordinate: number) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + ' ' + minutes + ' ' + seconds;
  }
}
