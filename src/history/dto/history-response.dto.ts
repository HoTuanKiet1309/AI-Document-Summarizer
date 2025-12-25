/**
 * DTO for history response with parsed arrays
 */
export interface HistoryResponseDto {
  readonly id: string;
  readonly filename: string;
  readonly summary: string;
  readonly keyPoints: string[];
  readonly conclusions: string[];
  readonly actionItems: string[];
  readonly model: string;
  readonly pageCount: number;
  readonly characterCount: number;
  readonly processingTimeMs: number;
  readonly originalText: string | null;
  readonly createdAt: Date;
}

