import {TokenService, authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, post, requestBody} from '@loopback/rest';
import {SecurityBindings} from '@loopback/security';
import {TokenServiceBindings, customErrorMsg} from '../keys';
import {UserSession, User} from '../models';
import {UserRepository} from '../repositories';
import {UserService} from '../services';
import {AuthCredentials} from '../services/authentication/jwt.auth.strategy';

export class AuthController {
  constructor(
    @repository(UserRepository)
    public usersRepository: UserRepository,
    @service(UserService)
    public userService: UserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
  ) {}

  @post('/auth/sign-up', {
    summary: 'SignUp/Register API Endpoint',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: [
                'firstName',
                'lastName',
                'userType',
                'email',
                'password',
                'phoneNumber',
                'countryCode',
              ],
              properties: {
                firstName: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `can't be blank`,
                  },
                  default: '',
                },
                lastName: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `can't be blank`,
                  },
                  default: '',
                },
                userType: {
                  type: 'string',
                  enum: ['customer', 'vendor'],
                  errorMessage: {
                    pattern: customErrorMsg.authErrors.INVALID_USER_TYPE,
                  },
                },
                email: {
                  type: 'string',
                  format: 'email',
                  errorMessage: {
                    pattern: customErrorMsg.authErrors.INVALID_EMAIL,
                  },
                },
                password: {
                  type: 'string',
                  pattern:
                    '^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,})$',
                  errorMessage: {
                    pattern:
                      customErrorMsg.authErrors.PASSWORD_VALIDATION_FAILED,
                  },
                },
                phoneNumber: {
                  type: 'string',
                  pattern: '^\\d{1,10}$',
                  errorMessage: {
                    pattern: customErrorMsg.authErrors.INVALID_PHONE_NUMBER,
                  },
                },
                countryCode: {
                  type: 'string',
                  pattern: '^\\+\\d{1,2}$',
                  errorMessage: {
                    pattern: customErrorMsg.authErrors.INVALID_COUNTRY_CODE,
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [
              'firstName',
              'lastName',
              'userType',
              'email',
              'password',
              'phoneNumber',
              'countryCode',
            ],
            properties: {
              firstName: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Cannot be blank`,
                },
                default: '',
              },
              lastName: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Cannot be blank`,
                },
                default: '',
              },
              userType: {
                type: 'string',
                enum: ['customer', 'vendor'],
                errorMessage: {
                  pattern: customErrorMsg.authErrors.INVALID_USER_TYPE,
                },
              },
              email: {
                type: 'string',
                format: 'email',
                errorMessage: {
                  pattern: customErrorMsg.authErrors.INVALID_EMAIL,
                },
              },
              password: {
                type: 'string',
                pattern:
                  '^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,})$',
                errorMessage: {
                  pattern: customErrorMsg.authErrors.PASSWORD_VALIDATION_FAILED,
                },
                default: '',
              },
              phoneNumber: {
                type: 'string',
                pattern: '^\\d{1,10}$',
                errorMessage: {
                  pattern: customErrorMsg.authErrors.INVALID_PHONE_NUMBER,
                },
              },
              countryCode: {
                type: 'string',
                pattern: '^\\+\\d{1,2}$',
                errorMessage: {
                  pattern: customErrorMsg.authErrors.INVALID_COUNTRY_CODE,
                },
              },
            },
          },
        },
      },
    })
    payload: {
      firstName: string;
      lastName: string;
      userType: string;
      email: string;
      password: string;
      phoneNumber: string;
      countryCode: string;
    },
  ): Promise<any> {
    return this.userService.signUp({
      payload,
    });
  }

  @post('/auth/login', {
    summary: 'User Login',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  default: 'user@linearloop.io',
                },
                password: {
                  type: 'string',
                  default: '',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
              password: {
                type: 'string',
                default: '',
              },
            },
          },
        },
      },
    })
    payload: {
      email: string;
      password: string;
    },
  ): Promise<any> {
    return this.userService.login({payload});
  }

  @authenticate('jwt')
  @get('/auth/logout', {
    summary: 'Logout current logged in user',
    responses: {
      '200': {},
    },
  })
  async logout(
    @inject(SecurityBindings.USER)
    authCredentials: AuthCredentials,
  ): Promise<any> {
    return this.userService.logout({
      sessionId: <string>authCredentials.session.id,
    });
  }

  @post('/auth/forgot-password', {
    summary: 'Forgot password API Endpoint',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['emailId'],
              properties: {
                emailId: {
                  type: 'string',
                  format: 'email',
                },
              },
            },
          },
        },
      },
    },
  })
  async forgotPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['emailId'],
            properties: {
              emailId: {
                type: 'string',
                format: 'email',
              },
            },
          },
        },
      },
    })
    payload: {
      emailId: string;
    },
  ): Promise<any> {
    return this.userService.forgotPassword({payload});
  }

  @post('/auth/reset-password', {
    summary: 'Reset Password API Endpoint',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['token', 'newPassword', 'confirmPassword'],
              properties: {
                token: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `can't be blank`,
                  },
                  default: '',
                },
                newPassword: {
                  type: 'string',
                  pattern:
                    '^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,})$',
                  errorMessage: {
                    pattern:
                      customErrorMsg.authErrors.PASSWORD_VALIDATION_FAILED,
                  },
                  default: '',
                },
                confirmPassword: {
                  type: 'string',
                  default: '',
                },
              },
            },
          },
        },
      },
    },
  })
  async resetPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['token', 'newPassword', 'confirmPassword'],
            properties: {
              token: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `can't be blank`,
                },
                default: '',
              },
              newPassword: {
                type: 'string',
                pattern:
                  '^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,})$',
                errorMessage: {
                  pattern: customErrorMsg.authErrors.PASSWORD_VALIDATION_FAILED,
                },
                default: '',
              },
              confirmPassword: {
                type: 'string',
                default: '',
              },
            },
          },
        },
      },
    })
    payload: {
      token: string;
      newPassword: string;
      confirmPassword: string;
    },
  ): Promise<any> {
    return this.userService.resetPassword({payload});
  }

  @authenticate('jwt')
  @post('/auth/change-password', {
    summary: 'Change Password API Endpoint',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['oldPassword', 'newPassword', 'confirmNewPassword'],
              properties: {
                oldPassword: {
                  type: 'string',
                  default: '',
                },
                newPassword: {
                  type: 'string',
                  default: '',
                },
                confirmNewPassword: {
                  type: 'string',
                  default: '',
                },
              },
            },
          },
        },
      },
    },
  })
  async changePassword(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['oldPassword', 'newPassword', 'confirmNewPassword'],
            properties: {
              oldPassword: {
                type: 'string',
                default: '',
              },
              newPassword: {
                type: 'string',
                pattern:
                  '^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,})$',
                errorMessage: {
                  pattern: customErrorMsg.authErrors.PASSWORD_VALIDATION_FAILED,
                },
                default: '',
              },
              confirmNewPassword: {
                type: 'string',
                default: '',
              },
            },
          },
        },
      },
    })
    payload: {
      oldPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    },
    @inject(SecurityBindings.USER)
    authCredentials: AuthCredentials,
  ): Promise<any> {
    return this.userService.changePassword({
      payload,
      userId: <string>authCredentials.user.id,
    });
  }

  @authenticate('jwt')
  @get('auth/whoAmI', {
    summary: 'Get info of logged in user',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                user: {
                  'x-ts-type': User,
                },
                session: {
                  'x-ts-type': UserSession,
                },
              },
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    authCredentials: AuthCredentials,
  ): Promise<object> {
    return authCredentials;
  }
}
