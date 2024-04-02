#라이브러리 불러오기
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time
from urllib.request import (urlopen, urlparse, urlunparse, urlretrieve)
from tqdm import tqdm
import time

# 구글 이미지 url
service = ChromeService(executable_path=ChromeDriverManager().install())
base_url = "https://www.google.co.kr/imghp"

# chrome_options = webdriver.ChromeOptions()
# # chrome_options.add_argument('--headless') # 창 없는 모드
# # headless 모드의 호환성을 위해 아래 옵션 추가(가끔 막는 웹이 있음)
# #chrome_options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36")
# chrome_options.add_argument("lang=ko_KR") # 한국어
# chrome_options.add_argument('window-size=1920x1080')
# # chrome_options.add_argument('--no-sandbox')
# # chrome_options.add_argument('--disable-dev-shm-usage')
#
# driver = webdriver.Chrome(service=service, options=chrome_options)
# driver.get(base_url)
# driver.implicitly_wait(3) # element가 로드될 때까지 지정한 시간만큼 대기할 수 있도록 설정
# driver.get_screenshot_as_file('google_screen.png')
# driver.close()


def selenium_scroll_option():
    SCROLL_PAUSE_SEC = 3

    # 스크롤 높이 가져옴
    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        # 끝까지 스크롤 다운
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # 1초 대기
        time.sleep(SCROLL_PAUSE_SEC)

        # 스크롤 다운 후 스크롤 높이 다시 가져옴
        new_height = driver.execute_script("return document.body.scrollHeight")

        if new_height == last_height:
            break
        last_height = new_height

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import urllib.request
import os
import pandas as pd

# 키워드 검색하기

a = input("검색할 키워드를 입력 : ")
image_name = input("저장할 이미지 이름 : ")

driver = webdriver.Chrome(service=service)
driver.get('http://www.google.co.kr/imghp?hl=ko')
browser = driver.find_element(By.NAME, "q")
browser.send_keys(a)
browser.send_keys(Keys.RETURN)

# 스크롤하여 이미지를 많이 확보하는 함수
def selenium_scroll_option():
    SCROLL_PAUSE_TIME = 2

    # 스크롤 높이 가져오기
    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        # 스크롤을 끝까지 내림
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # 페이지 로딩 대기
        time.sleep(SCROLL_PAUSE_TIME)

        # 스크롤 높이 가져오기
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

# 클래스를 찾고 해당 클래스의 src 리스트를 만드는 함수
selenium_scroll_option()

# 이미지 더보기 클릭
input_elements = driver.find_elements(By.XPATH, '//*[@id="islmp"]/div/div/div/div/div[3]/div[2]/input')
if input_elements:
    input_elements[0].click()
    selenium_scroll_option()

# 이미지 src 요소를 리스트업해서 이미지 URL 저장
images = driver.find_elements(By.CSS_SELECTOR, ".rg_i.Q4LuWd")
images_url = []
for i in images:
    if i.get_attribute('src') != None:
        images_url.append(i.get_attribute('src'))
    else:
        images_url.append(i.get_attribute('data-src'))
driver.close()

# 겹치는 이미지 URL 제거
print("전체 다운로드한 이미지 개수: {}\n동일한 이미지를 제거한 이미지 개수: {}".format(len(images_url), len(pd.DataFrame(images_url)[0].unique())))
images_url = pd.DataFrame(images_url)[0].unique()

# 해당하는 파일에 이미지 다운로드
# 이미지를 다운로드하는 코드는 주석 처리했습니다. 필요에 따라 주석을 해제하여 사용하십시오.

if not os.path.exists(f'../images/{image_name}'):
    os.makedirs(f'../images/{image_name}')

original_dir = os.getcwd()
os.chdir(f'../images/{image_name}')

image_len = len(os.listdir(f"../images/{image_name}")) + 1

for t, url in enumerate(tqdm(images_url), 0):
    urllib.request.urlretrieve(url, image_name + '_' + str(t) + '.jpg')

os.chdir(original_dir)
print("Images are all saved")