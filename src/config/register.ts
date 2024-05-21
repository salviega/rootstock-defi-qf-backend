import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    ipfs: {
      pinata: {
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataSecretApiKey: process.env.PINATA_API_SECRET,
        pinataJWTKey: process.env.PINATA_JWT_KEY,
      },
    },
    port: process.env.PORT,
  };
});
