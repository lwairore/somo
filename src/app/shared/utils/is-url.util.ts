import { memoize } from "lodash-es";
import { convertItemToString } from "./convert-item-to-string.util";
import { stringIsEmpty } from "./string-is-empty.util";

const URL_REGEX_1 = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;

const URL_REGEX_2 = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/i;

const URL_REGEX_3 = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,2083}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/igm;

export const isUrl = memoize((value: any) => {
    const VALUE_TO_STR = convertItemToString(value);

    if (stringIsEmpty(VALUE_TO_STR)) {
        return false;
    }

    return (URL_REGEX_1.test(VALUE_TO_STR) || URL_REGEX_2.test(VALUE_TO_STR) || URL_REGEX_3.test(VALUE_TO_STR))
})