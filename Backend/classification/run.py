import argparse
import os
import torch
import numpy as np
from torch.utils.data import Dataset, DataLoader
from torchvision import datasets, transforms
import torchvision
import torch.nn as nn
from torchvision.models import resnet18, ResNet18_Weights
from model import BaseModel
from tqdm import tqdm
from PIL import Image
from sklearn.metrics import confusion_matrix, classification_report


class ImageDataset(Dataset):

    def __init__(self, root_dir, transform=None, fmt=':04d', extension='.jpg'):
        self.root_dir = root_dir
        self.fmtstr = '{' + fmt + '}' + extension
        self.transform = transform

    def __len__(self):
        return len(os.listdir(self.root_dir))

    def __getitem__(self, idx):
        if torch.is_tensor(idx):
            idx = idx.tolist()

        img_name = self.fmtstr.format(idx)
        img_path = os.path.join(self.root_dir, img_name)
        img = Image.open(img_path).convert('RGB')
        data = self.transform(img)
        return data


def inference(args, data_loader, model):
    """ model inference """

    model.eval()
    preds = []

    with torch.no_grad():
        pbar = tqdm(data_loader)
        for i, x in enumerate(pbar):
            image = x.to(args.device)

            y_hat = model(image)

            y_hat.argmax()

            _, predicted = torch.max(y_hat, 1)
            preds.extend(map(lambda t: t.item(), predicted))

    return preds


def acc():
    pred = []
    true = []
    for i in range(10):
        for _ in range(10):
            true.append(i)
    with open('result.txt', 'r') as file:
        for i in file:
            pred.append(int(i))
    accuracy = []
    if len(true) == len(pred):
        for i in range(len(true)):
            if true[i] == pred[i]:
                accuracy.append(1)

    return len(accuracy) / len(pred), pred, true


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='2023 DL Term Project')
    parser.add_argument('--load-model', default='checkpoints/model.pth', help="Model's state_dict")
    parser.add_argument('--batch-size', default=16, help='test loader batch size')
    parser.add_argument('--dataset', default='test_images/', help='image dataset directory')

    args = parser.parse_args()

    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    args.device = device
    num_classes = 10

    # instantiate model
    # model = BaseModel()
    # model.load_state_dict(torch.load(args.load_model))
    # model.to(device)

    # torchvision model
    model = torchvision.models.efficientnet_b3(torchvision.models.EfficientNet_B3_Weights)
    num_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(num_features, num_classes)
    model.load_state_dict(torch.load(args.load_model))
    model.to(device)

    # load dataset in test image folder
    # you may need to edit transform
    test_data = ImageDataset(args.dataset,
                             transform=transforms.Compose([transforms.Resize((224, 224)), transforms.ToTensor()]))
    test_loader = torch.utils.data.DataLoader(test_data, batch_size=args.batch_size)

    # write model inference
    preds = inference(args, test_loader, model)

    with open('result.txt', 'w') as f:
        f.writelines('\n'.join(map(str, preds)))

    accuracy, pred, true = acc()

    print(confusion_matrix(true, pred))
    print(classification_report(true, pred))
    print(accuracy)
