import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
  ValidatorFn,
  Validator
} from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function urlValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = nameRe.test(control.value);
    console.log('forbidden', forbidden);
    return forbidden ? null : { isUrlValid: { value: control.value } };
  };
}

@Directive({
  selector: '[appUrlValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: UrlValidatorDirective, multi: true }
  ]
})
export class UrlValidatorDirective implements Validator {
  constructor() {}
  validate(control: AbstractControl): { [key: string]: any } | null {
    const reg = 'https://www.kijiji.ca/.*';
    return reg ? urlValidator(new RegExp(reg))(control) : null;
  }
}
