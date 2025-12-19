# 개발 일지 (Development Log)

**프로젝트:** 학생 성적 관리 시스템 (Full-stack)
**최종 업데이트:** 2025년 12월 19일

## 개발 진행 상황

### 완료된 기능 (Implemented Features)
- [x] **Backend**: Django REST Framework API 구축, Pandas 성적 처리, ReportLab PDF 생성.
- [x] **Frontend**: React 대시보드, 학생 관리 CRUD, 성적표 조회 UI.
- [x] **Database**: SQLite (로컬 파일 기반).
- [x] **Integration**: Axios 기반 프론트-백엔드 연동 (Proxy 설정).

### 배포 관련 결정 사항 (Decision Log)
- **초기 계획**: Render.com을 통한 클라우드 배포 및 PostgreSQL 사용.
- **변경 사항**: 비용 및 관리 효율성을 고려하여 **로컬 실행(Localhost) 방식으로 제출**하기로 최종 결정. 이에 따라 Render 설정 파일(`render.yaml`)은 제거하고 `README.md`에 로컬 실행 가이드를 상세히 작성함.

## 실행 가이드
상세 실행 방법은 `README.md`를 참고해주세요.
1. Backend: `python manage.py runserver`
2. Frontend: `npm start`