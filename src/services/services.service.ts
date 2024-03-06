import {injectable, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ServicesRepository} from '../repositories';
import {HttpErrors} from '@loopback/rest';
import {DateTime} from 'luxon';

type AddService = {
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
  };
};

type UpdateServiceById = {
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
  };
};

@injectable({scope: BindingScope.TRANSIENT})
export class ServicesService {
  constructor(
    @repository(ServicesRepository)
    public servicesRepository: ServicesRepository,
  ) {}

  async addService({payload}: AddService) {
    const addedService = await this.servicesRepository.create(payload);
    return addedService;
  }

  async getService() {
    const getService = await this.servicesRepository.find();
    return getService;
  }

  async updateServiceById({payload}: UpdateServiceById) {
    const findService = await this.servicesRepository.findById(
      payload.serviceId,
    );
    if (!findService) {
      throw new HttpErrors[404](`Service Not FOund!!`);
    }

    const updatedServiceById = await this.servicesRepository.updateById(
      findService.id,
      {
        serviceCategoryId: payload.serviceCategoryId,
        name: payload.name,
        companyName: payload.companyName,
        description: payload.description,
        email: payload.email,
        phoneNumber: payload.phoneNUmber,
        address: payload.address,
        availability: payload.availability,
        price: payload.price,
        website: payload.website,
        updatedAt: DateTime.utc().toJSDate(),
        _v: findService._v + 1,
      },
    );

    return updatedServiceById;
  }

  async deleteServiceById(serviceId: string) {
    const checkServiceId = await this.servicesRepository.findById(serviceId);

    if (!checkServiceId) {
      throw new HttpErrors[404](`Service Not Found !!`);
    }

    await this.servicesRepository.deleteById(checkServiceId.id);

    return {message: 'Service Deleted Successfully!!'};
  }
}
