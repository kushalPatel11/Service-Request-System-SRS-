import {Entity, belongsTo, model, property} from '@loopback/repository';
import {DateTime} from 'luxon';
import {ServiceCategory} from './service-category.model';

@model()
export class Services extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id: string;

  @belongsTo(
    () => ServiceCategory,
    {
      name: 'serviceCategory',
    },
    {
      type: 'string',
      required: true,
      mongodb: {dataType: 'ObjectId'},
    },
  )
  serviceCategoryId: string;

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
  name: string;

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
  companyName: string;

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
  description: string;

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
    type: 'string',
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
      pattern: '^(?! ).*[^ ]$',
      errorMessage: {
        pattern: `can't be blank`,
      },
    },
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  availability: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: `^(http:\\/\\/|https:\\/\\/)?(www\\.)?[a-zA-Z0-9-_\\.]+\\.[a-zA-Z]+(:\\d+)?(\\/[a-zA-Z\\d\\.\\-_]*)*[a-zA-Z.!@#$%&=-_'":,.?\\d*)(]*$`,
      errorMesaage: {
        pattern: 'Website Invalid',
      },
    },
  })
  website: string;

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

  constructor(data?: Partial<Services>) {
    super(data);
  }
}

export interface ServicesRelations {
  // describe navigational properties here
}

export type ServicesWithRelations = Services & ServicesRelations;
