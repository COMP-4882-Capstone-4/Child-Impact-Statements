import { Module } from '@nestjs/common';
import { MemDataHubController } from './controllers/mem-datahub.controller';
import { MemDataHubAPIService } from './services/mem-datahub-api.service';

@Module({
    controllers: [MemDataHubController],
    providers: [MemDataHubAPIService],
    exports: [MemDataHubAPIService]
})

export class MemDataHubModule{}