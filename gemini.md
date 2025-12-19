# Gemini 개발 인계사항 (Handover Notes)

## 1. 프로젝트 개요
학생 성적 관리 시스템. Django(Backend)와 React(Frontend)를 기반으로 구축되었으며, 학생 정보, 과목, 시험, 성적 데이터를 관리하고 통계 및 리포팅 기능을 제공한다.

---

## 2. 개발 환경
- **OS:** win32
- **Backend:** Python 3.14 (venv), Django 4.2.27
- **Frontend:** Node.js v24, React 19, Bootstrap 5
- **주요 라이브러리:** Pandas(통계), ReportLab(PDF), Recharts(차트), Axios(통신)

---

## 3. 프로젝트 구조
```
miniproject01/
├── backend/                  # Django 프로젝트
│   ├── api/                  # 핵심 로직 및 API
│   │   ├── services.py       # 성적 통계 엔진 (Pandas)
│   │   ├── utils.py          # 엑셀/PDF 처리 유틸리티
│   │   └── views.py          # API 엔드포인트
│   └── config/               # 프로젝트 설정
└── frontend/                 # React 프로젝트
    ├── src/
    │   ├── components/       # UI 컴포넌트 (Dashboard, StudentList 등)
    │   └── App.js            # 라우팅 설정
    └── package.json          # Proxy 설정 ("proxy": "http://localhost:8000")
```

---

## 4. 실행 방법
### Backend 실행
```powershell
cd backend
..\.venv\Scripts\python.exe manage.py runserver
```
### Frontend 실행
```powershell
cd frontend
npm start
```

---

## 5. 구현 완료된 주요 기능
1. **대시보드**: 과목별 평균 및 학년별 분포 차트 시각화.
2. **학생 관리**: 신규 등록, 정보 수정, 삭제 기능.
3. **성적 관리**: 엑셀 업로드 기능을 통한 대량 성적 데이터 처리.
4. **리포팅**: 학생별 상세 성적 조회 및 PDF 파일 다운로드.

---

## 6. 향후 확장 TODO (Next Steps)
- **인증 시스템 고도화**: JWT 또는 Session 기반의 정식 로그인/로그아웃 구현.
- **교사용 관리 도구**: 시험 생성 및 과목 관리 UI 추가.
- **성적 예측 모델**: 기존 데이터를 기반으로 다음 시험 성적을 예측하는 간단한 AI 모듈 연동.
- **배포 자동화**: Docker를 활용한 컨테이너화 및 클라우드 배포 환경 구축.
---