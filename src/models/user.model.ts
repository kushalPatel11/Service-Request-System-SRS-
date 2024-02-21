import {Entity, model, property} from '@loopback/repository';
import {DateTime} from 'luxon';
import {ForgotPasswordData} from './forgot-password-data.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: '^(?! ).*[^ ]$',
      errorMessage: {
        pattern: `can't be blank`,
      },
    },
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: '^(?! ).*[^ ]$',
      errorMessage: {
        pattern: `can't be blank`,
      },
    },
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['customer', 'vendor'],
      errorMessage: {
        pattern: `Choose from customer and vendor only!!`,
      },
    },
  })
  userType: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email',
      errorMessage: {
        pattern: `Invalid Email`,
      },
    },
  })
  email: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      pattern: '^\\d{1,10}$',
      errorMessage: {
        pattern: `Invalid Phone Number.`,
      },
    },
  })
  phoneNumber: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: '^\\+\\d{1,2}$',
      errorMessage: {
        pattern: `Invalid Country Code.`,
      },
    },
  })
  countryCode: string;

  @property({
    type: ForgotPasswordData,
    default: new ForgotPasswordData(),
  })
  forgotPasswordToken?: ForgotPasswordData;

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

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
