# Tài Liệu Tham Khảo - AI Services

Tài liệu này cung cấp các link và thông tin tham khảo cho các dịch vụ AI được sử dụng trong dự án.

## 1. Google Gemini AI

### Tài Liệu Chính Thức
- **Official Documentation**: https://ai.google.dev/docs
- **Node.js SDK Documentation**: https://ai.google.dev/api/nodejs
- **API Reference**: https://ai.google.dev/api/rest
- **Getting Started Guide**: https://ai.google.dev/gemini-api/docs/get-started/node

### NPM Package
- **Package**: `@google/generative-ai`
- **NPM**: https://www.npmjs.com/package/@google/generative-ai
- **GitHub**: https://github.com/google/generative-ai-nodejs

### Các Model Available
- `gemini-2.0-flash` - Model hiện tại đang sử dụng
- `gemini-1.5-pro` - Model mạnh hơn, tốn kém hơn
- `gemini-1.5-flash` - Model nhanh, rẻ hơn
- Xem danh sách đầy đủ: https://ai.google.dev/models/gemini

### API Key
- Lấy API Key: https://aistudio.google.com/apikey
- Quản lý API Key: https://aistudio.google.com/app/apikey

### Rate Limits & Pricing
- Pricing: https://ai.google.dev/pricing
- Rate Limits: https://ai.google.dev/gemini-api/docs/quota

### Code Examples
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const result = await model.generateContent(prompt);
const response = result.response.text();
```

---

## 2. Groq API

### Tài Liệu Chính Thức
- **Official Documentation**: https://console.groq.com/docs
- **Quick Start Guide**: https://console.groq.com/docs/quickstart
- **API Reference**: https://console.groq.com/docs/api-reference

### NPM Package
- **Package**: `groq-sdk`
- **NPM**: https://www.npmjs.com/package/groq-sdk
- **GitHub**: https://github.com/groq/groq-sdk-node

### Các Model Available
- `llama-3.3-70b-versatile` - Model hiện tại đang sử dụng
- `llama-3.1-70b-versatile` - Phiên bản trước
- `llama-3.1-8b-instant` - Model nhỏ, nhanh hơn
- `mixtral-8x7b-32768` - Model khác
- Xem danh sách đầy đủ: https://console.groq.com/docs/models

### API Key
- Lấy API Key: https://console.groq.com/keys
- Tạo tài khoản: https://console.groq.com/

### Rate Limits & Pricing
- Pricing: https://console.groq.com/pricing
- Rate Limits: Thông tin trong dashboard

### Code Examples
```typescript
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const response = await groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: prompt }
  ],
  temperature: 0.3,
  max_tokens: 2000
});
```

---

## 3. OpenAI API

### Tài Liệu Chính Thức
- **Official Documentation**: https://platform.openai.com/docs
- **API Reference**: https://platform.openai.com/docs/api-reference
- **Node.js SDK**: https://platform.openai.com/docs/libraries/node-js-library

### NPM Package
- **Package**: `openai`
- **NPM**: https://www.npmjs.com/package/openai
- **GitHub**: https://github.com/openai/openai-node

### Các Model Available
- `gpt-4o-mini` - Model hiện tại đang sử dụng (cost-effective)
- `gpt-4o` - Model mạnh nhất hiện tại
- `gpt-4-turbo` - Model mạnh, nhanh
- `gpt-3.5-turbo` - Model rẻ, nhanh
- Xem danh sách đầy đủ: https://platform.openai.com/docs/models

### API Key
- Lấy API Key: https://platform.openai.com/api-keys
- Tạo tài khoản: https://platform.openai.com/signup

### Rate Limits & Pricing
- Pricing: https://openai.com/api/pricing/
- Rate Limits: https://platform.openai.com/docs/guides/rate-limits

### Code Examples
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: prompt }
  ],
  temperature: 0.3,
  max_tokens: 2000
});
```

---

## 4. So Sánh Các Dịch Vụ

### Google Gemini
- **Ưu điểm**: 
  - Miễn phí với hạn mức nhất định
  - Hỗ trợ tốt tiếng Việt
  - Model mới nhất (Gemini 2.0)
- **Nhược điểm**: 
  - Rate limit có thể thấp hơn
  - Cần Google account

### Groq
- **Ưu điểm**: 
  - Tốc độ rất nhanh (inference nhanh)
  - Miễn phí với hạn mức
  - Model Llama 3.3 mạnh
- **Nhược điểm**: 
  - Có thể có rate limit
  - Ít tùy chọn model hơn

### OpenAI
- **Ưu điểm**: 
  - Model GPT chất lượng cao
  - API ổn định, documentation tốt
  - Nhiều model để chọn
- **Nhược điểm**: 
  - Có phí (nhưng gpt-4o-mini rẻ)
  - Cần credit card để sử dụng

---

## 5. Best Practices

### Error Handling
- Luôn bắt và xử lý lỗi từ API
- Kiểm tra status code (401, 429, 500)
- Log lỗi để debug

### Rate Limiting
- Implement retry logic với exponential backoff
- Cache responses khi có thể
- Monitor rate limits trong dashboard

### Security
- **KHÔNG** commit API keys vào git
- Sử dụng environment variables
- Rotate API keys định kỳ

### Cost Optimization
- Chọn model phù hợp với use case
- Giới hạn `max_tokens` hợp lý
- Cache kết quả khi có thể
- Sử dụng `temperature` thấp cho tasks có cấu trúc

### Prompt Engineering
- Viết prompt rõ ràng, cụ thể
- Yêu cầu output format (JSON) rõ ràng
- Sử dụng system message để set context
- Test và iterate prompts

---

## 6. Troubleshooting

### Common Issues

#### Gemini
- **Error: API key not found**: Kiểm tra `GEMINI_API_KEY` trong `.env`
- **Error: Quota exceeded**: Đợi hoặc upgrade plan
- **JSON parsing error**: Model có thể trả về markdown, cần clean response

#### Groq
- **Error 429**: Rate limit exceeded, đợi và retry
- **Error 401**: API key không hợp lệ
- **Timeout**: Groq thường nhanh, nhưng có thể timeout với request lớn

#### OpenAI
- **Error 429**: Quota hoặc rate limit, kiểm tra billing
- **Error 401**: API key không hợp lệ hoặc hết credit
- **Cost concerns**: Sử dụng `gpt-4o-mini` thay vì `gpt-4o` để tiết kiệm

---

## 7. Additional Resources

### Community & Support
- **Gemini**: https://developers.googleblog.com/search/label/gemini
- **Groq**: https://discord.gg/groq
- **OpenAI**: https://community.openai.com/

### Tutorials & Guides
- **Gemini Tutorial**: https://ai.google.dev/tutorials
- **Groq Examples**: https://console.groq.com/docs/examples
- **OpenAI Cookbook**: https://cookbook.openai.com/

### Testing Tools
- **Gemini Studio**: https://aistudio.google.com/
- **Groq Playground**: https://console.groq.com/playground
- **OpenAI Playground**: https://platform.openai.com/playground

---

## 8. Environment Variables

Đảm bảo file `.env` có các biến sau:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

**Lưu ý**: File `.env` nên được thêm vào `.gitignore` để không commit API keys.

---

*Tài liệu này được cập nhật lần cuối: 2024*

