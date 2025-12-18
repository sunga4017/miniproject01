# Gemini 개발 인계사항 (Handover Notes)

## 1. 프로젝트 개요
학생 성적 관리 시스템의 백엔드 API 서버. Django와 Django REST Framework를 기반으로 구축되었으며, 학생 정보, 과목, 시험, 성적 데이터를 관리하고 통계 및 리포팅 기능을 제공하는 것을 목표로 한다.

---

## 2. 개발 환경
- **OS:** win32
- **프로젝트 루트:** `C:\Users\cindy\miniproject01`
- **가상 환경 경로:** `C:\Users\cindy\miniproject01\.venv`
- **Python 실행 파일:** `C:\Users\cindy\miniproject01\.venv\Scripts\python.exe`
  - **중요:** 모든 `manage.py` 명령어 실행 시 이 전체 경로를 사용해야 환경 문제를 피할 수 있다.
    ```powershell
    C:\Users\cindy\miniproject01\.venv\Scripts\python.exe manage.py <command>
    ```

---

## 3. 프로젝트 구조 및 주요 파일
```
miniproject01/
└── backend/
    ├── api/
    │   ├── management/commands/seed_data.py  # 테스트용 더미 데이터 생성 명령어
    │   ├── migrations/                       # 데이터베이스 스키마
    │   ├── models.py                         # 핵심 데이터 모델 (User, Student, Score 등)
    │   ├── serializers.py                    # 모델-JSON 변환 로직
    │   ├── services.py                       # 핵심 비즈니스 로직 (성적 통계 계산)
    │   ├── urls.py                           # API 앱 내부 URL 라우팅
    │   ├── utils.py                          # 유틸리티 함수 (엑셀 읽기)
    │   └── views.py                          # API 엔드포인트 로직 (ViewSets)
    ├── config/
    │   ├── settings.py                       # 메인 프로젝트 설정
    │   └── urls.py                           # 메인 프로젝트 URL 라우팅
    ├── manage.py                             # Django 관리 스크립트
    └── requirements.txt                      # Python 패키지 의존성
```

### 주요 파일 상세 설명
- **`api/models.py`**: `AbstractUser`를 상속받은 커스텀 `User` 모델이 핵심. `Student`는 `User`와 1:1 관계. `Score`는 `Student`와 `Exam`을 연결.
- **`api/services.py`**: `calculate_student_stats(student_id)` 함수가 핵심 로직. DB에서 특정 학생과 관련된 모든 시험의 전체 응시자 성적을 가져와 Pandas DataFrame으로 변환 후, 과목별 석차와 백분위 기반 등급을 계산한다.
- **`api/views.py`**:
  - `ModelViewSet` 기반으로 대부분의 CRUD API 구현 (`UserViewSet`, `StudentViewSet` 등).
  - `StudentViewSet` 내에 `@action`으로 `score_report` 커스텀 API가 구현되어 있으며, `services.py`의 함수를 호출하여 상세 성적표 데이터를 반환.
  - `ScoreUploadView`는 `APIView` 기반의 별도 뷰로, 엑셀 파일 업로드를 처리.
- **`api/serializers.py`**:
  - 대부분 `ModelSerializer`를 사용.
  - 관계형 모델(ForeignKey, OneToOne) 표현을 위해 중첩 Serializer(read_only)와 `PrimaryKeyRelatedField`(write_only)를 함께 사용하는 패턴 적용.
- **`api/management/commands/seed_data.py`**:
  - `python manage.py seed_data` 명령어로 50명의 학생과 관련 시험, 성적 데이터를 생성.
  - **주의:** 실행 시 기존 데이터를 모두 삭제하므로 테스트 환경에서만 사용.

---

## 4. 주요 명령어
- **더미 데이터 생성:** `python manage.py seed_data`
- **개발 서버 실행:** `python manage.py runserver`
- **마이그레이션:** `python manage.py makemigrations api` -> `python manage.py migrate`

---

## 5. 다음 개발 계획 (미완료 TODO)
아래 프롬프트를 사용하여 다음 단계 개발을 요청할 수 있다.

### 4단계: 리포팅 및 부가 기능
- **PDF 성적표 생성 코드 요청**
  - *Prompt:* "ReportLab 라이브러리를 사용해서 특정 학생의 성적표를 PDF로 생성하고 다운로드하는 뷰를 `StudentViewSet`의 커스텀 액션으로 추가해줘. `services.py`에서 계산된 통계 데이터를 사용해야 해."

- **통계 대시보드 API**
  - *Prompt:* "학급별 평균 점수와 과목별 등급 분포(1등급 N명, 2등급 N명 등) 데이터를 리턴하는 통계용 API 뷰셋(`StatisticsViewSet`)을 새로 만들어줘."

### 5단계: 프론트엔드 연동 가이드
- **React용 API 연동 코드**
  - *Prompt:* "React에서 Axios를 사용해 위에서 만든 '학생 목록 조회 API'(`/api/students/`)와 '특정 학생 성적표 조회 API'(`/api/students/{id}/score_report/`)를 호출하는 예제 컴포넌트 코드를 보여줘."

- **Flutter용 데이터 모델 클래스**
  - *Prompt:* "Flutter(Dart) 앱에서 사용할 수 있도록, `api/serializers.py`의 `StudentSerializer`와 `ScoreSerializer`의 응답 결과에 매칭되는 Dart 모델 클래스 코드를 작성해줘."
