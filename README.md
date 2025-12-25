# AI Document Summarizer 📄✨

Ứng dụng tóm tắt tài liệu PDF thông minh sử dụng Google Gemini AI.

## Tính năng

- 📤 Upload file PDF (hỗ trợ kéo thả)
- 🔍 Trích xuất văn bản từ PDF
- ✨ Tóm tắt nội dung bằng AI (Google Gemini)
- 💡 Phân tích điểm chính, kết luận và hành động cần thực hiện
- 🎨 Giao diện đẹp, responsive

## Cài đặt

### Yêu cầu

- Node.js 18+ 
- npm hoặc yarn
- Google Gemini API Key

### Bước 1: Clone và cài đặt dependencies

```bash
cd AI336
npm install
```

### Bước 2: Cấu hình API Key

Tạo file `.env` trong thư mục gốc:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

Lấy API Key từ: https://makersuite.google.com/app/apikey

### Bước 3: Chạy ứng dụng

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Truy cập: http://localhost:3000

## API Endpoints

### GET /api/summarizer/test
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-12-21T10:00:00.000Z"
}
```

### POST /api/summarizer/pdf
Tóm tắt file PDF.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` - File PDF (tối đa 10MB)

**Response:**
```json
{
  "filename": "document.pdf",
  "summary": "Tóm tắt ngắn gọn...",
  "keyPoints": ["Điểm chính 1", "Điểm chính 2"],
  "conclusions": ["Kết luận 1"],
  "actionItems": ["Hành động 1"],
  "processingTimeMs": 2500,
  "pageCount": 5,
  "characterCount": 15000
}
```

## Cấu trúc dự án

```
AI336/
├── public/
│   └── index.html          # Frontend UI
├── src/
│   ├── main.ts             # Application entry point
│   ├── app.module.ts       # Root module
│   └── summarizer/
│       ├── summarizer.module.ts
│       ├── summarizer.controller.ts
│       ├── summarizer.service.ts
│       ├── models/
│       │   ├── summarize-response.dto.ts
│       │   └── extracted-text.dto.ts
│       └── services/
│           ├── pdf-extractor.service.ts
│           └── gemini.service.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Tech Stack

- **Backend:** NestJS, TypeScript
- **AI:** Google Gemini 1.5 Flash
- **PDF Processing:** pdf-parse
- **Frontend:** Vanilla HTML/CSS/JavaScript

## License

MIT

