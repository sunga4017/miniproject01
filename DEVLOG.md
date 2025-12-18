# 개발 일지 (Development Log)

**프로젝트:** 학생 성적 관리 시스템 백엔드 API
**기간:** 2025년 12월 18일

## 개발 진행 상황 TODO 리스트

### 1단계: 프로젝트 환경 및 DB 기초 (Foundation) - ✅ 완료
- [x] **프로젝트 폴더 구조 생성**: `backend`, `api` 등 기본 디렉토리 구조 설정.
- [x] **가상환경 및 패키지 설치**: `requirements.txt` 생성 및 `pip` 설치 안내 완료.
- [x] **데이터베이스 모델(Models.py) 코드 생성**: `User`, `Student`, `Subject`, `Exam`, `Score` 모델 구현 완료.
- [x] **DB 마이그레이션 및 관리자 계정 생성**: `makemigrations`, `migrate` 과정에서 발생한 `InconsistentMigrationHistory` 문제 해결 및 `createsuperuser` 완료.

### 2단계: 핵심 로직 구현 (Backend Core) - ✅ 완료
- [x] **성적 산출 로직 (Pandas) 구현**: `services.py`에 Pandas를 활용한 과목별 석차, 백분위, 등급 계산 함수 `calculate_student_stats` 구현 완료.
- [x] **엑셀 업로드 처리 기능 구현**: `utils.py`에 엑셀 파일 파싱 함수 구현, `views.py`에 `ScoreUploadView`를 통해 DB 저장 로직까지 완료.
- [x] **데이터 더미(Mock Data) 생성**: `manage.py`의 커스텀 명령어 `seed_data`를 통해 테스트용 데이터 생성 기능 구현 완료.

### 3단계: API 개발 (Server Side) - ✅ 완료
- [x] **Serializer 코드 작성**: 각 모델에 대한 `ModelSerializer` 구현 완료.
- [x] **API View (Views.py) 작성**: `ModelViewSet`을 사용하여 CRUD API 구현 및 `StudentViewSet`에 상세 성적표 조회를 위한 커스텀 액션(`score_report`) 추가 완료.
- [x] **URL 라우팅 설정**: `DefaultRouter`를 사용하여 `ViewSet` API 엔드포인트 등록 완료.
- [x] **API 테스트 (Postman/Curl)**: `ScoreUploadView` API 테스트 성공 확인.

### 4단계: 리포팅 및 부가 기능 (Features) - 🔲 미완료
- [ ] **PDF 성적표 생성 코드 요청**
- [ ] **통계 대시보드 API**

### 5단계: 프론트엔드 연동 가이드 (Web/App) - 🔲 미완료
- [ ] **React용 API 연동 코드**
- [ ] **Flutter용 데이터 모델 클래스**

## 주요 결정 및 문제 해결 사항
1.  **Django 프로젝트 생성 문제**:
    - **문제**: `django-admin` 명령어가 셸에서 인식되지 않는 환경 불일치 발생.
    - **해결**: 가상 환경 내의 `python.exe` 전체 경로를 명시적으로 사용하여 `python -m django <command>` 형태로 명령을 실행하여 해결.
2.  **마이그레이션 충돌**:
    - **문제**: 커스텀 User 모델을 `settings.py`에 등록하기 전에 `migrate`를 실행하여 `InconsistentMigrationHistory` 오류 발생.
    - **해결**: `db.sqlite3` 데이터베이스 파일과 `api/migrations` 디렉토리를 삭제한 후, `makemigrations`와 `migrate`를 다시 실행하여 마이그레이션 기록을 초기화.
3.  **성적 통계 로직 구체화**:
    - **요청**: 초기 `services.py` 로직을 DB와 직접 연동하여 과목별 석차, 등급을 계산하는 상세 로직으로 수정 요청.
    - **해결**: `calculate_student_stats` 함수를 재작성하고, Pandas를 활용해 시험별 전체 응시자 데이터를 기준으로 통계를 계산하도록 구현. 이 로직을 `StudentViewSet`의 `score_report` 액션에 연결하여 API 복잡도를 낮추고 비즈니스 로직을 서비스 계층으로 분리.
