import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { environments } from './config/environments';
import { ConfigModule } from '@nestjs/config';
import register from './config/register';
import * as Joi from 'joi';
import { IpfsModule } from './modules/ipfs/ipfs.module';
import { ProvidersModule } from './modules/providers/providers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || environments.dev,
      isGlobal: true,
      load: [register],
      validationSchema: Joi.object({
        PINATA_API_KEY: Joi.string().required(),
        PINATA_API_SECRET: Joi.string().required(),
        PINATA_JWT_KEY: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    IpfsModule,
    ProvidersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
