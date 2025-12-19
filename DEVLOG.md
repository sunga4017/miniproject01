# 개발 일지 (Development Log)

**프로젝트:** 학생 성적 관리 시스템 (Full-stack)
**최종 업데이트:** 2025년 12월 19일 (배포 설정 완료)

## 개발 진행 상황 TODO 리스트

### 1단계: 프로젝트 환경 및 DB 기초 (Foundation) - ✅ 완료
- [x] 프로젝트 폴더 구조 생성
- [x] 가상환경 및 패키지 설치
- [x] 데이터베이스 모델 구현
- [x] DB 마이그레이션 완료

### 2단계: 핵심 로직 구현 (Backend Core) - ✅ 완료
- [x] 성적 산출 로직 (Pandas) 구현
- [x] 엑셀 업로드 처리 기능 구현
- [x] 데이터 더미(Mock Data) 생성 명령어 (`seed_data`)

### 3단계: API 개발 (Server Side) - ✅ 완료
- [x] Serializer 및 ViewSet 구현
- [x] URL 라우팅 설정
- [x] Dashboard 통계 전용 API 구현 (`/api/dashboard/stats/`)
- [x] PDF 다운로드 API 구현 (`/api/students/{id}/download_report/`)

### 4단계: 리포팅 및 부가 기능 (Features) - ✅ 완료
- [x] **PDF 성적표 생성**: ReportLab 라이브러리를 활용한 학생별 성적표 생성 및 다운로드 기능 구현.
- [x] **통계 대시보드**: 학급별 평균 및 분포 데이터를 시각화하는 대시보드 구현.

### 5단계: 프론트엔드 개발 (Web Frontend) - ✅ 완료
- [x] **React 프로젝트 구축**: `frontend` 프로젝트 생성 및 Bootstrap 5 연동.
- [x] **디자인 시스템 적용**: 'Ocean Blue' 테마 및 'Rounded Soft' 컴포넌트 스타일 적용.
- [x] **학생 관리 CRUD**: 학생 등록, 수정, 삭제 기능 및 엑셀 업로드 UI 구현.
- [x] **데이터 시각화**: Recharts를 활용한 통계 차트 구현.
- [x] **클라이언트 라우팅**: React Router를 사용한 대시보드/학생관리/설정 페이지 전환.

### 6단계: 배포 (Deployment) - ✅ 완료
- [x] **Render.com 연동**: `render.yaml` (Infrastructure as Code) 작성.
- [x] **Frontend 배포**: Static Site (Web Type + Static Env)로 설정, API 주소 환경변수 처리.
- [x] **Backend 배포**: Gunicorn WSGI 서버 설정, WhiteNoise 정적 파일 서빙.
- [x] **비용 최적화**: 관리형 DB(PostgreSQL) 비용 절감을 위해 내장 SQLite 사용으로 전환.

## 주요 결정 및 문제 해결 사항
1.  **Frontend-Backend 연동 (Proxy & Env)**:
    - **문제**: 로컬(Proxy)과 배포 환경(Domain)의 API 호출 방식 차이.
    - **해결**: `axiosConfig.js`를 생성하여 `REACT_APP_API_URL` 환경 변수 유무에 따라 자동으로 Base URL을 설정하도록 구현. Render가 제공하는 Host 도메인에 프로토콜(`https://`)과 접미사(`/api`)를 자동 보정하는 로직 추가.
2.  **배포 비용 절감 (SQLite)**:
    - **결정**: Render의 PostgreSQL 서비스 유료화 가능성을 고려하여, 학습/제출용 프로젝트에 적합하도록 파일 기반 DB인 SQLite를 그대로 사용하도록 설정 변경. (단, 서버 재시작 시 데이터 초기화됨을 인지)
3.  **PDF 한글 폰트 처리**:
    - **해결**: ReportLab 사용 시 시스템 폰트(Malgun Gothic)를 동적으로 탐색하여 등록함으로써 한글 깨짐 방지.
