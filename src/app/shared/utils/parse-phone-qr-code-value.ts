import { PhoneDetails } from "../models"

export const parsePhoneQrCodeValue = (qrCodeValue: string): PhoneDetails | null => {
    const result: PhoneDetails = { phone: '' };

    const part1 = qrCodeValue.match(/^tel:([+\d()./N,*;#]*)$/i);

    if (part1 && part1.length >= 2) {
        if (/[\d+]/.test(part1[1])) {
            result.phone = part1[1];
        }
    }

    if (result.phone?.trim()?.length > 0) {
        return result;
    }
    return null;
}