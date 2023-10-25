import { Global, Module } from '@nestjs/common';
import { GoogleMapService } from './google-map.service';
import { GoogleRequestLogModule } from 'src/models/google-reqest-log/google-request-log.module';
@Global()
@Module({
  providers: [GoogleMapService],
  exports: [GoogleMapService],
  imports: [GoogleRequestLogModule]
})
export class GoogleMapModule {}
