import { memoize } from "lodash";

export const convertItemToString = memoize(
    (item: any) => {
        if ([undefined, null].includes(item)) {
            return '';
        }

        try {
            return `${item}`;
        } catch (AttributeError) {
            return '';
        }
    });
