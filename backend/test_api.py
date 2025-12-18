import pandas as pd
import requests
import os

# 1. 테스트용 엑셀 파일 생성 (scores.xlsx)
data = {
    'student_username': ['student_001', 'student_002', 'student_new'],
    'subject_name': ['국어', '영어', '수학'],
    'exam_name': ['중간고사', '기말고사', '중간고사'],
    'exam_date': ['2024-05-15', '2024-11-20', '2024-05-10'],
    'score': [85, 92, 78]
}

df = pd.DataFrame(data)
excel_filename = 'scores.xlsx'
df.to_excel(excel_filename, index=False)
print(f"✅ 테스트용 엑셀 파일 생성 완료: {excel_filename}")

# 2. API로 엑셀 파일 업로드
url = 'http://127.0.0.1:8000/api/upload-scores/'
files = {'file': open(excel_filename, 'rb')}

try:
    print(f"📡 서버({url})로 파일 전송 중...")
    response = requests.post(url, files=files)
    
    # 결과 출력
    if response.status_code == 200 or response.status_code == 201:
        print("\n🎉 성공! 서버 응답:")
        print(response.json())
    else:
        print(f"\n❌ 실패 (상태 코드: {response.status_code})")
        print(response.text)
except Exception as e:
    print(f"\n❌ 연결 오류: 서버가 켜져 있는지 확인하세요. ({e})")

# 3. (선택) 파일 정리
files['file'].close()
# os.remove(excel_filename) # 파일 삭제를 원하면 주석 해제