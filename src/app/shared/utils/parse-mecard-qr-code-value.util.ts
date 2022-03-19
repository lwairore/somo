import { MecardDetails } from "../models";

export const parseMecardQrCodeValue = (qrCodeValue: string): MecardDetails | null => {
    const result: MecardDetails = {
        fullName: ''
    };
    let section = result;


    const isMecardReg = /^MECARD:/i;
    if (isMecardReg.test(qrCodeValue)) {
        qrCodeValue = qrCodeValue.replace(isMecardReg, '');
    }

    if (qrCodeValue?.trim().length > 0) {
        let match;



        qrCodeValue.split(/;/).filter(item => item.length > 0).forEach(item => {
            if (match = item.match(/^N:(.*)$/i)) {
                section.fullName = match[1];
            } else if (match = item.match(/^ORG:(.*)$/i)) {
                section.organization = match[1];
            } else if (match = item.match(/^ADR:(.*)$/i)) {
                section.address = match[1];
            } else if (match = item.match(/^TEL:(.*)$/i)) {
                section.phone = match[1];
            } else if (match = item.match(/^EMAIL:(.*)$/i)) {
                section.email = match[1];
            } else if (match = item.match(/^NOTE:(.*)/i)) {
                section.notes = match[1];
            }
        });
    }

    if (result.fullName) {
        return result;
    }

    return null;
}