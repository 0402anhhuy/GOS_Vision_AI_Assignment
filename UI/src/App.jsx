import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import ClassificationResult from "./components/ClassificationResult";
import { Sparkles } from "lucide-react";

function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleImageUpload = async (imageData) => {
        setSelectedImage(imageData);
        setIsLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append("file", imageData.file);

        try {
            const response = await fetch(
                "https://gos-vision-ai-assignment-be.onrender.compredict",
                {
                    method: "POST",
                    body: formData,
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to predict");
            }

            const data = await response.json();
            setResult({
                class: data.class,
                confidence: data.confidence,
            });
        } catch (error) {
            console.error("Error during prediction:", error);
            alert(`Prediction failed: ${error.message}`);
            setSelectedImage(null); // Reset on error
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setResult(null);
    };

    return (
        <div className="app-wrapper">
            <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            <main className="main-content">
                <header className="app-header">
                    <div className="logo-container">
                        <Sparkles className="logo-icon" />
                    </div>
                    <h1>Vision AI</h1>
                    <p>Intelligent Dog & Cat Classification</p>
                </header>

                <section className="card">
                    {!selectedImage ? (
                        <ImageUploader onImageUpload={handleImageUpload} />
                    ) : (
                        <ClassificationResult
                            image={selectedImage}
                            result={result}
                            isLoading={isLoading}
                            onReset={handleReset}
                        />
                    )}
                </section>

                <footer className="app-footer">
                    <p>AI Intern Assignment @ Golden Owl</p>
                </footer>
            </main>
        </div>
    );
}

export default App;
