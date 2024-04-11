import {BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class VednorHasServiceRequestsService {
  constructor() {}

  async sendAppointmentRequest() {}

  async handleAppointmentRequest() {}

  async showAppointmentRequest() {}

  async showAcceptedAppointments() {}

}
