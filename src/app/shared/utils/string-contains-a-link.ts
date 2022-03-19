const regexp = /(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?/;
const regexp2 = /(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*/;
const regexp3 = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,2083}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;

export const stringContainsALink = (str: any): boolean => {
    if (regexp.test(str) || regexp2.test(str) || regexp3.test(str)) {
        return true;
    }
    else {
        return false;
    }
}