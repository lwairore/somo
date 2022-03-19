import { EmailDetails } from "@sharedModule/models";
import { stringIsEmpty } from "./string-is-empty.util";

const IS_SMTP_FULL = /^smtp:((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,})))(:(.*))?(:(.*))?/mi

export function parseSmtpEmailStringFormat(value: string) {
    const result: EmailDetails = { mailto: '' };

    if (IS_SMTP_FULL.test(value)) {
        value = value.replace(/^\s*smtp\s*:\s*/i, '');

        const mailtoRegExpMatchArray = value.match(/^((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,})))/mi);

        if (mailtoRegExpMatchArray?.length) {
            result.mailto = mailtoRegExpMatchArray[0];

            value = value.slice(
                result.mailto.length);

            value = value.replace(/^\s*:\s*/i, '');

            if (stringIsEmpty(value)) {
                return result;
            }

            const subRegExpMatchArray = value.match(/^[^:]+/mi);
            if (subRegExpMatchArray?.length) {
                result.subject = subRegExpMatchArray[0];

                value = value.slice(
                    result.subject.length);

                value = value.replace(/^\s*:\s*/i, '');
                result.body = value;

                return result;
            }
        }
    }

    return null;
}