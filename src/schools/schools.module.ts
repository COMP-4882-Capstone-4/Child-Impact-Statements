import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SchoolsController } from './controllers/schools.controller';
import { SchoolsService } from './services/schools.service';

@Module({
  imports: [HttpModule],
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
