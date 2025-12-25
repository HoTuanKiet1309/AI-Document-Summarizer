import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

interface GeminiSummaryResult {
  readonly summary: string;
  readonly keyPoints: string[];
  readonly conclusions: string[];
  readonly actionItems: string[];
}

/**
 * Service for interacting with Google Gemini AI
 */
@Injectable()
export class GeminiService {
  private readonly model: GenerativeModel;
  private readonly MAX_INPUT_LENGTH = 30000;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('⚠️ GEMINI_API_KEY not found in environment variables');
    }
    const genAI = new GoogleGenerativeAI(apiKey || '');
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  /**
   * Summarizes the given text using Gemini AI
   * @param text - Text content to summarize
   * @returns Structured summary with key points, conclusions, and action items
   */
  async summarize(text: string): Promise<GeminiSummaryResult> {
    const truncatedText = this.truncateText(text);
    const prompt = this.buildPrompt(truncatedText);
    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response.text();
      return this.parseResponse(response);
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new InternalServerErrorException(
        'Failed to generate summary. Please check your API key and try again.',
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
    return `Bạn là một trợ lý AI chuyên tóm tắt tài liệu. Hãy phân tích văn bản sau và trả về kết quả theo định dạng JSON.

Văn bản cần tóm tắt:
"""
${text}
"""

Hãy trả về kết quả CHÍNH XÁC theo định dạng JSON sau (không thêm markdown, không thêm \`\`\`json):
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
- actionItems: Các hành động cần thực hiện (nếu có trong tài liệu, nếu không có thì để mảng rỗng [])
- CHỈ trả về JSON, không thêm text khác`;
  }

  /**
   * Parses the AI response into structured format
   */
  private parseResponse(response: string): GeminiSummaryResult {
    try {
      // Remove potential markdown code blocks
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
      // Fallback if JSON parsing fails
      return {
        summary: response.substring(0, 500),
        keyPoints: [],
        conclusions: [],
        actionItems: [],
      };
    }
  }
}

