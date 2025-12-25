const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Font paths for Vietnamese support
const ARIAL_REGULAR = 'C:/Windows/Fonts/arial.ttf';
const ARIAL_BOLD = 'C:/Windows/Fonts/arialbd.ttf';

// Ensure samples directory exists
const samplesDir = path.join(__dirname, '..', 'samples');
if (!fs.existsSync(samplesDir)) {
  fs.mkdirSync(samplesDir, { recursive: true });
}

// Sample 1: Meeting Report
function createMeetingReport() {
  const doc = new PDFDocument();
  const filePath = path.join(samplesDir, 'bao-cao-hop.pdf');
  doc.pipe(fs.createWriteStream(filePath));

  doc.font(ARIAL_BOLD).fontSize(24).text('BÁO CÁO CUỘC HỌP', { align: 'center' });
  doc.moveDown();
  doc.font(ARIAL_REGULAR).fontSize(14).text('Ngày: 20/12/2024');
  doc.text('Địa điểm: Phòng họp A - Tầng 5');
  doc.text('Chủ trì: Nguyễn Văn A - Giám đốc');
  doc.moveDown();

  doc.font(ARIAL_BOLD).fontSize(16).text('1. NỘI DUNG CHÍNH');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
- Tổng kết hoạt động kinh doanh quý 4/2024
- Đánh giá hiệu suất làm việc của các phòng ban
- Thảo luận kế hoạch phát triển quý 1/2025
- Phân bổ ngân sách cho các dự án mới
  `);

  doc.font(ARIAL_BOLD).fontSize(16).text('2. KẾT QUẢ THẢO LUẬN');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
- Doanh thu quý 4 đạt 15 tỷ đồng, tăng 20% so với cùng kỳ năm trước
- Phòng Marketing hoàn thành 95% KPI đề ra
- Phòng IT cần bổ sung thêm 5 nhân sự cho dự án mới
- Ngân sách Q1/2025 được phê duyệt: 8 tỷ đồng
  `);

  doc.font(ARIAL_BOLD).fontSize(16).text('3. KẾT LUẬN');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
- Công ty đã hoàn thành xuất sắc mục tiêu năm 2024
- Cần đẩy mạnh chuyển đổi số trong năm 2025
- Tập trung phát triển sản phẩm mới và mở rộng thị trường
  `);

  doc.font(ARIAL_BOLD).fontSize(16).text('4. HÀNH ĐỘNG CẦN THỰC HIỆN');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
- HR: Hoàn thành tuyển dụng 5 IT trước 15/01/2025
- Marketing: Lập kế hoạch campaign Q1 trước 25/12/2024
- Finance: Gửi báo cáo tài chính năm cho BGĐ trước 31/12/2024
- IT: Demo sản phẩm mới cho khách hàng trước 10/01/2025
  `);

  doc.end();
  console.log('Created:', filePath);
}

// Sample 2: Technical Document
function createTechnicalDoc() {
  const doc = new PDFDocument();
  const filePath = path.join(samplesDir, 'tai-lieu-ky-thuat.pdf');
  doc.pipe(fs.createWriteStream(filePath));

  doc.font(ARIAL_BOLD).fontSize(24).text('TÀI LIỆU KỸ THUẬT', { align: 'center' });
  doc.font(ARIAL_REGULAR).fontSize(14).text('Hệ thống quản lý đơn hàng v2.0', { align: 'center' });
  doc.moveDown(2);

  doc.font(ARIAL_BOLD).fontSize(16).text('1. TỔNG QUAN HỆ THỐNG');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
Hệ thống quản lý đơn hàng (Order Management System - OMS) là một giải pháp toàn diện giúp doanh nghiệp quản lý quy trình đặt hàng từ khâu tiếp nhận đến giao hàng. Hệ thống được xây dựng trên nền tảng cloud với khả năng mở rộng cao.

Các tính năng chính:
- Quản lý đơn hàng đa kênh (website, mobile app, POS)
- Tích hợp với các đơn vị vận chuyển
- Quản lý kho và tồn kho realtime
- Báo cáo và phân tích dữ liệu
  `);

  doc.font(ARIAL_BOLD).fontSize(16).text('2. KIẾN TRÚC HỆ THỐNG');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
- Frontend: React.js, TypeScript, TailwindCSS
- Backend: NestJS, PostgreSQL, Redis
- Infrastructure: AWS (ECS, RDS, ElastiCache, S3)
- CI/CD: GitHub Actions, Docker, Terraform
  `);

  doc.font(ARIAL_BOLD).fontSize(16).text('3. YÊU CẦU KỸ THUẬT');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
