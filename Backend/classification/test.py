import argparse
import torch
import torchvision
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import torch.nn as nn
import numpy as np


def predict_images_in_folder(folder_path, model, device, transform):
    dataset = datasets.ImageFolder(root=folder_path, transform=transform)
    data_loader = DataLoader(dataset, batch_size=1, shuffle=False)

    print(f"Total images loaded: {len(dataset)}")  # 데이터셋의 길이를 출력

    results = []
    model.eval()
    with torch.no_grad():
        for images, labels in data_loader:
            print(f"Processing image with label: {labels.item()}")  # Debugging line
            images = images.to(device)
            outputs = model(images)
            predicted_class = outputs.argmax(dim=1).item()
            results.append(predicted_class)
    return results

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='2024 Capstone Project')
    parser.add_argument('--model-path', default='checkpoints/0526200159.pth', help="Model's state_dict")
    parser.add_argument('--folder-path', type=str,
                        default='C:/Users/a/Desktop/Go-Away-DB/Backend/classification/data_test',
                        help='Path to the image file')
    args = parser.parse_args()

    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

    # Load model
    num_classes = 5
    model = torchvision.models.efficientnet_b3(pretrained=False)
    num_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(num_features, num_classes)
    model.load_state_dict(torch.load(args.model_path))
    model.to(device)

    # Define transform
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    # Predict images in the folder
    results = predict_images_in_folder(args.folder_path, model, device, transform)

    # Print predicted classes with line breaks
    print("Predicted classes for all images in folder:")
    for predicted_class in results:
        print(predicted_class)
