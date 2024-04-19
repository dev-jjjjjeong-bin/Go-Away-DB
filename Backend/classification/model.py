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
            nn.Conv2d(512, 512, kernel_size=3, padding=1),  # 예시 차원, 모델에 따라 조정 필요
            nn.ReLU(inplace=True),
            nn.BatchNorm2d(512),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Dropout(0.3)  # 약간의 드롭아웃 추가
        )

        # 완전 연결 레이어를 확장
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(512 * 7 * 7, 1024),  # 차원은 적절히 조정 필요
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(1024, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(512, num_classes),
            nn.Sigmoid()  # 이진 분류의 경우 Sigmoid, 다중 분류의 경우 Softmax를 사용합니다.
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