import { Global, Module } from '@nestjs/common';
import { PinataClient } from './clients/pinata.client';
import { PinataRepository } from './repositories/pinata.repository';

@Global()
@Module({
  providers: [PinataClient, PinataRepository],
  exports: [PinataClient, PinataRepository],
})
export class ProvidersModule {}
