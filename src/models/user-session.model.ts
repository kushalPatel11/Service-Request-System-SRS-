import {Entity, belongsTo, model, property} from '@loopback/repository';
import {User} from './user.model';
import {DateTime} from 'luxon';

@model()
export class UserSession extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'objectId'},
  })
  id?: string;

  @belongsTo(
    () => User,
    {
      name: 'user',
    },
    {
      type: 'string',
      required: true,
      mongodb: {dataType: 'ObjectId'},
    },
  )
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  jwt: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['Current', 'Expired'],
    },
    default: 'Current',
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  loginAt: Date;

  @property({
    type: 'string',
    required: true,
  })
  expireAt: Date;

  @property({
    type: 'string',
    default: null,
  })
  expiredAt: DateTime;

  @property({
    type: 'string',
    required: true,
    default: () => DateTime.utc().toJSDate(),
  })
  createdAt: DateTime;

  @property({
    type: 'string',
    required: true,
    default: () => DateTime.utc().toJSDate(),
  })
  updatedAt: DateTime;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  _v: number;

  constructor(data?: Partial<UserSession>) {
    super(data);
  }
}

export interface UserSessionRelations {
  // describe navigational properties here
}

export type UserSessionWithRelations = UserSession & UserSessionRelations;
