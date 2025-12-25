import { Injectable } from '@nestjs/common';
import { PdfExtractorService } from './services/pdf-extractor.service';
import { GeminiService } from './services/gemini.service';
import { OpenAIService } from './services/openai.service';
import { GroqService } from './services/groq.service';
import { HistoryService } from '../history/history.service';
import { SummarizeResponseDto } from './models/summarize-response.dto';

export type AIModel = 'gemini' | 'gpt' | 'groq';

/**
 * Main service for document summarization
 */
@Injectable()
export class SummarizerService {
  constructor(
    private readonly pdfExtractor: PdfExtractorService,
    private readonly geminiService: GeminiService,
    private readonly openaiService: OpenAIService,
    private readonly groqService: GroqService,
    private readonly historyService: HistoryService,
  ) {}

  /**
   * Gets the appropriate AI service based on model selection
   */
  private getAIService(model: AIModel) {
    switch (model) {
      case 'gpt':
        return this.openaiService;
      case 'groq':
        return this.groqService;
      default:
        return this.geminiService;
    }
  }

  /**
   * Summarizes a PDF document using specified AI model
   * @param file - Uploaded PDF file
   * @param model - AI model to use ('gemini', 'gpt', or 'groq')
   * @returns Structured summary response
   */
  async summarizePdf(
    file: Express.Multer.File,
    model: AIModel = 'gemini',
  ): Promise<SummarizeResponseDto> {
    const startTime = Date.now();
    const extractedData = await this.pdfExtractor.extractText(file.buffer);
    const aiService = this.getAIService(model);
    const summaryResult = await aiService.summarize(extractedData.text);
    const processingTimeMs = Date.now() - startTime;
    const result: SummarizeResponseDto = {
      filename: file.originalname,
      summary: summaryResult.summary,
      keyPoints: summaryResult.keyPoints,
      conclusions: summaryResult.conclusions,
      actionItems: summaryResult.actionItems,
      processingTimeMs,
      pageCount: extractedData.pageCount,
      characterCount: extractedData.characterCount,
    };
    // Save to history (don't save full PDF text to save space)
    await this.historyService.saveHistory(result, model);
    return result;
  }

  /**
   * Summarizes text content directly
   * @param text - Text content to summarize
   * @param model - AI model to use ('gemini', 'gpt', or 'groq')
   * @returns Structured summary response
   */
  async summarizeText(
    text: string,
    model: AIModel = 'gemini',
  ): Promise<SummarizeResponseDto> {
    const startTime = Date.now();
    const aiService = this.getAIService(model);
    const summaryResult = await aiService.summarize(text);
    const processingTimeMs = Date.now() - startTime;
    const result: SummarizeResponseDto = {
      filename: 'text-input',
      summary: summaryResult.summary,
      keyPoints: summaryResult.keyPoints,
      conclusions: summaryResult.conclusions,
      actionItems: summaryResult.actionItems,
      processingTimeMs,
      pageCount: 1,
      characterCount: text.length,
    };
    // Save to history with original text
    await this.historyService.saveHistory(result, model, text);
    return result;
  }
}
