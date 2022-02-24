import { memoize } from "lodash";
import { convertItemToString } from "./convert-item-to-string.util";

const NUMBER_REGEX = /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/;

export const isANumber = memoize(
    (item: any) => {
        item = convertItemToString(item);

        return NUMBER_REGEX.test(item);
    });
