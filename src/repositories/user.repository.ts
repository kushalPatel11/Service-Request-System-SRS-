import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {User, UserRelations} from '../models';
import {HttpErrors} from '@loopback/rest';
import { DateTime } from 'luxon';
import { customErrorMsg } from '../keys';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.MongoDb') dataSource: MongoDbDataSource) {
    super(User, dataSource);
  }

  async checkEmail(email: string) {
    const checkEmail = await this.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      throw new HttpErrors.BadRequest(customErrorMsg.authErrors.EMAIL_ALREADY_EXISTS);
    }
  }

  definePersistedModel(entityClass: typeof User) {
    const modelClass = super.definePersistedModel(entityClass);
    modelClass.observe('before save', async ctx => {
      if (!ctx.isNewInstance && ctx.data) {
        ctx.data.updatedAt = DateTime.utc().toJSDate();
      }
    });
    return modelClass;
  }
}
