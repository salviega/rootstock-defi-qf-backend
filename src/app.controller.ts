import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/')
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Status of the backend' })
  getHello(): string {
    return 'Attestation backend is running! 🎈';
  }
}
