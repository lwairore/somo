import { EmailDetails } from "@sharedModule/models";
import { stringIsEmpty } from "./string-is-empty.util";

const IS_MATSMG_FULL = /^\s*MATMSG\s*:\s*TO\s*:\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))\s*;\s*(SUB\s*:\s*(.*)\s*;)?\s*(BODY\s*:\s*(.*);)?;/mi;



export function parseMatsmgEmailStringFormat(value: string) {
    const result: EmailDetails = { mailto: '' };

    // We have to sacrifice new lines
    // WHY: '\r or/and \n prevents the algorithm from matching accordingly.'
    // This example is matched unappropriately `"MATMSG: \nTO: amit@labnol.org; \nSUB:Your Story on QR Codes; \nBODY:Hello Amit,\n\nI just finished reading your story on QR codes at http://www.labnol.org/?p=19610. \n\n[Insert comments here and hit Send to contact the author] ;;"`
    value = value.replace(/[\r\n]+/g, '');

    if (IS_MATSMG_FULL.test(value)) {
        value = value.replace(/^\s*MATMSG\s*:\s*/i, '');

        let numberOfLoops = 0;

        while (true) {
            numberOfLoops += 1;

            if (numberOfLoops > 3) {
                break;
            }

            if (/^\s*TO\s*:\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))\s*;/i.test(value)) {
                value = value.replace(/^\s*TO\s*:\s*/i, '');

                const mailtoRegExpMatchArray = value.match(/^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))\s*/i);
                if (mailtoRegExpMatchArray?.length) {
                    result.mailto = mailtoRegExpMatchArray[0];

                    value = value.slice(
                        result.mailto.length);

                    value = value.replace(/^\s*;\s*/i, '');

                    if (stringIsEmpty(value)) {
                        break;
                    }
                }
            } else if (/^\s*SUB\s*:\s*[^(\s*BODY\s*:\s*)]*/i.test(value)) {
                value = value.replace(/^\s*SUB\s*:\s*/i, '');

                const subjectRegExpMatchArray = value.match(/[\s\S]*?(?=\s*;\s*BODY)/i);
                if (subjectRegExpMatchArray?.length) {
                    result.subject = subjectRegExpMatchArray[0];

                    value = value.slice(
                        result.subject.length);

                    value = value.replace(/^\s*;\s*/i, '');

                    if (stringIsEmpty(value)) {
                        break;
                    }
                }
            } else if (/^\s*BODY\s*:\s*[^;]*/i.test(value)) {
                value = value.replace(/^\s*BODY\s*:\s*/i, '');

                value = value.replace(/(;){1,2}$/i, '');

                if (!stringIsEmpty(value)) {
                    result.body = value
                } else {
                    break;
                }


            }
        }

        return result;
    }

    return null;
}