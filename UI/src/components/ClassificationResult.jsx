import React from "react";
import { RefreshCw } from "lucide-react";

const ClassificationResult = ({ image, result, isLoading, onReset }) => {
    return (
        <div className="result-container">
            <div className="result-column">
                <h4 className="column-title">Original Image</h4>
                <div className="image-preview">
                    <img src={image.previewUrl} alt="Preview" />
                    {isLoading && (
                        <div className="loading-overlay">
                            <div className="spinner"></div>
                            <p>Analyzing...</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="result-column">
                <h4 className="column-title">Prediction Result</h4>
                <div className="prediction-box">
                    {isLoading ? (
                        <div className="prediction-placeholder">
                            <div className="pulse-badge"></div>
                            <div className="pulse-line"></div>
                            <div className="pulse-line short"></div>
                        </div>
                    ) : result ? (
                        <div className="prediction-content">
                            <div
                                className={`prediction-badge ${result.class.toLowerCase()}`}
                            >
                                {result.class === "Dog" ? "🐶" : "🐱"}{" "}
                                {result.class}
                            </div>
                            <div className="confidence-section">
                                <div className="confidence-header">
                                    <span>Confidence Score</span>
                                    <span>
                                        {(result.confidence * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div
                                        className="progress-bar-fill"
                                        style={{
                                            width: `${result.confidence * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <button className="reset-btn" onClick={onReset}>
                                <RefreshCw size={18} /> Classify Another Image
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ClassificationResult;
