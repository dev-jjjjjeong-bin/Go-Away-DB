from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
import os
import numpy as np

# 데이터 증강 설정
datagen = ImageDataGenerator(
    rotation_range=40,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest')

def augment_images(data_folder, save_folder, target_count):
    folders = ["assistedPullUp", "latPull", "legPress", "run", "smithMachine"]
    for folder in folders:
        folder_path = os.path.join(data_folder, folder)
        image_files = [f for f in os.listdir(folder_path) if f.endswith(('.jpg', '.jpeg', '.png', '.bmp'))]
        current_count = len(image_files)
        augmentations_needed = target_count - current_count

        # 확장이 필요한 경우에만 진행
        if augmentations_needed > 0:
            # 각 이미지에 대한 증강 횟수 계산
            augmentations_per_image = np.ceil(augmentations_needed / len(image_files))

            for image_file in image_files:
                img_path = os.path.join(folder_path, image_file)
                img = load_img(img_path)  # 이미지 로드
                x = img_to_array(img)  # 이미지를 NumPy 배열로 변환
                x = x.reshape((1,) + x.shape)  # 데이터 증강을 위해 차원 변형

                # 각 이미지에 대해 지정된 횟수만큼 증강 이미지 생성
                for batch in datagen.flow(x, batch_size=1, save_to_dir=os.path.join(save_folder, folder), save_prefix=folder, save_format='jpeg'):
                    augmentations_per_image -= 1
                    if augmentations_per_image <= 0:
                        break

data_folder = './data'
save_folder = './augment'
target_count = 700

augment_images(data_folder, save_folder, target_count)
