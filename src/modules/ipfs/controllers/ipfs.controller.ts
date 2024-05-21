import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IpfsService } from '../services/ipfs.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { OpenSeaStandard } from '../entities/open-sea-standard.entity';

@ApiTags('ipfs')
@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Post('store-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async storeImage(@UploadedFile() file: any): Promise<string> {
    if (!file) {
      throw new BadRequestException('Se requiere el archivo de imagen.');
    }
    return this.ipfsService.storeImage(file);
  }

  @Post('store-object')
  async storeObject(@Body() data: OpenSeaStandard): Promise<string> {
    return this.ipfsService.storeObject(data);
  }

  @Post('store-any-object')
  @ApiBody({
    schema: {
      type: 'object',
      additionalProperties: true,
      example: {},
    },
  })
  async storeAnyObject(@Body() data: any): Promise<string> {
    return this.ipfsService.storeAnyObject(data);
  }
}
