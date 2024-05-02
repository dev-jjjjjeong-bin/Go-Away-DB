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


def train(args, data_loader, model):
    """
    TODO: Change the training code as you need. (e.g. different optimizer, different loss function, etc.)
            You can add validation code. -> This will increase the accuracy.
    """
    tmp = 0
    criterion = torch.nn.CrossEntropyLoss()
    optimizer = torch.optim.SGD(model.parameters(), lr=args.learning_rate)
    losses = []
    accuracies = []

    for epoch in range(args.epochs):
        train_losses = []
        train_acc = 0.0
        total = 0
        print(f"[Epoch {epoch + 1} / {args.epochs}]")

        model.train()
        pbar = tqdm(data_loader)
        for i, (x, y) in enumerate(pbar):
            image = x.to(args.device)
            label = y.to(args.device)
            optimizer.zero_grad()

            output = model(image)

            label = label.squeeze()
            loss = criterion(output, label)
            loss.backward()
            optimizer.step()

            train_losses.append(loss.item())
            total += label.size(0)

            train_acc += acc(output, label)

        epoch_train_loss = np.mean(train_losses)
        epoch_train_acc = train_acc / total
        losses.append(epoch_train_loss)
        accuracies.append(epoch_train_acc)

        print(f'Epoch {epoch + 1}')
        print(f'train_loss : {epoch_train_loss}')
        print('train_accuracy : {:.3f}'.format(epoch_train_acc * 100))

        if tmp < epoch_train_acc:
            torch.save(model.state_dict(), f'{args.save_path}/{model_name}.pth')
            print("save_checkpoint")
            tmp = epoch_train_acc

    plot_loss_accuracy(losses, accuracies)


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
    train_loader, _ = make_data_loader(args)
    # custom model
    # model = BaseModel()
    # torchvision model
    model = torchvision.models.efficientnet_b3(torchvision.models.EfficientNet_B3_Weights.IMAGENET1K_V1)
    num_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(num_features, num_classes)
    model.to(device)
    print(model)
    # Training The Model
    train(args, train_loader, model)