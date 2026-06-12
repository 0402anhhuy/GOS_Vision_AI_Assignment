# GOS Vision AI Assignment - Phân loại Chó Mèo (Cat or Dog Classification)

Đây là dự án AI Internship Assignment bao gồm một hệ thống hoàn chỉnh từ Frontend đến Backend. Dự án sử dụng mô hình mạng nơ-ron tích chập (CNN) xây dựng bằng **PyTorch** để phân loại hình ảnh Chó/Mèo, kết hợp cùng giao diện Web trực quan được phát triển với **React & Vite**.

## 🌐 Live Demo & Deployment

Hệ thống đã được triển khai (Deploy) thực tế lên môi trường cloud:

- **Trang web (Frontend - Netlify):** `https://gos-vision-ai-assignment-ui.netlify.app/`
- **API Server (Backend - Render):** `https://gos-vision-ai-assignment-be.onrender.com`

---

## Các tính năng nổi bật

- **AI Phân loại thông minh:** Sử dụng mạng nơ-ron CNN được huấn luyện bằng PyTorch với độ chính xác cao.
- **Giao diện Glassmorphism hiện đại:** Thiết kế tinh tế, trực quan, mang lại trải nghiệm người dùng cao cấp (Premium UI).
- **Đa dạng cách tải ảnh:** Hỗ trợ Upload truyền thống, Kéo thả (Drag & Drop), và Dán trực tiếp từ bộ nhớ tạm (Ctrl+V/Cmd+V).
- **Dự đoán Real-time:** Phản hồi nhanh chóng với trạng thái Skeleton Loading mượt mà trong lúc chờ API.
- **Micro-animations sinh động:** Các hiệu ứng Hover, Progress Bar báo cáo % Confidence Score (độ tự tin) và các Background Blur tự động chuyển động.
- **Monorepo Architecture:** Cấu trúc dự án chặt chẽ, dễ bảo trì, tách bạch rõ ràng giữa Frontend (React/Vite) và Backend (FastAPI).

---

## Hướng dẫn sử dụng nhanh

1. Truy cập vào **đường link Live Demo** phía trên (hoặc chạy Web trên localhost của bạn).
2. Khi giao diện Web mở ra, bạn có thể thực hiện 1 trong 3 cách sau để tải ảnh lên:
    - Nhấn vào vùng tải ảnh để **chọn file từ máy tính**.
    - **Kéo và thả (Drag & Drop)** một hình ảnh chó hoặc mèo vào vùng đó.
    - Copy một ảnh bất kỳ và ấn **`Ctrl + V` (hoặc `Cmd + V`)** để dán trực tiếp.
3. Chờ trong giây lát để AI phân tích.
4. Nhận kết quả dự đoán (Chó/Mèo) cùng độ tự tin của model. Ấn **"Classify Another Image"** nếu muốn thử tiếp với ảnh khác.

---

## Luồng hoạt động chi tiết

Dự án hoạt động theo mô hình Client-Server, trong đó Frontend và Backend giao tiếp với nhau qua chuẩn REST API.

### 1. Luồng hoạt động của Frontend

- **Tương tác người dùng:** Người dùng có thể kéo thả, click chọn file, hoặc ấn `Ctrl+V` (Paste) ảnh trực tiếp vào giao diện của component `ImageUploader`.
- **Hiển thị & Loading:** Ngay khi nhận được ảnh, React sẽ dùng `FileReader` tạo preview để hiển thị ảnh lên màn hình. Đồng thời, giao diện chuyển sang trạng thái Loading (Skeleton pulse và Spinner) thông qua component `ClassificationResult`.
- **Gửi Request:** Component `App.jsx` sẽ đóng gói file ảnh gốc vào một đối tượng `FormData` và gửi một HTTP `POST` request qua hàm `fetch` tới địa chỉ API của Backend (`/predict`).
- **Xử lý kết quả:** Sau khi nhận được JSON trả về, React sẽ gỡ bỏ trạng thái Loading, cập nhật State và hiển thị kết quả bao gồm: Nhãn phân loại (Icon 🐱/🐶) và Thanh tiến trình (Progress Bar) thể hiện độ tự tin (Confidence Score).

### 2. Luồng hoạt động của Backend

- **Tiếp nhận Request:** Server `FastAPI` liên tục lắng nghe tại endpoint `POST /predict`. Khi có request chứa file gửi tới, nó sẽ trích xuất dữ liệu nhị phân của hình ảnh.
- **Tiền xử lý (Preprocessing):** Ảnh được mở bằng thư viện `Pillow`, chuyển sang hệ màu RGB. Sau đó, chạy qua 파ipeline biến đổi của `torchvision.transforms`:
    - `Resize` ép kích thước ảnh về chuẩn `224x224` pixel.
    - `ToTensor` chuyển ảnh thành ma trận số học.
    - `Normalize` chuẩn hóa các giá trị pixel theo trung bình và độ lệch chuẩn của ImageNet (mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]).
- **Dự đoán (Inference):** Tensor hình ảnh được đưa vào mô hình `CustomCNN` (đã được load sẵn trọng số từ file `dog_cat_model_classification.pth`).
- **Hậu xử lý (Postprocessing):** Đầu ra của mô hình (Logits) được đưa qua hàm `Softmax` để chuyển đổi thành xác suất phần trăm. Hệ thống sẽ lấy ra xác suất cao nhất (Confidence) và vị trí của nó (Index) để đối chiếu với mảng nhãn `['Cat', 'Dog']`.
- **Trả về (Response):** Backend trả về Frontend một chuỗi JSON gồm 2 trường: `"class"` (nhãn dự đoán) và `"confidence"` (độ tin cậy).

---

## 📁 Cấu trúc dự án (Monorepo)

Dự án sử dụng cấu trúc Monorepo để dễ quản lý toàn bộ code trong một Repository duy nhất:

```text
GOS_Vision_AI_Assignment/
├── BE/                                    # Thư mục chứa mã nguồn Backend
│   ├── dog_cat_model_classification.pth   # File model trọng số (PyTorch)
│   ├── main.py                            # API Server (FastAPI)
│   ├── model_architecture.py              # Định nghĩa kiến trúc CNN
│   ├── requirements.txt                   # Thư viện Python
│   └── README.md                          # Hướng dẫn chi tiết BE
├── UI/                                    # Thư mục chứa mã nguồn Frontend
│   ├── src/                               # Code giao diện React
│   ├── package.json                       # Thư viện Node.js
│   ├── index.html                         # Trang chủ Web
│   └── README.md                          # Hướng dẫn chi tiết UI
└── README.md                              # Báo cáo tổng quan dự án (File này)
```

_(Chi tiết hướng dẫn cài đặt và chạy thử từng phần ở Local, vui lòng tham khảo file `README.md` bên trong từng thư mục tương ứng)_

---

_Dự án được thực hiện nhằm mục đích báo cáo quá trình AI Internship Assignment tại Golden Owl Solutions_
