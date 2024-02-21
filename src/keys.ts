import {TokenService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'myJwts3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = '12000';
}
export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

/**
 * Constant values used when generating refresh token.
 */
export namespace RefreshTokenConstants {
  /**
   * The default secret used when generating refresh token.
   */
  export const REFRESH_SECRET_VALUE = 'r3fr35htok3n';
  /**
   * The default expiration time for refresh token.
   */
  export const REFRESH_EXPIRES_IN_VALUE = '12000';
  /**
   * The default issuer used when generating refresh token.
   */
  export const REFRESH_ISSUER_VALUE = 'loopback4';
}

export namespace customErrorMsg {
  export enum authErrors {
    USER_PASSWORD_NOT_SET = 'User does not have password setup',
    USER_ID_NOT_FOUND = 'User Id not found',
    WHITESPACE_ERROR = 'Whitespace not allowed before or after the name',
    ENTER_USER_ID = 'Enter user Id',
    INVALID_USER_TYPE = 'Select from customer and vendor only',
    INVALID_EMAIL = 'Inavlid Email',
    EMAIL_ALREADY_EXISTS = 'This Email is already registered. Please enter a new email',
    EMAIL_NOT_FOUND = 'Email not registered',
    PHONE_NUMBER_ALREADY_EXISTS = 'Phone Number already in use. Please sign up using a different phone number',
    INVALID_PHONE_NUMBER = 'Invalid Phone Number',
    INVALID_COUNTRY_CODE = 'Invalid Country Code',
    INCORRECT_PASSWORD = 'Incorrect Password',
    PASSWORD_VALIDATION_FAILED = 'Must include one uppercase, one lowercase, one number, one special character and must be minimum of 8 characters',
    PASSWORDS_DO_NOT_MATCH = 'Passwords do not match. Please enter same password in both the fields',
    PASSWORD_NOT_ALLOWED = 'The entered password has already been used once; Please enter a new unused password',
    PASSWORD_CANNOT_BE_SAME = 'Old password and new password cannot be same',
    SESSION_ID_NOT_FOUND = 'session Id not found',
    TOKEN_NOT_FOUND = 'Token not found',
    INVALID_TOKEN = 'Invalid Token',
    TOKEN_EXPIRED = 'Your token to reset password has been expired',
    ALREADY_EXPIRED_SESSION = 'YOur session has been expired. Please sign in again to continue',
    ALREADY_LOGGED_OUT = 'You have already logged out with this session ID',
  }
}

export namespace serviceGenieConstant {
  export enum sessionstatus {
    CURRENT = 'Current',
    EXPIRED = 'Expired',
  }

  export enum AuthStatus {
    SIGN_UP_SUCCESS = 'Sign Up Successfull',
    LOG_IN_SUCCESS = 'You have logged in successfully',
    LOG_OUT_SUCCESS = 'You have logged out successfully',
    PASSWORD_CHANGE_SUCCESSFULL = 'Password has been changed successfully',
  }
}