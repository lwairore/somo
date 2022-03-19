import { encodeStringToUri } from "./utils";

const UNIVERSAL_CROSS_PLATFORM_SYNTAX = {
    search: 'https://www.google.com/maps/search/?api=1&parameters',
    directions: 'https://www.google.com/maps/dir/?api=1&parameters',
    displayAMap: 'https://www.google.com/maps/@?api=1&map_action=map&parameters',
    displayAStreetViewPanoroma: 'https://www.google.com/maps/@?api=1&map_action=pano&parameters'
};

export const constructGoogleMapsSearchAPI = (parameters:
    {
        query?: string,
        latitude?: string;
        longitude?: string;
    }
): string | null => {
    const latitude: number = parameters?.latitude as unknown as number;
    const longitude: number = parameters?.longitude as unknown as number;

    if (!isNaN(latitude) ||
        !isNaN(longitude)) {
        let query = '';

        if (!isNaN(latitude)) {
            query += latitude;
        }

        if (!isNaN(longitude)) {
            query += encodeStringToUri(',');
            query += longitude;
        }

        const searchApi = UNIVERSAL_CROSS_PLATFORM_SYNTAX.search.replace('parameters',
            'query=' + query);

        return searchApi;
    } else if (parameters.query) {
        const encodedQuery = encodeStringToUri(parameters.query);

        const searchApi = UNIVERSAL_CROSS_PLATFORM_SYNTAX.search.replace('parameters',
            'query=' + encodedQuery);

        return searchApi;
    }

    return null;

}

export const constructGoogleMapsDisplayMapAPI = (center: {
    latitude?: string;
    longitude?: string;
}): string | null => {
    const latitude: number = center?.latitude as unknown as number;
    const longitude: number = center?.longitude as unknown as number;

    if (!isNaN(latitude) || !isNaN(longitude)) {
        let query = '';

        if (!isNaN(latitude)) {
            query += latitude;
        }

        if (!isNaN(longitude)) {
            query += encodeStringToUri(',');
            query += longitude;
        }

        const searchApi = UNIVERSAL_CROSS_PLATFORM_SYNTAX.displayAMap.replace('parameters',
            'center=' + query);

        return searchApi;

    } else {
        return null;
    }
}

export const constructGoogleMapsDirectionAPI = (center: {
    latitude?: string;
    longitude?: string;
}): string | null => {
    const latitude: number = center?.latitude as unknown as number;
    const longitude: number = center?.longitude as unknown as number;

    if (!isNaN(latitude) || !isNaN(longitude)) {
        let query = '';

        if (!isNaN(latitude)) {
            query += latitude;
        }

        if (!isNaN(longitude)) {
            query += encodeStringToUri(',');
            query += longitude;
        }

        const searchApi = UNIVERSAL_CROSS_PLATFORM_SYNTAX.directions.replace('parameters',
            'origin=' + query);

        return searchApi;

    } else {
        return null;
    }
}

// https://developers.google.com/maps/documentation/urls/get-started