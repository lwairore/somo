import { EmailDetails } from "../models";
import { parseMailtoStringFormat } from "./mailto_email_string_format.util";
import { parseMatsmgEmailStringFormat } from "./matsmg-email-string-format.util";
import { parseSmtpEmailStringFormat } from "./smtp_email_string_format.util";
import { stringIsEmpty } from "./string-is-empty.util";

export const parseEmailQrCodeValue = (qrCodeValue: string): EmailDetails | null => {

    const MAILTO_PARSER_RESULTS = parseMailtoStringFormat(qrCodeValue);
    if (!stringIsEmpty(MAILTO_PARSER_RESULTS?.mailto)) {
        return MAILTO_PARSER_RESULTS;
    }

    const SMTP_PARSER_RESULTS = parseSmtpEmailStringFormat(qrCodeValue);
    if (!stringIsEmpty(SMTP_PARSER_RESULTS?.mailto)) {
        return SMTP_PARSER_RESULTS;
    }

    const MATSMG_PARSER_RESULTS = parseMatsmgEmailStringFormat(qrCodeValue);
    if (!stringIsEmpty(MATSMG_PARSER_RESULTS?.mailto)) {
        return MATSMG_PARSER_RESULTS;
    }

    return null;
}

// Keep in mind that there are three different formats for encoding a email in a QR:

// Mailto (W3C standard)
 
// `mailto:email@example.com?subject=email subject&body=Email text`

// MATMSG (NTT DoCoMo)

// `MATMSG:TO: email@example.com;SUB:email subject;BODY:Email text;;`

// SMTP (OMI@)

// `SMTP:email@example.com:email subject:Email text`

// Although MATMSG is the most widespread, there are some readers (ie: ScanLife) that doesn't support it
