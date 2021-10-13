import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path/posix';

@Injectable()
export class MemDataHubAPIService{
    private census = require('citysdk');
    private soda = require('soda-js');
    private apiKey: string;

    constructor(private configService: ConfigService){
        this.apiKey = this.configService.get<string>('API_KEY');
    }

    testRequest(){
        return new Promise((resolve) => {
            const consumer = new this.soda.Consumer('data.memphistn.gov');

            consumer
            .query()
            .withDataset('ybsi-jur4')
            .limit(10)
            .where({ category: "Assault" })
            .order('offense_date')
            .getRows()
            .on('success', (rows) => {
                resolve(rows);
            })
            .on('error', (error) => {
                console.error(error);
                resolve(error);
            })
        });
    }
}