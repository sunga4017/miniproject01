# 개발 일지 (Development Log)

**프로젝트:** 학생 성적 관리 시스템 (Full-stack)
**최종 업데이트:** 2025년 12월 19일

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

## 주요 결정 및 문제 해결 사항
1.  **Frontend-Backend 연동 (Proxy)**:
    - **문제**: 개발 단계에서 CORS(Cross-Origin Resource Sharing) 문제 발생 가능성.
    - **해결**: `package.json`에 `proxy` 설정을 추가하여 `/api/` 요청을 Django 서버로 자동 전달하도록 구성.
2.  **디자인 시스템 통일**:
    - **요청**: `UI-마크다운-2025-12-18.md`에 명시된 Ocean Blue 디자인 시스템 준수.
    - **해결**: CSS 변수를 활용해 컬러 팔레트를 관리하고, Sidebar 레이아웃 및 Pretendard/Inter 폰트를 전역 적용하여 현대적인 UI 구현.
3.  **PDF 한글 폰트 처리**:
    - **문제**: ReportLab의 기본 폰트에서 한글 깨짐 현상.
    - **해결**: 시스템 폰트(Malgun Gothic) 경로를 탐색하여 자동으로 등록하는 로직을 `utils.py`에 추가하여 해결.