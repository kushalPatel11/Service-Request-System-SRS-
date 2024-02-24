import {injectable, BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { ServiceCategoryRepository } from '../repositories';

type createServiceParams = {
  payload: {
    name: string;
    description: string;
  }
}

@injectable({scope: BindingScope.TRANSIENT})
export class ServiceCategoryService {
  constructor(
    @repository(ServiceCategoryRepository)
    public serviceCategoryRepository: ServiceCategoryRepository,
  ) {}

  async createServiceCategory({payload}: createServiceParams) {
    const createdService = await this.serviceCategoryRepository.create({payload});
    return createdService;
  }

  async getServiceCategory() {
    const getService = await this.serviceCategoryRepository.find();
    return getService;
  }
}
