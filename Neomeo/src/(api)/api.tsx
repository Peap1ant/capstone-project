import axios from "axios";
import { getToken, setToken } from "@/src/(api)/token";

export const api = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// =========================
// REQUEST INTERCEPTOR
// (표준 'Authorization' 헤더를 사용하도록 수정)
// =========================
api.interceptors.request.use(
    async (config) => {
        // ❗ refresh 요청은 accessToken을 붙이지 않음
        if (config.skipAuth) return config;

        const token = await getToken("accessToken");
        console.log("🔵 [REQUEST] accessToken:", token);

        if (token) {
            config.headers = config.headers ?? {};
            // ❗ 'token' 커스텀 헤더 대신 표준 'Authorization' 헤더 사용
            config.headers.Authorization = `Bearer ${token}`; 
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// =========================
// RESPONSE INTERCEPTOR
// (★★★★★ 400 에러 해결을 위해 핵심 수정)
// =========================
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const { response, config } = error;

        if (!response) return Promise.reject(error);

        // 401 에러(Access Token 만료)가 발생했고, 재시도한 적이 없을 때
        if (response.status === 401 && !config._retry) {
            config._retry = true; // 재시도 플래그 설정

            const refreshToken = await getToken("refreshToken");
            console.log("🟡 [401 DETECTED] refreshToken:", refreshToken);

            if (!refreshToken) {
                console.error("❌ refresh token missing. Redirecting to login.");
                // ❗ 실제 서비스에서는 여기서 로그인 페이지로 리디렉션
                // window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // [수정 1] 갱신 요청 엔드포인트를 '/jwt/refresh'로 변경
                console.log("🟠 Sending refresh request to /jwt/refresh ...");

                const { data } = await api.post(
                    "/jwt/refresh", // 👈 '/jwt/exchange' 아님
                    
                    // [수정 2] 'RefreshRequestDTO' 스펙에 맞게 JSON Body로 전송
                    { refreshToken: refreshToken },
                    
                    {
                        skipAuth: true, // 👈 'REQUEST' 인터셉터가 Access Token을 붙이지 않도록
                    }
                );

                // 서버가 'JWTResponseDTO'에 { accessToken: "..." }을 반환한다고 가정
                const newAccess = data.accessToken; 
                console.log("🟢 [REFRESH SUCCESS] new access token:", newAccess);

                // 새 Access Token 저장
                await setToken("accessToken", newAccess);

                // [수정 3] 실패했던 원래 요청(config)의 헤더를 새 토큰으로 교체
                config.headers = config.headers ?? {};
                config.headers.Authorization = `Bearer ${newAccess}`; // 👈 표준 헤더

                // 원래 요청을 재시도
                return api(config); 

            } catch (refreshErr) {
                console.error("❌ Refresh failed", refreshErr);
                // ❗ 리프레시마저 실패하면 로그인 페이지로 리디렉션
                // window.location.href = '/login';
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(error);
    }
);

export default api;