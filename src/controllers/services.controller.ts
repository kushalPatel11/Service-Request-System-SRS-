import {TokenService, authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, post, requestBody} from '@loopback/rest';
import {SecurityBindings} from '@loopback/security';
import {TokenServiceBindings, customErrorMsg} from '../keys';
import {ServicesRepository} from '../repositories';
import {EmailService, ServicesService} from '../services';
import {AuthCredentials} from '../services/authentication/jwt.auth.strategy';

export class ServicesController {
  constructor(
    @repository(ServicesRepository)
    public servicesRepository: ServicesRepository,
    @service(ServicesService)
    public servicesService: ServicesService,
    @service(EmailService)
    public emailService: EmailService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
  ) {}

  @authenticate('jwt')
  @post('/services/add-service', {
    summary: 'Add vendor Service API Endpoint',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: [
                'serviceCategoryId',
                'name',
                'companyName',
                'description',
                'email',
                'phoneNumber',
                'address',
                'availability',
                'price',
                'website',
              ],
              properties: {
                serviceCategoryId: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default: 'MongoDB Valid Id',
                },
                name: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default: 'Service 1',
                },
                companyName: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default: 'Company Name 1',
                },
                description: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default: 'A short overview of the service been provided',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  errorMessage: {
                    pattern: customErrorMsg.authErrors.INVALID_EMAIL,
                  },
                },
                phoneNumber: {
                  type: 'string',
                  pattern: '^\\d{10}$',
                  errorMessage: {
                    pattern: customErrorMsg.authErrors.INVALID_PHONE_NUMBER,
                  },
                },
                address: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default: 'Address line 1,2 city,state, Zip code.',
                },
                availability: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default:
                    'Add your weekly available hours and any exceptions.',
                },
                price: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default: '100',
                },
                website: {
                  type: 'string',
                  pattern: `^(http:\\/\\/|https:\\/\\/)?(www\\.)?[a-zA-Z0-9-_\\.]+\\.[a-zA-Z]+(:\\d+)?(\\/[a-zA-Z\\d\\.\\-_]*)*[a-zA-Z.!@#$%&=-_'":,.?\\d*)(]*$`,
                  errorMessage: {
                    pattern: `Invalid Website`,
                  },
                  default: 'www.yourWebsite.com',
                },
              },
            },
          },
        },
      },
    },
  })
  async addService(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [
              'serviceCategoryId',
              'name',
              'companyName',
              'description',
              'email',
              'phoneNumber',
              'address',
              'availability',
              'price',
              'website',
            ],
            properties: {
              serviceCategoryId: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: 'MongoDB Valid Id',
              },
              name: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: 'Service 1',
              },
              companyName: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: 'Company Name 1',
              },
              description: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: 'A short overview of the service been provided',
              },
              email: {
                type: 'string',
                format: 'email',
                errorMessage: {
                  pattern: customErrorMsg.authErrors.INVALID_EMAIL,
                },
              },
              phoneNumber: {
                type: 'string',
                pattern: '^\\d{10}$',
                errorMessage: {
                  pattern: customErrorMsg.authErrors.INVALID_PHONE_NUMBER,
                },
              },
              address: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: 'Address line 1,2 city,state, Zip code.',
              },
              availability: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: 'Add your weekly available hours and any exceptions.',
              },
              price: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: '100',
              },
              website: {
                type: 'string',
                pattern: `^(http:\\/\\/|https:\\/\\/)?(www\\.)?[a-zA-Z0-9-_\\.]+\\.[a-zA-Z]+(:\\d+)?(\\/[a-zA-Z\\d\\.\\-_]*)*[a-zA-Z.!@#$%&=-_'":,.?\\d*)(]*$`,
                errorMessage: {
                  pattern: `Invalid Website`,
                },
                default: 'www.yourWebsite.com',
              },
            },
          },
        },
      },
    })
    payload: {
      serviceCategoryId: string;
      name: string;
      companyName: string;
      description: string;
      email: string;
      phoneNumber: string;
      address: string;
      availability: string;
      price: string;
      website: string;
    },
    @inject(SecurityBindings.USER)
    authCredentials: AuthCredentials,
  ): Promise<any> {
    return this.servicesService.addService({
      payload,
      userId: <string>authCredentials.user.id,
    });
  }

  @get('/services', {
    summary: 'Get Services API Endpoint',
    responses: {
      '200': {},
    },
  })
  async getServices() {
    return this.servicesService.getService();
  }

  @authenticate('jwt')
  @post('/services/update-service', {
    summary: 'Update Service API Endpoint',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: [
                'serviceId',
                'serviceCategoryId',
                'name',
                'companyName',
                'description',
                'description',
                'email',
                'phoneNumber',
                'address',
                'availability',
                'price',
                'website',
              ],
              properties: {
                serviceId: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errormessage: {
                    pattern: `Can't be blank`,
                  },
                  default: 'A valid MongoDB Id',
                },
                serviceCategoryId: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errormessage: {
                    pattern: `Can't be blank`,
                  },
                  default: 'A valid MongoDB Id',
                },
                name: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default: 'Updated name of the service',
                },
                companyName: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMesage: {
                    pattern: `Can't be blank`,
                  },
                  default: 'Updated Comapny Name',
                },
                description: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default: 'Updated description of the service',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  errorMessage: {
                    pattern: customErrorMsg.authErrors.INVALID_EMAIL,
                  },
                },
                phoneNumber: {
                  type: 'string',
                  pattern: '^\\d{10}$',
                  errorMessage: {
                    pattern: customErrorMsg.authErrors.INVALID_PHONE_NUMBER,
                  },
                },
                address: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default: 'Updated Address',
                },
                availability: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default: 'Updated Availability',
                },
                price: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be Blank`,
                  },
                  default: 'Updated Price',
                },
                website: {
                  type: 'string',
                  pattern: `^(http:\\/\\/|https:\\/\\/)?(www\\.)?[a-zA-Z0-9-_\\.]+\\.[a-zA-Z]+(:\\d+)?(\\/[a-zA-Z\\d\\.\\-_]*)*[a-zA-Z.!@#$%&=-_'":,.?\\d*)(]*$`,
                  errorMessage: {
                    pattern: 'Invalid Website',
                  },
                  default: 'www.updatedWebsite.com',
                },
              },
            },
          },
        },
      },
    },
  })
  async updateService(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [
              'serviceId',
              'serviceCategoryId',
              'name',
              'companyName',
              'description',
              'email',
              'phoneNumber',
              'address',
              'availability',
              'price',
              'website',
            ],
            properties: {
              serviceId: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be blank`,
                },
                default: 'A valid MongoDB Id',
              },
              serviceCategoryId: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be blank`,
                },
                default: 'A valid MongoDB Id',
              },
              name: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: 'Updated name of the service',
              },
              companyName: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be blank`,
                },
                default: 'Updated Comapny Name',
              },
              description: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: 'Updated description of the service',
              },
              email: {
                type: 'string',
                format: 'email',
                errorMessage: {
                  pattern: customErrorMsg.authErrors.INVALID_EMAIL,
                },
              },
              phoneNumber: {
                type: 'string',
                pattern: '^\\d{10}$',
                errorMessage: {
                  pattern: customErrorMsg.authErrors.INVALID_PHONE_NUMBER,
                },
              },
              address: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: 'Updated Address',
              },
              availability: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: 'Updated Availability',
              },
              price: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be Blank`,
                },
                default: 'Updated Price',
              },
              website: {
                type: 'string',
                pattern: `^(http:\\/\\/|https:\\/\\/)?(www\\.)?[a-zA-Z0-9-_\\.]+\\.[a-zA-Z]+(:\\d+)?(\\/[a-zA-Z\\d\\.\\-_]*)*[a-zA-Z.!@#$%&=-_'":,.?\\d*)(]*$`,
                errorMessage: {
                  pattern: 'Invalid Website',
                },
                default: 'www.updatedWebsite.com',
              },
            },
          },
        },
      },
    })
    payload: {
      serviceId: string;
      serviceCategoryId: string;
      name: string;
      companyName: string;
      description: string;
      email: string;
      phoneNUmber: string;
      address: string;
      availability: string;
      price: string;
      website: string;
    },
  ): Promise<any> {
    return this.servicesService.updateServiceById({payload});
  }

  @authenticate('jwt')
  @post('/services/delete-service', {
    summary: 'Delete Service by Id API Endpoint',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['serviceId'],
              properties: {
                serviceId: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `can't be blank`,
                  },
                  default: 'Valid MongoDB ID',
                },
              },
            },
          },
        },
      },
    },
  })
  async deleteServiceById(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['serviceId'],
            properties: {
              serviceId: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `can't be blank`,
                },
                default: '',
              },
            },
          },
        },
      },
    })
    payload: {
      serviceId: string;
    },
  ): Promise<any> {
    return this.servicesService.deleteServiceById(payload.serviceId);
  }

  @authenticate('jwt')
  @get('/services/my-services', {
    summary: `Get Vendor's Services API Endpoint`,
    responses: {
      '200': {},
    },
  })
  async getVendorService(
    @inject(SecurityBindings.USER)
    authCredentials: AuthCredentials,
  ): Promise<any> {
    return this.servicesService.getVendorService({
      userId: <string>authCredentials.user.id,
    });
  }

  // @authenticate('jwt')
  @post('/services/service-request-email', {
    summary: 'Send Email to vendor after requesting service API ENdpoint',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  errorMessage: {
                    pattern: `Invalid email`,
                  },
                  default: '',
                },
              },
            },
          },
        },
      },
    },
  })
  async sendEmailToVendor(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
                errorMessage: {
                  pattern: `Invalid email`,
                },
                default: '',
              },
            },
          },
        },
      },
    })
    payload: {
      email: string;
    },
  ): Promise<any> {
    return this.emailService.sendRequestToVendor(payload.email);
  }

  // @authenticate('jwt')
  @post('/services/send-service-status', {
    summary: 'Send Email to customer after managing request API ENdpoint',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'status'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  errorMessage: {
                    pattern: `Invalid email`,
                  },
                  default: 'nishchitpatel84@gmail.com',
                },
                status: {
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
  async sendResponseToCustomer(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'status'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
                errorMessage: {
                  pattern: `Invalid email`,
                },
                default: 'nishchitpatel84@gmail.com',
              },
              status: {
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
      status: string;
    },
  ): Promise<any> {
    return this.emailService.serviceAcceptDecline(
      payload.email,
      payload.status,
    );
  }

  @post('/services/cancle-request-email', {
    summary: 'Send Email to vendor after cancelling appointment API ENdpoint',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  errorMessage: {
                    pattern: `Invalid email`,
                  },
                  default: 'nishchitpatel84@gmail.com',
                },
              },
            },
          },
        },
      },
    },
  })
  async cancelEMail(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
                errorMessage: {
                  pattern: `Invalid email`,
                },
                default: '',
              },
            },
          },
        },
      },
    })
    payload: {
      email: string;
    },
  ): Promise<any> {
    return this.emailService.serviceCancle(payload.email);
  }
}
