import { GeoDetails } from "../models";

export const parseGeoQrCodeValue = (qrCodeValue: string): GeoDetails | null => {
    const result: GeoDetails = {
        latitude: '',
        longitude: ''
    };

    const startsWithGeo = /^geo:/i;
    if (!startsWithGeo.test(qrCodeValue)) {
        return null;
    }

    qrCodeValue = qrCodeValue.replace(startsWithGeo, '');

    const geoQueryMatch = qrCodeValue.match(/\?q=(.*)/i);
    if (geoQueryMatch) {
        result.query = geoQueryMatch[1];
        qrCodeValue = qrCodeValue.slice(0, geoQueryMatch.index);
    }

    const latitudeAndLongitudeMatch = qrCodeValue.match(/(.*),(.*)/i);
    if (latitudeAndLongitudeMatch) {
        result.latitude = latitudeAndLongitudeMatch[1];
        result.longitude = latitudeAndLongitudeMatch[2];
    }

    if (result?.latitude || result?.longitude) {
        return result;
    }

    return null;
}