import {Entity, belongsTo, model, property} from '@loopback/repository';
import {User} from './user.model';
import {DateTime} from 'luxon';

@model()
export class UserCredentials extends Entity {
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
    type: 'array',
    itemType: 'string',
    default: [],
  })
  oldPasswords?: string[];

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern:
        '^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,})$',
      errorMessage: {
        pattern: `Must include one uppercase, one lower case, one number, one special character and minimum of 8 characters`,
      },
    },
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    default: () => DateTime.utc().toJSDate(),
  })
  createdAt: string;

  @property({
    type: 'string',
    required: true,
    default: () => DateTime.utc().toJSDate(),
  })
  updatedAt: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  _v: number;

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials &
  UserCredentialsRelations;
