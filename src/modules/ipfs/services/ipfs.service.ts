import { Injectable } from '@nestjs/common';
import { PinataRepository } from 'src/modules/providers/repositories/pinata.repository';
import { OpenSeaStandard } from '../entities/open-sea-standard.entity';

@Injectable()
export class IpfsService {
  constructor(private readonly pinataRepository: PinataRepository) {}

  async storeImage(file: any): Promise<string> {
    return this.pinataRepository.storeImage(file);
  }

  async storeObject(data: OpenSeaStandard): Promise<string> {
    return this.pinataRepository.storeObject(data);
  }

  async storeAnyObject(data: any): Promise<string> {
    return this.pinataRepository.storeObject(data);
  }
}