- Node.js version 18 trở lên
- PostgreSQL version 14 trở lên
- Redis version 7 trở lên
- Minimum RAM: 4GB
- Minimum Storage: 50GB SSD
  `);

  doc.font(ARIAL_BOLD).fontSize(16).text('4. HƯỚNG DẪN CÀI ĐẶT');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
Bước 1: Clone repository từ GitHub
Bước 2: Cài đặt dependencies với npm install
Bước 3: Cấu hình file .env theo mẫu
Bước 4: Chạy migration database
Bước 5: Khởi động server với npm run start
  `);

  doc.end();
  console.log('Created:', filePath);
}

// Sample 3: Student Feedback Report
function createFeedbackReport() {
  const doc = new PDFDocument();
  const filePath = path.join(samplesDir, 'phan-hoi-hoc-vien.pdf');
  doc.pipe(fs.createWriteStream(filePath));

  doc.font(ARIAL_BOLD).fontSize(24).text('BÁO CÁO PHẢN HỒI HỌC VIÊN', { align: 'center' });
  doc.font(ARIAL_REGULAR).fontSize(14).text('Khóa học: Lập trình Web Full-stack', { align: 'center' });
  doc.text('Kỳ: Tháng 11-12/2024', { align: 'center' });
  doc.moveDown(2);

  doc.font(ARIAL_BOLD).fontSize(16).text('1. THỐNG KÊ TỔNG QUAN');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
- Tổng số học viên tham gia khảo sát: 150/180 (83.3%)
- Điểm đánh giá trung bình: 4.5/5.0
- Tỷ lệ hài lòng: 92%
- Tỷ lệ giới thiệu cho người khác: 88%
  `);

  doc.font(ARIAL_BOLD).fontSize(16).text('2. ĐÁNH GIÁ CHI TIẾT');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
Nội dung khóa học: 4.6/5.0
- Kiến thức được cập nhật, phù hợp thực tế
- Bài tập thực hành đa dạng và hữu ích
- Cần bổ sung thêm phần về DevOps

Giảng viên: 4.7/5.0
- Trình bày rõ ràng, dễ hiểu
- Nhiệt tình hỗ trợ học viên
- Có nhiều kinh nghiệm thực tế

Cơ sở vật chất: 4.2/5.0
- Phòng học thoáng mát
- Wifi đôi khi không ổn định
- Cần thêm ổ cắm điện
  `);

  doc.font(ARIAL_BOLD).fontSize(16).text('3. Ý KIẾN NỔI BẬT');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
Tích cực:
- "Khóa học rất thực tế, sau khi học xong tôi đã tìm được việc làm"
- "Giảng viên rất tận tâm, support cả ngoài giờ học"
- "Project cuối khóa giúp tôi có portfolio ấn tượng"

Cần cải thiện:
- "Nên có thêm buổi review code 1-1"
- "Thời gian học hơi dài, nên chia nhỏ hơn"
- "Cần cập nhật thêm về Next.js 14"
  `);

  doc.font(ARIAL_BOLD).fontSize(16).text('4. ĐỀ XUẤT CẢI TIẾN');
  doc.font(ARIAL_REGULAR).fontSize(12).text(`
- Bổ sung module DevOps cơ bản vào chương trình
- Tổ chức thêm buổi workshop với doanh nghiệp
- Nâng cấp hệ thống wifi phòng học
- Thêm session mentor 1-1 hàng tuần
- Cập nhật giáo trình theo công nghệ mới nhất
  `);

  doc.end();
  console.log('Created:', filePath);
}

// Run all
console.log('Creating sample PDF files...\n');
createMeetingReport();
createTechnicalDoc();
createFeedbackReport();
console.log('\nDone! Check the "samples" folder.');

