import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class ShouldPasswordBeProvidedAsWifiDetail {
    static shouldPasswordBeProvidedAsWifiDetail(encryptionFormControlName: string, optionsThatEnforcePasswordDetail: string[],
        passwordFormControlName: string): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {

            const encryptionFormGroup = <FormGroup>control.get(encryptionFormControlName);
            const selectedEncryptionType = encryptionFormGroup.value;

            const passwordFormGroup = <FormGroup>control.get(passwordFormControlName);

            if (optionsThatEnforcePasswordDetail.find(option => option === selectedEncryptionType)) {
                passwordFormGroup.setValidators(Validators.compose([
                    Validators.minLength(1),
                    Validators.maxLength(63),
                    Validators.required
                ]));

                passwordFormGroup.updateValueAndValidity({ onlySelf: true });
            } else {
                passwordFormGroup.clearValidators();
                passwordFormGroup.updateValueAndValidity({ onlySelf: true });
            }

            return null

        }
    }

}
