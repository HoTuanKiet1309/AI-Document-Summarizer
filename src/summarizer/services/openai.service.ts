import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

interface OpenAISummaryResult {
  readonly summary: string;
  readonly keyPoints: string[];
  readonly conclusions: string[];
  readonly actionItems: string[];
}

/**
 * Service for interacting with OpenAI GPT API
 */
@Injectable()
export class OpenAIService {
  private readonly client: OpenAI;
  private readonly MAX_INPUT_LENGTH = 30000;
  private readonly MODEL = 'gpt-4o-mini'; // Cost-effective model

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.warn('⚠️ OPENAI_API_KEY not found in environment variables');
    }
    this.client = new OpenAI({ apiKey: apiKey || '' });
  }

  /**
   * Summarizes the given text using OpenAI GPT
   * @param text - Text content to summarize
   * @returns Structured summary with key points, conclusions, and action items
   */
  async summarize(text: string): Promise<OpenAISummaryResult> {
    const truncatedText = this.truncateText(text);
    const prompt = this.buildPrompt(truncatedText);
    try {
      const response = await this.client.chat.completions.create({
        model: this.MODEL,
        messages: [
          {
            role: 'system',
            content: 'Bạn là một trợ lý AI chuyên tóm tắt tài liệu. Luôn trả về kết quả dạng JSON hợp lệ.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });
      const content = response.choices[0]?.message?.content || '';
      return this.parseResponse(content);
    } catch (error: unknown) {
      console.error('OpenAI API Error:', error);
      const errorObj = error as { status?: number; message?: string };
      if (errorObj.status === 429) {
        throw new InternalServerErrorException(
          'OpenAI API quota exceeded. Please check your billing.',
        );
      }
      if (errorObj.status === 401) {
        throw new InternalServerErrorException(
          'Invalid OpenAI API key. Please check your configuration.',
        );
      }
      throw new InternalServerErrorException(
        'Failed to generate summary with GPT. Please try again.',
      );
    }
  }

  /**
   * Truncates text to fit within model limits
   */
  private truncateText(text: string): string {
    if (text.length <= this.MAX_INPUT_LENGTH) {
      return text;
    }
    return text.substring(0, this.MAX_INPUT_LENGTH) + '... [truncated]';
  }

  /**
   * Builds the prompt for summarization
   */
  private buildPrompt(text: string): string {
    return `Phân tích văn bản sau và trả về kết quả theo định dạng JSON.

Văn bản cần tóm tắt:
"""
${text}
"""

Trả về kết quả CHÍNH XÁC theo định dạng JSON sau (không thêm markdown, không thêm \`\`\`json):
{
  "summary": "Tóm tắt ngắn gọn nội dung chính của tài liệu (2-3 câu)",
  "keyPoints": ["Điểm chính 1", "Điểm chính 2", "Điểm chính 3"],
  "conclusions": ["Kết luận 1", "Kết luận 2"],
  "actionItems": ["Hành động cần thực hiện 1", "Hành động cần thực hiện 2"]
}

Lưu ý:
- Tóm tắt bằng tiếng Việt
- keyPoints: 3-5 điểm chính quan trọng nhất
- conclusions: 1-3 kết luận từ tài liệu
- actionItems: Các hành động cần thực hiện (nếu có, nếu không thì để mảng rỗng [])
- CHỈ trả về JSON thuần, không thêm text khác`;
  }

  /**
   * Parses the AI response into structured format
   */
  private parseResponse(response: string): OpenAISummaryResult {
    try {
      const cleanedResponse = response
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      const parsed = JSON.parse(cleanedResponse);
      return {
        summary: parsed.summary || 'No summary available',
        keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
        conclusions: Array.isArray(parsed.conclusions) ? parsed.conclusions : [],
        actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : [],
      };
    } catch {
      return {
        summary: response.substring(0, 500),
        keyPoints: [],
        conclusions: [],
        actionItems: [],
      };
    }
  }
}

