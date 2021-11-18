import { Module } from '@nestjs/common';
import { LandmarksController } from './controllers/landmarks.controller';
import { LandmarksService } from './services/landmarks.service';

@Module({
  controllers: [LandmarksController],
  providers: [LandmarksService],
})
export class GeodataModule {}
