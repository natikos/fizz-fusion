import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { differenceInYears, isValid } from 'date-fns';

export function IsAdult(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isAdult',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsAdultRule,
    });
  };
}

@ValidatorConstraint({ name: 'IsAdult' })
class IsAdultRule implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (isValid(value)) {
      const age = differenceInYears(new Date(), new Date(value));
      return age > 18;
    }

    return false;
  }

  defaultMessage(): string {
    return `User's age must be equal or greater than 18 to perform this action`;
  }
}
