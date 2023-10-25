import { Injectable } from '@nestjs/common';
import { GoogleRequestLog } from './entities/google-request-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class GoogleRequestLogService {
    constructor(
        @InjectRepository(GoogleRequestLog)
        private readonly repo: Repository<GoogleRequestLog>,
      ) {}
    async create(columns: GoogleRequestLog): Promise<InsertResult> {
        const entities = this.repo.create(columns);
        return await this.repo.insert(entities);
      }
}
