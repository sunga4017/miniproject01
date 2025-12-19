import axios from 'axios';

// 환경 변수 처리 로직
let apiBase = process.env.REACT_APP_API_URL || '';

// 1. 환경 변수가 없으면(로컬 개발) '/api' (Proxy 사용)
if (!apiBase) {
    apiBase = '/api';
} 
// 2. 환경 변수가 있는데 '/api'로 끝나지 않으면 붙여줌 (Render가 도메인만 줄 경우 대비)
else if (!apiBase.endsWith('/api') && !apiBase.endsWith('/api/')) {
    apiBase = `${apiBase}/api`;
}

const api = axios.create({
    baseURL: apiBase,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;