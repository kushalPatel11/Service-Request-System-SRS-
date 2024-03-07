import {Entity, model, property} from '@loopback/repository';
import {DateTime} from 'luxon';

@model()
export class VendorHasService extends Entity {
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
  })
  serviceId: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

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

  constructor(data?: Partial<VendorHasService>) {
    super(data);
  }
}

export interface VendorHasServiceRelations {
  // describe navigational properties here
}

export type VendorHasServiceWithRelations = VendorHasService &
  VendorHasServiceRelations;
