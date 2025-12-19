import axios from 'axios';

// 환경 변수 처리 로직
let apiBase = process.env.REACT_APP_API_URL || '';

if (!apiBase) {
    // 로컬 개발 환경 (Proxy 사용)
    apiBase = '/api';
} else {
    // 1. 프로토콜이 없는 도메인 주소인 경우 https:// 추가
    if (!apiBase.startsWith('http') && apiBase.includes('.')) {
        apiBase = `https://${apiBase}`;
    }
    
    // 2. '/api' 접미사 처리
    if (!apiBase.endsWith('/api') && !apiBase.endsWith('/api/')) {
        apiBase = apiBase.endsWith('/') ? `${apiBase}api` : `${apiBase}/api`;
    }
}

const api = axios.create({
    baseURL: apiBase,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
