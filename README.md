# 학생 성적 관리 시스템 (Student Score Management System)

Django(Backend)와 React(Frontend)로 구축된 풀스택 학생 성적 관리 프로젝트입니다.
학생 정보 관리, 엑셀 성적 업로드, 통계 대시보드, PDF 성적표 생성 기능을 제공합니다.

## 1. 주요 기능
*   **대시보드**: 과목별 평균 점수 및 학년별 학생 분포 시각화 (Recharts)
*   **학생 관리**: 학생 등록, 수정, 삭제 (CRUD)
*   **성적 관리**: 엑셀 파일을 통한 대량 성적 데이터 업로드
*   **리포팅**: 학생별 상세 성적표 조회 및 PDF 다운로드

## 2. 기술 스택
*   **Backend**: Python 3.9+, Django, Django REST Framework, Pandas, ReportLab
*   **Frontend**: Node.js, React, Bootstrap 5, Axios

## 3. 실행 방법 (How to Run)

이 프로젝트는 로컬 환경에서 실행하도록 구성되어 있습니다.

### 사전 요구사항
*   Python 3.8 이상 설치
*   Node.js 14 이상 설치
*   Git 설치

### 1단계: 프로젝트 클론
```bash
git clone https://github.com/sunga4017/miniproject01.git
cd miniproject01
```

### 2단계: 백엔드 실행
새 터미널을 열고 진행합니다.
```bash
# 가상환경 생성 (선택사항)
python -m venv .venv
# 윈도우:
.venv\Scripts\activate
# 맥/리눅스:
source .venv/bin/activate

# 패키지 설치
pip install -r backend/requirements.txt

# DB 마이그레이션 및 실행
cd backend
python manage.py migrate
python manage.py runserver
```
*서버가 `http://localhost:8000`에서 실행됩니다.*

### 3단계: 프론트엔드 실행
새 터미널을 열고 진행합니다.
```bash
cd frontend
npm install
npm start
```
*브라우저가 자동으로 열리며 `http://localhost:3000`으로 접속됩니다.*

## 4. 테스트 방법
1.  **초기 데이터 생성**: 백엔드 터미널에서 `python manage.py seed_data`를 실행하면 더미 데이터 50명이 생성됩니다.
2.  **엑셀 업로드**: 프로젝트 루트의 `backend/scores.xlsx` 파일을 '학생 관리 > 엑셀 업로드' 기능을 통해 업로드해보세요.
3.  **PDF 다운로드**: 학생 목록에서 성적표 버튼을 누르고 PDF 다운로드를 테스트해보세요.