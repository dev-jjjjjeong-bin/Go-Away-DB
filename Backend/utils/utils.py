from torchvision import datasets, transforms
import torch

# to split test_data always same
torch.manual_seed(1004)

import torch.nn as nn
from torch.utils.data import random_split
from torch.utils.data import DataLoader, Subset
from torchvision import datasets, transforms

# you can change input size(don't forget to change linear layer!)
train_transform = transforms.Compose([
    transforms.Resize((300, 300)),
    transforms.RandomResizedCrop((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomVerticalFlip(),
    transforms.RandomRotation(60),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# 검증 데이터에 대한 변환
validation_transform = transforms.Compose([
    transforms.Resize((300, 300)),  # 이미지 크기 조정
    transforms.CenterCrop((224, 224)),  # 중앙 크롭
    transforms.ToTensor(),  # 이미지를 Tensor로 변환
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # 이미지를 정규화
])

test_transform = transforms.Compose([
    transforms.Resize((300, 300)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])


def make_data_loader(args):
    # Get Dataset
    dataset = datasets.ImageFolder(args.data)

    # split dataset to train/validation/test
    train_data_percentage = 0.8
    validation_data_percentage = 0.1
    train_size = int(train_data_percentage * len(dataset))
    validation_size = int(validation_data_percentage * len(dataset))
    test_size = len(dataset) - train_size - validation_size

    train_dataset, validation_dataset, test_dataset = random_split(dataset, [train_size, validation_size, test_size])

    train_dataset.dataset.transform = train_transform
    validation_dataset.dataset.transform = validation_transform
    test_dataset.dataset.transform = test_transform

    # Get Dataloader
    train_loader = DataLoader(train_dataset, batch_size=args.batch_size, shuffle=True)
    validation_loader = DataLoader(validation_dataset, batch_size=args.batch_size, shuffle=False)
    test_loader = DataLoader(test_dataset, batch_size=args.batch_size, shuffle=False)

    return train_loader, validation_loader