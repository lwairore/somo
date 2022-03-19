import { memoize } from "lodash-es";
import { stringIsEmpty } from "./string-is-empty.util";
import { shortUrl } from "./short_url.util";

const URL_REGEX = /([^\S]|^)((((https?\:\/\/)|(www\.))(\S+)))|((?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?)|((?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*)|(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,2083}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi;

const EMAIL_REGEX = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))/gi;

const PHONE_NUMBER_REGEX = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/gmi;

export const createTextLinks = memoize((text: string, shortenURL = false, shortenToAbout = 50) => {
    // Caveats: unproperly matches `1-847-555-5555`, `+1 206 555 0100`, `- +1 206 555 0199`, 
    // `+44 113 496 0000`, `+44 113 496 0999`, `+44 113 496 0000`
    text = (text || '').replace(PHONE_NUMBER_REGEX, function (match, space, url) {

        if (stringIsEmpty(url) || stringIsEmpty(match)) {
            return match;
        }

        return `<a href="tel:${match.replace(/[-\s\.()]/g, '')}" rel="noopener nofollow" title="Click here to call ${match}">${match}</a>`;
    });

    // Caveats: The email parser will incorrectly format `https://regex101.com/benitta@gmail.com`
    text = (text || '').replace(EMAIL_REGEX, function (match, space, url) {
        if (stringIsEmpty(url) || stringIsEmpty(match)) {
            return match;
        }

        return `<a href="mailto:${match}" rel="noopener nofollow" title="Click here to email ${match}">${match}</a>`;
    });

    text = (text || '').replace(URL_REGEX, function (match, space, url) {
        if (stringIsEmpty(url) || stringIsEmpty(match)) {
            return match;
        }
        let hyperlink = url;

        if (!hyperlink?.match('^https?://')) {
            hyperlink = 'http://' + hyperlink;
        }

        if (shortenURL) {
            url = shortUrl(url, shortenToAbout);
        }

        return `${space}<a href="${hyperlink}" target="_blank" rel="noopener" title="Click here to go to ${url}">${url}</a>`;
    });

    return text;
})
