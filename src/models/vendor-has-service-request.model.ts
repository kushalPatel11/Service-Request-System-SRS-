import {Entity, belongsTo, model, property} from '@loopback/repository';
import {DateTime} from 'luxon';
import {Services} from './services.model';
import {User} from './user.model';

@model()
export class VendorHasServiceRequest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id: string;

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

  @belongsTo(
    () => Services,
    {
      name: 'service',
    },
    {
      type: 'string',
      required: true,
      mongodb: {dataType: 'ObjectId'},
    },
  )
  serviceId: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['accepted', 'declined', 'pending'],
      errorMessage: {
        pattern: `Invalid Value`,
      },
    },
  })
  status: string;

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

  constructor(data?: Partial<VendorHasServiceRequest>) {
    super(data);
  }
}

export interface VendorHasServiceRequestRelations {
  // describe navigational properties here
}

export type VendorHasServiceRequestWithRelations = VendorHasServiceRequest &
  VendorHasServiceRequestRelations;
