import {injectable, BindingScope, inject, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UserProfile, securityId} from '@loopback/security';
import {
  UserCredentialsRepository,
  UserRepository,
  UserSessionRepository,
} from '../repositories';
import {User, UserWithRelations} from '../models';
import {HttpErrors} from '@loopback/rest';
import {TokenService} from '@loopback/authentication';
import {
  TokenServiceBindings,
  customErrorMsg,
  serviceGenieConstant,
} from '../keys';
import {compare, hashSync} from 'bcryptjs';
import {DateTime} from 'luxon';
import _ from 'lodash';
import {
  checkOldPasswords,
  generateRandomNumber,
  generateRandomString,
} from '../utils/helper';
// import { serviceProxy } from '@loopback/service-proxy';
import {EmailService} from './email.service';

type SignUpParams = {
  payload: {
    firstName: string;
    lastName: string;
    userType: string;
    email: string;
    password: string;
    phoneNumber: string;
    countryCode: string;
  };
};

type LoginParams = {
  payload: {
    email: string;
    password: string;
  };
};

type LogoutParams = {
  sessionId: string;
};

type ForgotPasswordParams = {
  payload: {
    emailId: string;
  };
};

type ResetPasswordParams = {
  payload: {
    userId: string;
    newPassword: string;
    confirmPassword: string;
  };
};

type ChangePasswordParams = {
  payload: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  userId: string;
};

