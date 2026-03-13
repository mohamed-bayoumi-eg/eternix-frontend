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
    return { email: true };
  }
}
