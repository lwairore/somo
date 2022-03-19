import { SmsDetails } from "../models";

export const parseSmsQrCodeValue = (qrCodeValue: string): SmsDetails | null => {
    const result: SmsDetails = {};

    const part1 = qrCodeValue.match(/^SMS(?:TO)?:([+\d()./N,*;#]*)/i);

    if (part1 && part1.length >= 2) {
        if (/[\d+]/.test(part1[1])) {
            result.phone = part1[1];
        }

        const message = qrCodeValue.slice(
            part1[0].length);

        const messagePart = message.match(/^:(.*)$/);
        const messagePart2 = message.match(/^\?body\=(.*)$/);


        if (messagePart && messagePart.length >= 2) {
            if (messagePart[1].trim().length > 0) {
                result['message'] = messagePart[1];
            }
        } else if (messagePart2 && messagePart2.length >= 2) {
            if (messagePart2[1].trim().length > 0) {
                result['message'] = messagePart2[1];
            }
        }

        if (result.phone || result.message) {
            return result;
        }
    }

    return null;
}