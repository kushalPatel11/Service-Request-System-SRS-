import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {VendorHasService, VendorHasServiceRelations} from '../models';

export class VendorHasServiceRepository extends DefaultCrudRepository<
  VendorHasService,
  typeof VendorHasService.prototype.id,
  VendorHasServiceRelations
> {
  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource,
  ) {
    super(VendorHasService, dataSource);
  }
}
