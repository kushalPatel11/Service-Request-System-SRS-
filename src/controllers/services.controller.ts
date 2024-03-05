import {repository} from '@loopback/repository';
import {get, patch, post, requestBody} from '@loopback/rest';
import {ServicesRepository} from '../repositories';
import {customErrorMsg} from '../keys';
import {service} from '@loopback/core';
import {ServicesService} from '../services';

export class ServicesController {
  constructor(
    @repository(ServicesRepository)
    public servicesRepository: ServicesRepository,
    @service(ServicesService)
    public servicesService: ServicesService,
  ) {}

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
  ): Promise<any> {
    return this.servicesService.addService({payload});
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

  @patch('/services/update-service', {
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
  ): Promise<void> {
    return this.servicesService.updateServiceById({payload});
  }
}
