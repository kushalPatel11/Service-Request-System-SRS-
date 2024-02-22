import {Entity, model, property} from '@loopback/repository';
import {DateTime} from 'luxon';

@model()
export class ServiceCategory extends Entity {
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
  description: string;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ServiceCategory>) {
    super(data);
  }
}

export interface ServiceCategoryRelations {
  // describe navigational properties here
}

export type ServiceCategoryWithRelations = ServiceCategory &
  ServiceCategoryRelations;
