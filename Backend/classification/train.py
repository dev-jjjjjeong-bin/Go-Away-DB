import argparse
import os
import numpy as np
from tqdm import tqdm
from utils._utils import make_data_loader
from model import BaseModel
import torch
import torch.nn as nn
import torchvision
from datetime import datetime
import matplotlib.pyplot as plt
import torch.nn.functional as F


now = datetime.now()
model_name = now.strftime("%m%d%H%M%S")


def plot_loss_accuracy(train_losses, train_accuracies, save_path='plots/'):
    os.makedirs(save_path, exist_ok=True)
    # Plot and save the loss and accuracy curve
    plt.figure(figsize=(10, 5))
    plt.plot(train_losses, label='Training Loss', color='blue')
    plt.plot(train_accuracies, label='Training Accuracy', color='green')
    plt.xlabel('Epoch')
    plt.ylabel('Value')
    plt.title('Training Loss and Accuracy Curve')
    plt.legend()
    plt.savefig(os.path.join(save_path, f'{model_name}_train.png'))
    plt.show()


def acc(pred, label):
    pred = pred.argmax(dim=-1)
    return torch.sum(pred == label).item()


def validate(args, data_loader, model):
    criterion = nn.CrossEntropyLoss()
    model.eval()
    val_losses = []
    val_correct = 0
    val_total = 0

    with torch.no_grad():
        for images, labels in data_loader:
            images, labels = images.to(args.device), labels.to(args.device)

            outputs = model(images)
            loss = criterion(outputs, labels)
            val_losses.append(loss.item())

            _, predicted = torch.max(outputs, 1)
            val_total += labels.size(0)
            val_correct += (predicted == labels).sum().item()

    val_loss = np.mean(val_losses)
    val_accuracy = val_correct / val_total
    return val_loss, val_accuracy


def train(args, train_loader, validation_loader, model):
    tmp = 0
    criterion = torch.nn.CrossEntropyLoss()
    optimizer = torch.optim.SGD(model.parameters(), lr=args.learning_rate)
    train_losses = []
    val_losses = []
    train_accuracies = []
    val_accuracies = []

    for epoch in range(args.epochs):
        train_loss = 0.0
        train_correct = 0
        train_total = 0

        model.train()
        for images, labels in train_loader:
            images, labels = images.to(args.device), labels.to(args.device)
            optimizer.zero_grad()

            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            train_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            train_total += labels.size(0)
            train_correct += (predicted == labels).sum().item()

        train_losses.append(train_loss / len(train_loader))
        train_accuracy = train_correct / train_total
        train_accuracies.append(train_accuracy)

        val_loss, val_accuracy = validate(args, validation_loader, model)
        val_losses.append(val_loss)
        val_accuracies.append(val_accuracy)

        print(f'Epoch [{epoch + 1}/{args.epochs}], Train Loss: {train_losses[-1]:.4f}, Train Accuracy: {train_accuracy:.4f}, Validation Loss: {val_loss:.4f}, Validation Accuracy: {val_accuracy:.4f}')

        if tmp < val_accuracy:
            torch.save(model.state_dict(), f'{args.save_path}/{model_name}.pth')
            print("save_checkpoint")
            tmp = val_accuracy

    plot_loss_accuracy(train_losses, val_losses, train_accuracies, val_accuracies)




if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='2023 DL Term Project')
    parser.add_argument('--save-path', default='checkpoints/', help="Model's state_dict")
    parser.add_argument('--data', default='data/', type=str, help='data folder')
    args = parser.parse_args()
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    args.device = device
    num_classes = 5

    # hyperparameters
    args.epochs = 30
    args.learning_rate = 0.01
    args.batch_size = 30
    # check settings
    print("==============================")
    print("Save path:", args.save_path)
    print('Using Device:', device)
    print('Number of usable GPUs:', torch.cuda.device_count())
    # Print Hyperparameter
    print("Batch_size:", args.batch_size)
    print("learning_rate:", args.learning_rate)
    print("Epochs:", args.epochs)
    print("==============================")
    # Make Data loader and Model
    train_loader, validation_loader = make_data_loader(args)
    # custom model
    # model = BaseModel()
    # torchvision model
    model = torchvision.models.efficientnet_b3(torchvision.models.EfficientNet_B3_Weights.IMAGENET1K_V1)
    num_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(num_features, num_classes)
    model.to(device)
    print(model)
    # Training The Model
    train(args, train_loader, validation_loader, model)