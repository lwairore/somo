import { FormControl } from "@angular/forms";
import { isUrl, stringIsEmpty } from "@sharedModule/utils";

export class UrlValidator {
    static invalidUrl(control: FormControl): { [key: string]: boolean } | null {
        const formControlValue = control.value;

        if (stringIsEmpty(formControlValue)) {
            return { invalidUrl: true }
        }

        return (isUrl(formControlValue)) ? null : { invalidUrl: true };
    }
}