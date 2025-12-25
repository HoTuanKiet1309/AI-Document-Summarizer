import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

/**
 * DTO for text summarization request
 */
export class SummarizeTextDto {
  @IsString()
  @IsNotEmpty({ message: 'Text content is required' })
  @MaxLength(100000, { message: 'Text is too long. Maximum 100,000 characters allowed.' })
  readonly text: string;

  @IsString()
  @IsOptional()
  readonly model?: string;
}

