/**
 * DTO for extracted text from PDF
 */
export interface ExtractedTextDto {
  /** Extracted text content */
  readonly text: string;
  /** Number of pages */
  readonly pageCount: number;
  /** Character count */
  readonly characterCount: number;
}

