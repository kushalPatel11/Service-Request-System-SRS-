import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ServiceCategory} from '../models';
import {ServiceCategoryRepository} from '../repositories';

export class ServiceCategoryController {
  constructor(
    @repository(ServiceCategoryRepository)
    public serviceCategoryRepository : ServiceCategoryRepository,
  ) {}

  @post('/service-categories')
  @response(200, {
    description: 'ServiceCategory model instance',
    content: {'application/json': {schema: getModelSchemaRef(ServiceCategory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceCategory, {
            title: 'NewServiceCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    serviceCategory: Omit<ServiceCategory, 'id'>,
  ): Promise<ServiceCategory> {
    return this.serviceCategoryRepository.create(serviceCategory);
  }

  @get('/service-categories/count')
  @response(200, {
    description: 'ServiceCategory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ServiceCategory) where?: Where<ServiceCategory>,
  ): Promise<Count> {
    return this.serviceCategoryRepository.count(where);
  }

  @get('/service-categories')
  @response(200, {
    description: 'Array of ServiceCategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ServiceCategory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ServiceCategory) filter?: Filter<ServiceCategory>,
  ): Promise<ServiceCategory[]> {
    return this.serviceCategoryRepository.find(filter);
  }

  @patch('/service-categories')
  @response(200, {
    description: 'ServiceCategory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceCategory, {partial: true}),
        },
      },
    })
    serviceCategory: ServiceCategory,
    @param.where(ServiceCategory) where?: Where<ServiceCategory>,
  ): Promise<Count> {
    return this.serviceCategoryRepository.updateAll(serviceCategory, where);
  }

  @get('/service-categories/{id}')
  @response(200, {
    description: 'ServiceCategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ServiceCategory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ServiceCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<ServiceCategory>
  ): Promise<ServiceCategory> {
    return this.serviceCategoryRepository.findById(id, filter);
  }

  @patch('/service-categories/{id}')
  @response(204, {
    description: 'ServiceCategory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceCategory, {partial: true}),
        },
      },
    })
    serviceCategory: ServiceCategory,
  ): Promise<void> {
    await this.serviceCategoryRepository.updateById(id, serviceCategory);
  }

  @put('/service-categories/{id}')
  @response(204, {
    description: 'ServiceCategory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() serviceCategory: ServiceCategory,
  ): Promise<void> {
    await this.serviceCategoryRepository.replaceById(id, serviceCategory);
  }

  @del('/service-categories/{id}')
  @response(204, {
    description: 'ServiceCategory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.serviceCategoryRepository.deleteById(id);
  }
}
