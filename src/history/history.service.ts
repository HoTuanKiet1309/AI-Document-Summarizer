import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { SummarizeResponseDto } from '../summarizer/models/summarize-response.dto';

/**
 * Service for managing summarization history
 */
@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  /**
   * Saves a summarization result to history
   */
  async saveHistory(
    result: SummarizeResponseDto,
    model: string,
    originalText?: string,
  ): Promise<History> {
    const history = this.historyRepository.create({
      filename: result.filename,
      summary: result.summary,
      keyPoints: JSON.stringify(result.keyPoints),
      conclusions: JSON.stringify(result.conclusions),
      actionItems: JSON.stringify(result.actionItems),
      model,
      pageCount: result.pageCount,
      characterCount: result.characterCount,
      processingTimeMs: result.processingTimeMs,
      originalText: originalText || null,
    });
    return (await this.historyRepository.save(history)) as History;
  }

  /**
   * Gets all history records, ordered by creation date (newest first)
   */
  async getAllHistory(limit?: number): Promise<History[]> {
    const query = this.historyRepository
      .createQueryBuilder('history')
      .orderBy('history.createdAt', 'DESC');
    if (limit) {
      query.limit(limit);
    }
    return query.getMany();
  }

  /**
   * Gets a single history record by ID
   */
  async getHistoryById(id: string): Promise<History | null> {
    return this.historyRepository.findOne({ where: { id } });
  }

  /**
   * Deletes a history record by ID
   */
  async deleteHistory(id: string): Promise<void> {
    await this.historyRepository.delete(id);
  }

  /**
   * Gets history count
   */
  async getHistoryCount(): Promise<number> {
    return this.historyRepository.count();
  }
}

