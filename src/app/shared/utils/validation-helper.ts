import { ValidationConfig } from '../models/dynamic-input-config';

export class ValidationHelper {
  static get ArabicName(): ValidationConfig {
    return {
      required: true,
      minLength: 2,
      maxLength: 100,
    };
  }

  static get EnglishName(): ValidationConfig {
    return {
      required: true,
      minLength: 2,
      maxLength: 100,
    };
  }

  static get Required(): ValidationConfig {
    return { required: true };
  }

  static get Email(): ValidationConfig {
    return { required: true, email: true };
  }
  static get PhoneNumber(): ValidationConfig {
    return {
      required: true,
      pattern: '^[0-9]{11}$',
      minLength: 11,
      maxLength: 11,
    };
  }
  static get Password(): ValidationConfig {
    return {
      minLength: 8,
      maxLength: 50,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    };
  }
}
