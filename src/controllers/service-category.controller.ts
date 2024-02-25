import {repository} from '@loopback/repository';
import {ServiceCategoryRepository} from '../repositories';
import {service} from '@loopback/core';
import {ServiceCategoryService} from '../services';
import {get, post, requestBody} from '@loopback/rest';

export class ServiceCategoryController {
  constructor(
    @repository(ServiceCategoryRepository)
    public serviceCategoryRepository: ServiceCategoryRepository,
    @service(ServiceCategoryService)
    public serviceCategoryService: ServiceCategoryService,
  ) {}

  @post('/service-category/register', {
    summary: 'Add service category API Endpoint',
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'description'],
              properties: {
                name: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be blank`,
                  },
                  default: '',
                },
                description: {
                  type: 'string',
                  pattern: '^(?! ).*[^ ]$',
                  errorMessage: {
                    pattern: `Can't be blank`,
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
  async createServiceCategory(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'description'],
            properties: {
              name: {
                type: 'string',
                pattern: '^(?! ).*[^ ]$',
                errorMessage: {
                  pattern: `Can't be blank`,
                },
                default: '',
              },
              description: {
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
      name: string;
      description: string;
    },
  ): Promise<any> {
    return this.serviceCategoryService.createServiceCategory({payload});
  }

  @get('/service-category', {
    summary: 'Get Service Category API Endpoint',
    responses: {
      '200': {},
    },
  })
  async getServiceCategory() {
    return this.serviceCategoryService.getServiceCategory();
  }
}
