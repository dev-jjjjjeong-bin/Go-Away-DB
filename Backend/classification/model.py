import torch
import torch.nn as nn
from torchvision import models


class BaseModel(nn.Module):
    def __init__(self, num_classes, original_model):
        super(BaseModel, self).__init__()
        # 기존 모델의 특성 추출 부분 가져오기
        self.features = original_model.features

        # 추가적인 합성곱과 풀링 레이어를 적용
        self.enhanced_features = nn.Sequential(
            nn.Conv2d(512, 1024, kernel_size=3, padding=1),  # 차원 증가 및 커널 조정
            nn.ReLU(inplace=True),
            nn.BatchNorm2d(1024),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(1024, 1024, kernel_size=3, padding=1),  # 더 많은 합성곱 레이어 추가
            nn.ReLU(inplace=True),
            nn.BatchNorm2d(1024),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Dropout(0.4)  # 드롭아웃 비율 조정
        )

        # 완전 연결 레이어를 확장
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(1024 * 3 * 3, 2048),  # 차원과 레이어 수 증가
            nn.ReLU(inplace=True),
            nn.Dropout(0.6),
            nn.Linear(2048, 1024),
            nn.ReLU(inplace=True),
            nn.Dropout(0.6),
            nn.Linear(1024, num_classes),
            nn.Sigmoid()
        )

        # 기존 모델의 일부 레이어 동결
        for layer in list(self.features.parameters())[:25]:
            layer.requires_grad = False

        # 추가한 합성곱 레이어는 훈련 가능하도록 설정
        for layer in self.enhanced_features.parameters():
            layer.requires_grad = True

    def forward(self, x):
        x = self.features(x)
        x = self.enhanced_features(x)  # 추가된 합성곱 레이어를 통과
        x = self.classifier(x)
        return x
