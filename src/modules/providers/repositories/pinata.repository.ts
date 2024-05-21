import { Injectable } from '@nestjs/common';
import { PinataPinResponse } from '@pinata/sdk';
import { PINATA_GATEWAY } from 'src/config/constants/common';
import { bufferToStream } from 'src/generic/utils';
import internal from 'stream';
import { PinataClient } from 'src/modules/providers/clients/pinata.client';
import { OpenSeaStandard } from '../../ipfs/entities/open-sea-standard.entity';

@Injectable()
export class PinataRepository {
  constructor(private readonly pinataClient: PinataClient) {
    this.pinataClient = pinataClient;
  }

  async storeImage(file: any): Promise<string> {
    const client = this.pinataClient.getClient();

    const readableStreamForFile: internal.Readable = bufferToStream(
      file.buffer,
    );

    const options = {
      pinataMetadata: {
        name: file.originalname,
      },
    };

    const result: PinataPinResponse = await client.pinFileToIPFS(
      readableStreamForFile,
      options,
    );
    const ipfsHah: string = result.IpfsHash;

    const url: string = `${PINATA_GATEWAY}/ipfs/${ipfsHah}`;

    return url;
  }

  async storeObject(object: any): Promise<string> {
    const client = this.pinataClient.getClient();

    const result: PinataPinResponse = await client.pinJSONToIPFS(object);
    const ipfsHah: string = result.IpfsHash;

    const url: string = `${PINATA_GATEWAY}/ipfs/${ipfsHah}`;

    return url;
  }

  async storeOpenSeaObject(object: OpenSeaStandard): Promise<string> {
    const client = this.pinataClient.getClient();

    const result: PinataPinResponse = await client.pinJSONToIPFS(object);
    const ipfsHah: string = result.IpfsHash;

    const url: string = `${PINATA_GATEWAY}/ipfs/${ipfsHah}`;

    return url;
  }
}
