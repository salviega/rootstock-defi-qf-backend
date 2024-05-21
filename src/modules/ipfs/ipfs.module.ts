import { Module } from '@nestjs/common';
import { IpfsController } from './controllers/ipfs.controller';
import { IpfsService } from './services/ipfs.service';
import { PinataRepository } from '../providers/repositories/pinata.repository';

@Module({
  imports: [],
  controllers: [IpfsController],
  providers: [IpfsService, PinataRepository],
  exports: [],
})
export class IpfsModule {}
