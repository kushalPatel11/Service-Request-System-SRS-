import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {VendorHasServiceRequest, VendorHasServiceRequestRelations} from '../models';

export class VendorHasServiceRequestRepository extends DefaultCrudRepository<
  VendorHasServiceRequest,
  typeof VendorHasServiceRequest.prototype.id,
  VendorHasServiceRequestRelations
> {
  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource,
  ) {
    super(VendorHasServiceRequest, dataSource);
  }
}
