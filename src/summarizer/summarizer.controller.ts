import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SummarizerService, AIModel } from './summarizer.service';
import { SummarizeResponseDto } from './models/summarize-response.dto';
import { SummarizeTextDto } from './models/summarize-text.dto';

/**
 * Controller for document summarization endpoints
 */
@Controller('api/summarizer')
export class SummarizerController {
  constructor(private readonly summarizerService: SummarizerService) {}

  /**
   * Health check endpoint for smoke testing
   */
  @Get('test')
  test(): { status: string; timestamp: string; models: string[] } {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      models: ['gemini', 'gpt', 'groq'],
    };
  }

  /**
   * Summarizes an uploaded PDF document
   * @param file - PDF file to summarize
   * @param model - AI model to use ('gemini' or 'gpt')
   * @returns Structured summary with key points, conclusions, and action items
   */
  @Post('pdf')
  @UseInterceptors(FileInterceptor('file'))
  async summarizePdf(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Query('model') model?: string,
  ): Promise<SummarizeResponseDto> {
    this.validatePdfFile(file);
    const selectedModel = this.validateModel(model);
    return this.summarizerService.summarizePdf(file, selectedModel);
  }

  /**
   * Summarizes text content directly
   * @param body - Request body containing text and model
   * @returns Structured summary with key points, conclusions, and action items
   */
  @Post('text')
  async summarizeText(
    @Body() body: SummarizeTextDto,
  ): Promise<SummarizeResponseDto> {
    if (!body.text || body.text.trim().length === 0) {
      throw new BadRequestException('Text content is required');
    }
    if (body.text.length < 50) {
      throw new BadRequestException('Text is too short. Minimum 50 characters required.');
    }
    const selectedModel = this.validateModel(body.model);
    return this.summarizerService.summarizeText(body.text, selectedModel);
  }

  /**
   * Validates that the uploaded file is a PDF
   */
  private validatePdfFile(file: Express.Multer.File): void {
    const allowedMimeTypes = ['application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only PDF files are allowed.',
      );
    }
  }

  /**
   * Validates and returns the AI model
   */
  private validateModel(model?: string): AIModel {
    if (!model) return 'gemini';
    const validModels: AIModel[] = ['gemini', 'gpt', 'groq'];
    if (!validModels.includes(model as AIModel)) {
      throw new BadRequestException(
        `Invalid model. Valid options: ${validModels.join(', ')}`,
      );
    }
    return model as AIModel;
  }
}
