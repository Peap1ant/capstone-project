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
        const accessToken = await getToken('accessToken');

        if (accessToken) {
            config.headers['token'] = accessToken;
        }

        return config;
    },
    
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const { response, config } = error;

        if (response?.status === 401) {
            const refreshToken = await getToken('refreshToken');

            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const { data } = await api.post('/jwt/exchange', {
                    params: { token: refreshToken },
                });
                
                const newAccess = data.accessToken;
                await setToken('accessToken', newAccess);
                config.headers['token'] = newAccess;

                return api(config);
            } catch (refreshErr) {
                return Promise.reject(refreshErr)
            }
        }

        return Promise.reject(error);
    }
);

export default api;