import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const formGroup: FormGroup = control as FormGroup;
  const password = formGroup.get('password')?.value;
  const rePassword = formGroup.get('rePassword')?.value;
  return password === rePassword ? null : {passwordMismatch: true};
};
