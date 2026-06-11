# Vision AI - Backend API (FastAPI)

Đây là mã nguồn Backend cho dự án Phân loại ảnh Chó Mèo (Cat or Dog Classification). API này được xây dựng bằng **FastAPI** và sử dụng mô hình học sâu **PyTorch** để dự đoán nhãn của hình ảnh.

## 📁 Cấu trúc thư mục Backend

```text
BE/
├── dog_cat_model_classification.pth   # File trọng số của mô hình PyTorch
├── main.py                            # Khởi tạo FastAPI server và API endpoints
├── model_architecture.py              # Định nghĩa kiến trúc lớp mạng CNN
├── requirements.txt                   # Danh sách các thư viện Python cần thiết
└── README.md                          # Tài liệu hướng dẫn
```

## 🚀 Hướng dẫn chạy thử trên máy cá nhân (Local)

### Yêu cầu hệ thống:

- Đã cài đặt **Python 3.9+**

### Các bước cài đặt và khởi chạy:

1. **Di chuyển vào thư mục `BE`**:

    ```bash
    cd BE
    ```

2. **Tạo môi trường ảo (Virtual Environment) - Tuỳ chọn nhưng khuyên dùng**:

    ```bash
    python -m venv .venv
    .venv/Scripts/activate
    ```

3. **Cài đặt thư viện**:
   Cài đặt tất cả các dependencies từ file `requirements.txt`:

    ```bash
    pip install -r requirements.txt
    ```

4. **Khởi động Server FastAPI**:
    ```bash
    uvicorn main:app --reload
    ```
    Nếu console hiện thông báo `Model loaded successfully.` và `Uvicorn running on http://0.0.0.0:8000`, API của bạn đã sẵn sàng hoạt động

### Test API:

Sau khi chạy, bạn có thể truy cập trang tài liệu Swagger UI tự động của FastAPI tại:
`http://127.0.0.1:8000/docs` để kiểm tra API `/predict` bằng cách upload thử 1 bức ảnh
