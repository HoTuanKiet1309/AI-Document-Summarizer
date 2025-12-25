import {
  Controller,
  Get,
  Delete,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { HistoryResponseDto } from './dto/history-response.dto';

/**
 * Controller for history management endpoints
 */
@Controller('api/history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  /**
   * Transforms History entity to response DTO
   */
  private transformHistory(history: History): HistoryResponseDto {
    return {
      ...history,
      keyPoints: JSON.parse(history.keyPoints || '[]'),
      conclusions: JSON.parse(history.conclusions || '[]'),
      actionItems: JSON.parse(history.actionItems || '[]'),
    };
  }

  /**
   * Gets all history records
   * @param limit - Optional limit for number of records
   */
  @Get()
  async getAllHistory(
    @Query('limit') limit?: string,
  ): Promise<{ data: HistoryResponseDto[]; count: number }> {
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    const data = await this.historyService.getAllHistory(limitNum);
    const count = await this.historyService.getHistoryCount();
    return {
      data: data.map((item) => this.transformHistory(item)),
      count,
    };
  }

  /**
   * Gets a single history record by ID
   */
  @Get(':id')
  async getHistoryById(@Param('id') id: string): Promise<HistoryResponseDto> {
    const history = await this.historyService.getHistoryById(id);
    if (!history) {
      throw new NotFoundException(`History with ID ${id} not found`);
    }
    return this.transformHistory(history);
  }

  /**
   * Deletes a history record by ID
   */
  @Delete(':id')
  async deleteHistory(@Param('id') id: string): Promise<{ message: string }> {
    await this.historyService.deleteHistory(id);
    return { message: 'History deleted successfully' };
  }
}

