import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import register from 'src/config/register';

// TODO: Change require to import
const pinataSDK = require('@pinata/sdk');

@Injectable()
export class PinataClient {
  private client: any;

  constructor(
    @Inject(register.KEY) private configService: ConfigType<typeof register>,
  ) {
    this.initializeClient();
  }

  private initializeClient(): void {
    const pinataApiKey: string = this.configService.ipfs.pinata.pinataApiKey;

    const pinataSecretApiKey: string =
      this.configService.ipfs.pinata.pinataSecretApiKey;

    const pinataJWTKey: string = this.configService.ipfs.pinata.pinataJWTKey;

    this.client = new pinataSDK({
      pinataApiKey,
      pinataSecretApiKey,
      pinataJWTKey,
    });
  }

  public getClient(): any {
    return this.client;
  }
}
