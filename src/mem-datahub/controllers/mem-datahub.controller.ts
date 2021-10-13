import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { MemDataHubAPIService } from '../services/mem-datahub-api.service';

@Controller('mem-datahub')
@ApiTags('MemDataHub')
export class MemDataHubController{
    constructor(private MemDataHubAPIService: MemDataHubAPIService){}

    @Get('test')
    testRequest(){
        return this.MemDataHubAPIService.testRequest();
    }
}