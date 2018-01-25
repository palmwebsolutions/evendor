
import{ AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatch(password: string): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} => {
        let value = control.value;

        if(value !== password) return {'passwordMatch': { value }};

        return null;
    }
}

/* export function rangeValidator(minValue: number, maxValue: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let value = control.value;
        let numValue: number = +value;

        if (isNaN(numValue)) {
            return { "rangeValidator": { value } };
        }
        else if (numValue < minValue || numValue > maxValue) {
            return { "rangeValidator": { value } };
        }
        else {
            return null;
        }
    }
} */