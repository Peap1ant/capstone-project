import axios from "axios";
import { getToken, setToken} from '@/src/(api)/token'

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await getToken('accessToken')

        if (token) {
            config.headers = config.headers ?? {};
            (config.headers as any).token = token;
        }

        return config;
    },
    
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const { response, config } = error;

        if (!response) return Promise.reject(error);

        if (
            response.status === 401 && !config._retry
        ) {
            config._retry = true;

            const refreshToken = await getToken('refreshToken');
            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const { data } = await api.post('/jwt/exchange', {
                    token: refreshToken,
                });

                const newAccess = data.accessToken
                await setToken('accessToken', newAccess);

                config.headers = config.headers ?? {};
                (config.headers as any).token = newAccess;

                return api(config);
            } catch (refreshErr) {
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(error);
    },
);

export default api;