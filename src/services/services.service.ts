import {injectable, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ServicesRepository, VendorHasServiceRepository} from '../repositories';
import {HttpErrors} from '@loopback/rest';
import {DateTime} from 'luxon';
import {VendorHasService} from '../models';

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
  userId: string;
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

type GetVendorService = {
  userId: string;
};

@injectable({scope: BindingScope.TRANSIENT})
export class ServicesService {
  constructor(
    @repository(ServicesRepository)
    public servicesRepository: ServicesRepository,
    @repository(VendorHasServiceRepository)
    public vendorHasServiceRepository: VendorHasServiceRepository,
  ) {}

  async addService({payload, userId}: AddService) {
    const addedService = await this.servicesRepository.create(payload);
    await this.vendorHasServiceRepository.create({
      serviceId: addedService.id,
      userId: userId,
    });
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

    const findService : any = await this.vendorHasServiceRepository.findOne({
      where: {
        serviceId: checkServiceId.id,
      },
    });
    await this.servicesRepository.deleteById(checkServiceId.id);
    await this.vendorHasServiceRepository.deleteById(findService.id);

    return {message: 'Service Deleted Successfully!!'};
  }

  async getVendorService({userId}: GetVendorService) {
    const checkVendor = await this.vendorHasServiceRepository.find({
      where: {
        userId: userId,
      },
    });
    if (!checkVendor) {
      throw new HttpErrors[404](`No Services Found!!`);
    }
    let vendorService = [];
    for (const obj of checkVendor) {
      const key = obj.serviceId;
      const value = await this.servicesRepository.findOne({
        where: {
          id: key,
        },
      });
      vendorService.push(value);
    }
    return vendorService;
  }
}
