import { memoize } from "lodash-es";

export const convertItemToString = memoize(
    (item: any) => {
        if (typeof (item) === 'string') {
            return item;
        }
        
        if ([undefined, null].includes(item)) {
            return '';
        }

        try {
            return `${item}`;
        } catch (AttributeError) {
            return '';
        }
    });
