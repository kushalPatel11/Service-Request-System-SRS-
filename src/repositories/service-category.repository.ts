import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {ServiceCategory, ServiceCategoryRelations} from '../models';

export class ServiceCategoryRepository extends DefaultCrudRepository<
  ServiceCategory,
  typeof ServiceCategory.prototype.id,
  ServiceCategoryRelations
> {
  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource,
  ) {
    super(ServiceCategory, dataSource);
  }
}
