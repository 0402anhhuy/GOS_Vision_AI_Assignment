import os
import io
import torch
import torch.nn.functional as F
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from torchvision import transforms
from model_architecture import CustomCNN

app = FastAPI(title="Cat or Dog Classifier API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
MODEL_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(MODEL_DIR, "dog_cat_model_classification.pth")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = CustomCNN()
CLASS_NAMES = ["Cat", "Dog"]

try:
    if os.path.exists(MODEL_PATH):
        checkpoint = torch.load(MODEL_PATH, map_location=device)
        
        if 'model_state_dict' in checkpoint:
            model.load_state_dict(checkpoint['model_state_dict'])
        else:
            model.load_state_dict(checkpoint)

        if 'class_names' in checkpoint:
            CLASS_NAMES = checkpoint['class_names']
            
        model.to(device)
        model.eval()
        print("Model loaded successfully.")
        print(f"Classes: {CLASS_NAMES}")
    else:
        print(f"Warning: Model not found at {MODEL_PATH}. Please make sure you place the .pth file in the Model folder.")
        model = None
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Transform image
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded. Please check the backend console or ensure model.pth is in the Model folder.")
        
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Preprocess image
        input_tensor = transform(image).unsqueeze(0).to(device)
        
        # Inference
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = F.softmax(outputs, dim=1)
            confidence, predicted_idx = torch.max(probabilities, 1)
            
            predicted_class = CLASS_NAMES[predicted_idx.item()]
            confidence_score = confidence.item()
            
        return {
            "class": predicted_class,
            "confidence": confidence_score
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
