import { IOClients } from '@vtex/api'

import Guper from './guper'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get guper() {
    return this.getOrSet('guper', Guper)
  }
}
