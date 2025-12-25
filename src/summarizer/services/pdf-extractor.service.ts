import { Injectable, BadRequestException } from '@nestjs/common';
import pdfParse = require('pdf-parse');
import { ExtractedTextDto } from '../models/extracted-text.dto';

/**
 * Service for extracting text from PDF files
 */
@Injectable()
export class PdfExtractorService {
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  /**
   * Extracts text content from a PDF buffer
   * @param buffer - PDF file buffer
   * @returns Extracted text with metadata
   */
  async extractText(buffer: Buffer): Promise<ExtractedTextDto> {
    this.validateBuffer(buffer);
    try {
      const data = await pdfParse(buffer);
      const text = this.cleanText(data.text);
      return {
        text,
        pageCount: data.numpages,
        characterCount: text.length,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to parse PDF file. Please ensure the file is a valid PDF document.',
      );
    }
  }

  /**
   * Validates the PDF buffer
   */
  private validateBuffer(buffer: Buffer): void {
    if (!buffer || buffer.length === 0) {
      throw new BadRequestException('Empty file provided');
    }
    if (buffer.length > this.MAX_FILE_SIZE) {
      throw new BadRequestException(
        `File size exceeds maximum limit of ${this.MAX_FILE_SIZE / 1024 / 1024}MB`,
      );
    }
  }

  /**
   * Cleans extracted text by removing excessive whitespace
   */
  private cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
}

