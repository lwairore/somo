const STOP_CHARS = [' ', '/', '&'];

export function shortUrl(url: string, shortenToAbout = 50) {
    const chunkLength = (shortenToAbout / 2);

    url = url.replace('http://', '').replace('https://', '');

    if (url.length <= shortenToAbout) { return url; }

    const startChunk = shortString(url, chunkLength, false);
    const endChunk = shortString(url, chunkLength, true);
    return startChunk + '...' + endChunk;
}

function shortString(stringValue: string, shortenToAbout: number, reverse: boolean) {
    const acceptableShortness = shortenToAbout * 0.80; // When to start looking for stop characters

    stringValue = reverse ? stringValue.split('').reverse().join('') : stringValue;

    let shortString = '';

    for (var i = 0; i < shortenToAbout - 1; i++) {
        shortString += stringValue[i];

        if (i >= acceptableShortness && STOP_CHARS.indexOf(stringValue[i]) >= 0) {
            break;
        }
    }

    if (reverse) {
        return shortString.split('').reverse().join('');
    }

    return shortString;
}