import { Module } from '@nestjs/common';
import { SummarizerController } from './summarizer.controller';
import { SummarizerService } from './summarizer.service';
import { PdfExtractorService } from './services/pdf-extractor.service';
import { GeminiService } from './services/gemini.service';
import { OpenAIService } from './services/openai.service';
import { GroqService } from './services/groq.service';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [HistoryModule],
  controllers: [SummarizerController],
  providers: [SummarizerService, PdfExtractorService, GeminiService, OpenAIService, GroqService],
})
export class SummarizerModule {}

