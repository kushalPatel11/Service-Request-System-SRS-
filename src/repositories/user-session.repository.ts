import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  Filter,
  Options,
  repository,
} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {User, UserSession, UserSessionRelations} from '../models';
import {UserRepository} from './user.repository';
import { HttpErrors } from '@loopback/rest';
import { customErrorMsg, serviceGenieConstant } from '../keys';
import { DateTime } from 'luxon';

export class UserSessionRepository extends DefaultCrudRepository<
  UserSession,
  typeof UserSession.prototype.id,
  UserSessionRelations
> {
  public readonly user: BelongsToAccessor<User, typeof User.prototype.id>;
  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserSession, dataSource);

    //for user
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }

  async findOne(
    filter?: Filter<UserSession>,
    options?: Options,
  ): Promise<UserSession> {
    const result = await super.findOne(filter, options);

    if (result) {
      return result;
    } else {
      throw new HttpErrors.NotFound('Entity Not Found: Session');
    }
  }

  async findSessionByToken(token: string) {
    const session = await this.findOne({
      where: {
        jwt: token,
      },
    });

    if (!session) {
      throw new HttpErrors[404](customErrorMsg.authErrors.TOKEN_NOT_FOUND);
    }

    if (
      DateTime.fromJSDate(session?.expireAt).valueOf() <
        DateTime.utc().valueOf() &&
      session.status === serviceGenieConstant.sessionstatus.CURRENT
    ) {
      await this.updateById(session.id, {
        status: serviceGenieConstant.sessionstatus.EXPIRED,
        expiredAt: DateTime.utc().toJSDate(),
        _v: session._v + 1,
      });
    }
    return session;
  }

  definePersistedModel(entityClass: typeof UserSession) {
    const modelClass = super.definePersistedModel(entityClass);
    modelClass.observe('before save', async ctx => {
      if (!ctx.isNewInstance && ctx.data) {
        ctx.data.updatedAt = DateTime.utc().toJSDate();
        console.log(ctx.data);
      }
    });
    return modelClass;
  }
}
