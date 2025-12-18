# 학생 성적 관리 시스템 백엔드 (miniproject01)

## 1. 프로젝트 개요

Django와 Django REST Framework(DRF)를 기반으로 구축된 학생 성적 관리 시스템의 백엔드 API 서버입니다. 학생, 과목, 시험, 성적에 대한 CRUD 기능을 제공하며, 엑셀을 통한 일괄 성적 업로드 및 상세 성적 리포팅 기능을 포함합니다.

## 2. 기술 스택

- **Backend:** Python, Django, Django REST Framework
- **Data Processing:** Pandas, NumPy
- **Database:** SQLite (기본), Psycopg2 (PostgreSQL 지원)
- **PDF Generation:** ReportLab (예정)

## 3. 개발 환경 설정

### 3.1. 요구사항
- Python 3.10 이상

### 3.2. 설정 순서

1.  **프로젝트 클론**
    ```bash
    git clone <repository_url>
    cd miniproject01
    ```

2.  **가상 환경 생성 및 활성화** (Windows PowerShell 기준)
    ```powershell
    python -m venv .venv
    .venv\Scripts\Activate.ps1
    ```

3.  **필수 패키지 설치**
    `backend` 디렉토리의 `requirements.txt` 파일을 사용하여 설치합니다.
    ```powershell
    cd backend
    pip install -r requirements.txt
    ```

4.  **데이터베이스 마이그레이션**
    모델 변경사항을 데이터베이스에 적용합니다.
    ```powershell
    python manage.py migrate
    ```

5.  **관리자 계정 생성**
    Django 관리자 페이지에 접근하기 위한 계정을 생성합니다.
    ```powershell
    python manage.py createsuperuser
    ```

## 4. 프로젝트 실행 및 사용법

### 4.1. 개발 서버 실행
`backend` 디렉토리에서 다음 명령어를 실행합니다.
```powershell
python manage.py runserver
```
서버는 기본적으로 `http://127.0.0.1:8000/`에서 실행됩니다.

### 4.2. 테스트용 더미 데이터 생성
50명의 학생과 성적 데이터를 자동으로 생성하여 API 테스트를 용이하게 할 수 있습니다.
```powershell
python manage.py seed_data
```
**주의:** 이 명령어는 기존 데이터를 삭제하고 새로 생성하므로, 테스트 환경에서만 사용하세요.

### 4.3. 주요 API 엔드포인트
- **`GET /api/students/`**: 전체 학생 목록 조회
- **`GET /api/students/{id}/`**: 특정 학생 상세 정보 조회
- **`GET /api/students/{id}/score_report/`**: 특정 학생의 상세 성적표(과목별 석차, 등급 포함) 조회
- **`POST /api/upload-scores/`**: 성적 엑셀 파일 일괄 업로드

모든 API 엔드포인트는 DRF 브라우저블 API(`http://127.0.0.1:8000/api/`)를 통해 확인하고 테스트할 수 있습니다.
