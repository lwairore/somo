import { FormControl } from "@angular/forms";
import { stringIsEmpty } from "@sharedModule/utils";

const FACEBOOK_URL_REG = /^(?:.*)\/(?:pages\/[A-Za-z0-9-]+\/)?(?:profile\.php\?id=)?([A-Za-z0-9.]+)/gmi;

const isFacebookUrl = (value: string) => {
    return FACEBOOK_URL_REG.test(value);
}

export class FacebookUrlValidator {
    static invalidFacebookUrl(control: FormControl): { [key: string]: boolean } | null {
        const formControlValue = control.value?.trim();

        if (stringIsEmpty(formControlValue)) {
            return { invalidFacebookUrl: true }
        }

        return (isFacebookUrl(formControlValue)) ? null : { invalidFacebookUrl: true };
    }
}