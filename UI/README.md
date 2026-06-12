# GOS Vision AI Assignment - Frontend UI (React & Vite)

Đây là mã nguồn Frontend (Giao diện người dùng) cho dự án Phân loại ảnh Chó Mèo (Cat or Dog Classification)
Giao diện được xây dựng bằng **React** kết hợp với công cụ build siêu tốc **Vite**, mang lại trải nghiệm người dùng mượt mà, trực quan với các hiệu ứng chuyển động hiện đại

## Công nghệ sử dụng

- **Core:** React 19, Vite
- **Styling:** Vanilla CSS (Sử dụng CSS thuần kết hợp biến `--var` để quản lý màu sắc và thiết kế theo phong cách Glassmorphism).
- **Icons:** `lucide-react`
- **Giao tiếp API:** Sử dụng `fetch` API tiêu chuẩn của trình duyệt

## 📁 Cấu trúc thư mục UI

```text
UI/
├── src/
│   ├── components/
│   │   ├── ClassificationResult.jsx  # Component hiển thị kết quả phân loại
│   │   └── ImageUploader.jsx         # Component xử lý tải ảnh lên (kéo thả, click, dán)
│   ├── App.jsx                       # Component chính kết nối giao diện và Backend API
│   ├── App.css                       # Chứa CSS phụ
│   ├── index.css                     # Chứa toàn bộ CSS cốt lõi
│   └── main.jsx                      # File khởi chạy React
├── package.json                      # Quản lý các thư viện npm
└── vite.config.js                    # Cấu hình cho Vite
```

## Hướng dẫn chạy thử trên máy local

### Yêu cầu hệ thống:

- Đã cài đặt **Node.js** và **npm**

### Các bước khởi chạy:

1. **Mở Terminal và di chuyển vào thư mục `UI`**:

    ```bash
    cd UI
    ```

2. **Cài đặt các gói thư viện (Dependencies)**:

    ```bash
    npm install
    ```

3. **Cấu hình đường dẫn API**:
   Mặc định ứng dụng đang trỏ tới API đã deploy trên Render. Nếu bạn muốn chạy test với Backend ở dưới máy tính cá nhân của bạn, hãy mở file `src/App.jsx` và đổi link fetch thành:
   `http://localhost:8000/predict`

4. **Khởi động chế độ Development Server**:

    ```bash
    npm run dev
    ```

5. **Truy cập web**:
   Mở trình duyệt web của bạn và truy cập vào địa chỉ `http://localhost:5173`. Giao diện sẽ tự động làm mới (hot-reload) khi bạn sửa code
