import { QR_CODE_CATEGORIES } from "../consts";
import { parseGeoQrCodeValue } from "./parse-geo-qr-code-value.util";
import { parsePhoneQrCodeValue } from "./parse-phone-qr-code-value";
import { parseEmailQrCodeValue } from "./parse-email-qr-code-value.util";
import { parseWifiQrCodeValue } from "./parse-wifi-qr-code-value.util";
import { parseMecardQrCodeValue } from "./parse-mecard-qr-code-value.util";
import { parseSmsQrCodeValue } from "./parse-sms-qr-code-value.util";
import { isUrl } from "./is-url.util";

interface ParsedQrCodeValues {
    qrCategory: string;
    result: any;
}


export const parseQrCodeValue = (qrCodeValue: string): ParsedQrCodeValues | null => {
    qrCodeValue = qrCodeValue?.trim();

    let parsedQrCodeValues: ParsedQrCodeValues;

    const parseAsGeoQrCode = parseGeoQrCodeValue(qrCodeValue);
    if (parseAsGeoQrCode?.latitude || parseAsGeoQrCode?.longitude) {
        parsedQrCodeValues = {
            qrCategory: QR_CODE_CATEGORIES.GEO,
            result: parseAsGeoQrCode
        };

        return parsedQrCodeValues;
    }

    const parseAsEmailQrCode = parseEmailQrCodeValue(qrCodeValue);
    if (parseAsEmailQrCode?.mailto) {
        parsedQrCodeValues = {
            qrCategory: QR_CODE_CATEGORIES.EMAIL,
            result: parseAsEmailQrCode
        };

        return parsedQrCodeValues;
    }

    const parseAsWifiQrCode = parseWifiQrCodeValue(qrCodeValue);
    if (parseAsWifiQrCode?.ssidOrNetworkName || parseAsWifiQrCode?.encryption
        || parseAsWifiQrCode?.password || parseAsWifiQrCode?.hidden) {
        parsedQrCodeValues = {
            qrCategory: QR_CODE_CATEGORIES.WIFI,
            result: parseAsWifiQrCode
        };

        return parsedQrCodeValues;
    }

    const parseAsMecardQrCode = parseMecardQrCodeValue(qrCodeValue);
    if (parseAsMecardQrCode?.fullName) {
        parsedQrCodeValues = {
            qrCategory: QR_CODE_CATEGORIES.MECARD,
            result: parseAsMecardQrCode
        };

        return parsedQrCodeValues;
    }

    const parseAsSmsQrCode = parseSmsQrCodeValue(qrCodeValue);
    if (parseAsSmsQrCode?.phone || parseAsSmsQrCode?.message) {
        parsedQrCodeValues = {
            qrCategory: QR_CODE_CATEGORIES.SMS,
            result: parseAsSmsQrCode
        };

        return parsedQrCodeValues;
    }

    const parseAsPhoneQrCode = parsePhoneQrCodeValue(qrCodeValue);
    if (parseAsPhoneQrCode?.phone) {
        parsedQrCodeValues = {
            qrCategory: QR_CODE_CATEGORIES.TEL,
            result: parseAsPhoneQrCode
        };

        return parsedQrCodeValues;
    }

    const qrIsProbablyUrl = isUrl(qrCodeValue);
    if (qrIsProbablyUrl) {

        const domainFromUrl = (url: string) => {
            let result;
            let match;
            if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
                result = match[1];
                if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
                    result = match[1];
                }
            }
            return result;
        }

        parsedQrCodeValues = {
            qrCategory: QR_CODE_CATEGORIES.URL,
            result: {
                href: qrCodeValue,
                domain: domainFromUrl(qrCodeValue)
            }
        };

        return parsedQrCodeValues;
    }

    return {
        qrCategory: QR_CODE_CATEGORIES.UNKNOWN,
        result: qrCodeValue
    };
}