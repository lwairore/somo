import { WifiDetails } from "../models";

const NO_PASS_ENCRYPTION = { fullName: 'No password set', nickName: 'nopass' };

const WPA_ENCRYPTION = { fullName: 'WPA/WPA2', nickName: 'wpa' };

const WEP_ENCRYPTION = { fullName: 'WEP', nickName: 'wep' };

export const parseWifiQrCodeValue = (qrCodeValue: string): WifiDetails | null => {
    const result: WifiDetails = {};

    let section = result;

    const isWifiReg = /^WIFI:/;

    if (isWifiReg.test(qrCodeValue)) {
        qrCodeValue = qrCodeValue.replace(isWifiReg, '');

        if (qrCodeValue?.trim()?.length > 0) {
            let match;

            qrCodeValue.split(/;/).filter(item => item.length > 0).forEach(item => {

                if (match = item.match(/^S:(.+)$/i)) {
                    section.ssidOrNetworkName = match[1];
                } else if (match = item.match(/^T:(.+)$/i)) {
                    switch (match[1]?.toLowerCase()) {
                        case NO_PASS_ENCRYPTION.nickName:
                            section.encryption = NO_PASS_ENCRYPTION.fullName;
                            break;
                        case WPA_ENCRYPTION.nickName:
                            section.encryption = WPA_ENCRYPTION.fullName;
                            break;
                        case WEP_ENCRYPTION.nickName:
                            section.encryption = WEP_ENCRYPTION.fullName;
                            break;
                        default:
                            break;
                    }

                } else if (match = item.match(/^P:(.+)$/i)) {
                    section.password = match[1];
                } else if (match = item.match(/^H:(.+)$/i)) {
                    section.hidden = match[1] === 'true' ? true : false;
                }
            });

            if (result.ssidOrNetworkName || result.password || result.hidden || result.encryption) {
                return result;
            }
        }
    }

    return null;
}