@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(UserCredentialsRepository)
    public userCredentialsRepository: UserCredentialsRepository,
    @repository(UserSessionRepository)
    public userSessionRepository: UserSessionRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @service(EmailService)
    public emailService: EmailService,
  ) {}

  async signUp({payload}: SignUpParams) {
    await this.userRepository.checkEmail(payload.email);
    const passwordValue = payload.password;
    const createUserpayload: any = _.omit(payload, ['password']);
    const user = await this.userRepository.create(createUserpayload);
    await this.userCredentialsRepository.create({
      userId: user.id,
      password: hashSync(passwordValue),
    });
    return serviceGenieConstant.AuthStatus.SIGN_UP_SUCCESS;
  }

  async login({payload}: LoginParams) {
    const user = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new HttpErrors.BadRequest(
        customErrorMsg.authErrors.EMAIL_NOT_FOUND,
      );
    }

    const usercredentials = await this.userCredentialsRepository.findOne({
      where: {userId: user.id},
    });

    if (!usercredentials) {
      throw new HttpErrors[401](customErrorMsg.authErrors.USER_ID_NOT_FOUND);
    }

    const isPasswordMatch = await compare(
      payload.password,
      usercredentials.password,
    );
    if (!isPasswordMatch) {
      throw new HttpErrors[401](customErrorMsg.authErrors.INCORRECT_PASSWORD);
    }

    const userProfile = this.convertToUserProfile(user);

    const token = await this.jwtService.generateToken(userProfile);

    const userSession = await this.userSessionRepository.create({
      userId: user?.id,
      jwt: token,
      status: serviceGenieConstant.sessionstatus.CURRENT,
      loginAt: DateTime.utc().toJSDate(),
      expireAt: DateTime.utc()
        .plus({
          hours: 24,
        })
        .toJSDate(),
    });

    let response = {
      jwt: userSession.jwt,
      userType: user.userType,
    };
    return response;
  }

  async logout({sessionId}: LogoutParams) {
    const session = await this.userSessionRepository.findById(sessionId);
    if (!session) {
      throw new HttpErrors[404](customErrorMsg.authErrors.SESSION_ID_NOT_FOUND);
    }
    if (session?.status === serviceGenieConstant.sessionstatus.EXPIRED) {
      throw new HttpErrors.BadRequest(
        customErrorMsg.authErrors.ALREADY_LOGGED_OUT,
      );
    }

    await this.userSessionRepository.updateById(session.id, {
      status: serviceGenieConstant.sessionstatus.EXPIRED,
      expiredAt: <any>DateTime.utc().toJSDate(),
      updatedAt: <any>DateTime.utc().toJSDate(),
      _v: session._v + 1,
    });

    return serviceGenieConstant.AuthStatus.LOG_OUT_SUCCESS;
  }

  async forgotPassword({payload}: ForgotPasswordParams) {
    const checkEmail = await this.userRepository.findOne({
      where: {
        email: payload.emailId,
      },
    });
    if (!checkEmail) {
      throw new HttpErrors[404](customErrorMsg.authErrors.EMAIL_NOT_FOUND);
    }
    const generatedNumber = generateRandomNumber(6);
    await this.userRepository.updateById(checkEmail.id, {
      forgotPasswordToken: {
        token: (await generatedNumber).toString(),
        status: serviceGenieConstant.sessionstatus.CURRENT,
        createdAt: DateTime.utc().toJSDate(),
        expireAt: DateTime.utc().plus({minutes: 5}).toJSDate(),
        expiredAt: null,
      },
    });

    await this.emailService.sendOTP(payload.emailId, await generatedNumber);

    return {message: `OTP sent in the Email`};
  }

  async verifyResetOtp(otp: string) {
    const verifyTOken = await this.userRepository.findOne({
      where: <any>{
        'forgotPasswordToken.token': otp,
        'forgotPasswordToken.status':
          serviceGenieConstant.sessionstatus.CURRENT,
      },
    });
    if (!verifyTOken) {
      throw new HttpErrors[404](customErrorMsg.authErrors.INVALID_TOKEN);
    }

    let expiredTime = verifyTOken?.forgotPasswordToken?.expiredAt;
    if (
      DateTime.fromJSDate(<any>expiredTime).valueOf() < DateTime.utc().valueOf()
    ) {
      await this.userRepository.updateById(verifyTOken.id, <any>{
        'forgotPasswordToken.status':
          serviceGenieConstant.sessionstatus.EXPIRED,
        'forgotPasswordToken.expiredAt': expiredTime,
        _v: verifyTOken._v + 1,
      });
      throw new HttpErrors[403](customErrorMsg.authErrors.TOKEN_EXPIRED);
    }

    await this.userRepository.updateById(verifyTOken.id, <any>{
      'forgotPasswordToken.status': serviceGenieConstant.sessionstatus.EXPIRED,
      'forgotPasswordToken.expiredAt': DateTime.utc().toJSDate(),
      _v: verifyTOken._v + 1,
    });

    return verifyTOken.id;
  }

  async resetPassword({payload}: ResetPasswordParams) {
    if (payload.newPassword !== payload.confirmPassword) {
      throw new HttpErrors[403](
        customErrorMsg.authErrors.PASSWORDS_DO_NOT_MATCH,
      );
    }
    // const verifyTOken = await this.userRepository.findOne({
    //   where: <any>{
    //     'forgotPasswordToken.token': payload.token,
    //     'forgotPasswordToken.status':
    //       serviceGenieConstant.sessionstatus.CURRENT,
    //   },
    // });
    // if (!verifyTOken) {
    //   throw new HttpErrors[404](customErrorMsg.authErrors.INVALID_TOKEN);
    // }

    // let expiredTime = verifyTOken?.forgotPasswordToken?.expiredAt;
    // if (
    //   DateTime.fromJSDate(
    //     <any>verifyTOken.forgotPasswordToken?.expireAt,
    //   ).valueOf() < DateTime.utc().valueOf()
    // ) {
    //   await this.userRepository.updateById(verifyTOken.id, <any>{
    //     'forgotPasswordToken.status':
    //       serviceGenieConstant.sessionstatus.EXPIRED,
    //     'forgotPasswordToken.expiredAt': expiredTime,
    //   });
    //   throw new HttpErrors[403](customErrorMsg.authErrors.TOKEN_EXPIRED);
    // }

    const userId: any = await this.userCredentialsRepository.findOne({
      where: {
        userId: payload.userId,
      },
    });

    const passwordArray: any = userId?.oldPasswords;
    const currentPassword = userId.password;
    const comparePassword = await compare(payload.newPassword, currentPassword);

    if (comparePassword === true) {
      throw new HttpErrors[403](customErrorMsg.authErrors.PASSWORD_NOT_ALLOWED);
    }

    await checkOldPasswords(payload.newPassword, passwordArray);

    if (passwordArray.length <= 2) {
      passwordArray.unshift(currentPassword);
    } else {
      passwordArray.pop();
      passwordArray.unshift(currentPassword);
    }

    await this.userCredentialsRepository.updateById(userId?.id, <any>{
      'forgotPasswordToken.status': serviceGenieConstant.sessionstatus.EXPIRED,
      'forgotPasswordToken.expiredAt': DateTime.utc().toJSDate(),
    });
    return serviceGenieConstant.AuthStatus.PASSWORD_CHANGE_SUCCESSFULL;
  }

  async changePassword({payload, userId}: ChangePasswordParams) {
    const checkUserId = await this.userCredentialsRepository.findOne({
      where: {
        userId,
      },
    });
    if (!checkUserId) {
      throw new HttpErrors[404](customErrorMsg.authErrors.USER_ID_NOT_FOUND);
    }

    const matchPassword = await compare(
      payload.oldPassword,
      checkUserId.password,
    );
    if (!matchPassword) {
      throw new HttpErrors[400](customErrorMsg.authErrors.INCORRECT_PASSWORD);
    }

    if (payload.oldPassword === payload.newPassword) {
      throw new HttpErrors[403](
        customErrorMsg.authErrors.PASSWORD_CANNOT_BE_SAME,
      );
    }

    if (payload.newPassword !== payload.confirmNewPassword) {
      throw new HttpErrors[403](
        customErrorMsg.authErrors.PASSWORDS_DO_NOT_MATCH,
      );
    }

    const passwordArray: any = checkUserId.oldPasswords;
    const currentPassword = checkUserId.password;
    const comparePassword = await compare(payload.newPassword, currentPassword);

    if (comparePassword === true) {
      throw new HttpErrors[403](customErrorMsg.authErrors.PASSWORD_NOT_ALLOWED);
    }

    await checkOldPasswords(payload.newPassword, passwordArray);

    if (passwordArray.length <= 2) {
      passwordArray.unshift(currentPassword);
    } else {
      passwordArray.pop();
      passwordArray.unshift(currentPassword);
    }

    await this.userCredentialsRepository.updateById(checkUserId.id, {
      password: hashSync(payload.newPassword),
      oldPasswords: passwordArray,
    });
    return serviceGenieConstant.AuthStatus.PASSWORD_CHANGE_SUCCESSFULL;
  }

  async findUserById(id: string): Promise<User & UserWithRelations> {
    const userNotFound = 'invalid user';
    const foundUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(userNotFound);
    }
    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    return {
      [securityId]: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      email: user.email,
      userType: user.userType,
    };
  }
}
