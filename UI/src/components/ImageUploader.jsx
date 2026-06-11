import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";

const ImageUploader = ({ onImageUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const handlePaste = (e) => {
            if (
                e.clipboardData &&
                e.clipboardData.files &&
                e.clipboardData.files.length > 0
            ) {
                const file = e.clipboardData.files[0];
                if (file.type.startsWith("image/")) {
                    e.preventDefault();
                    handleFile(file);
                }
            }
        };

        window.addEventListener("paste", handlePaste);
        return () => {
            window.removeEventListener("paste", handlePaste);
        };
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            handleFile(file);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            handleFile(file);
        }
    };

    const handleFile = (file) => {
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onImageUpload({
                    file: file,
                    previewUrl: e.target.result,
                });
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid image file.");
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div
            className={`uploader-container ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
        >
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleChange}
            />
            <div className="uploader-content">
                <div className="icon-container">
                    <UploadCloud className="upload-icon" size={48} />
                </div>
                <h3>Upload your image</h3>
                <p>Drag and drop, click to browse, or paste (Ctrl+V)</p>
                <span className="file-hint">Supports: JPG, PNG, WEBP</span>
            </div>
        </div>
    );
};

export default ImageUploader;
