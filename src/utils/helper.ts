import {HttpErrors} from '@loopback/rest';
import {compare} from 'bcryptjs';
import {customErrorMsg} from '../keys';

// create a random string that will act as a token for resetting password.
export const generateRandomString = (length: number) => {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const rNum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(rNum, rNum + 1);
  }
  return randomString;
};

// check old passwords from the array and throws error if new password matches in tbhe array.
export const checkOldPasswords = async (
  newPassword: string,
  oldPassword: string[],
) => {
  for (let i = 0; i < oldPassword.length; i++) {
    const findExistingPassword = await compare(newPassword, oldPassword[i]);
    if (findExistingPassword === true) {
      throw new HttpErrors[403](customErrorMsg.authErrors.PASSWORD_NOT_ALLOWED);
    }
  }
};

