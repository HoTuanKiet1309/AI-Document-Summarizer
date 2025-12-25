/**
 * Response DTO for document summarization
 */
export interface SummarizeResponseDto {
  /** Original filename */
  readonly filename: string;
  /** Brief summary of the document */
  readonly summary: string;
  /** Key points extracted from the document */
  readonly keyPoints: string[];
  /** Conclusions from the document */
  readonly conclusions: string[];
  /** Action items identified in the document */
  readonly actionItems: string[];
  /** Processing time in milliseconds */
  readonly processingTimeMs: number;
  /** Number of pages in the document */
  readonly pageCount: number;
  /** Character count of extracted text */
  readonly characterCount: number;
}

