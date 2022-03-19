import { EmailDetails } from "@sharedModule/models";

export function parseMailtoStringFormat(value: string) {
    const result: EmailDetails = { mailto: '' };

    const startsWithMailTo = /^mailto:/i;
    if (startsWithMailTo.test(value)) {
        const bodyReg = value.match(/\&body\=(.*)$/i);

        if (bodyReg) {
            result['body'] = bodyReg[1];
            value = value.slice(0, bodyReg.index);
        }
        const subjectReg = value.match(/\?subject\=(.*)$/i);

        if (subjectReg) {
            result['subject'] = subjectReg[1];
            value = value.slice(0, subjectReg.index);
        }

        value = value.replace(startsWithMailTo, '');
        result['mailto'] = value;

        console.log(result);
        if (result?.mailto) {
            return result;
        }
    }

    return null;
}