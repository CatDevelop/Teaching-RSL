import axios from 'axios';
import { CONFIG } from './config';
import { addTokenInterceptor } from './interceptors/addTokenInterceptor';
import { refreshSecretInterceptor } from './interceptors/refreshTokenInterceptor';

export const http = axios.create({
	baseURL: CONFIG.apiUrl,
	headers: {
		"Accept": "text/plain",
		"Content-Type":"application/json; charset=utf-8"
	}
});

http.interceptors.request.use(config => addTokenInterceptor(config),
	error => Promise.reject(error));

http.interceptors.response.use(response => response,
	error => refreshSecretInterceptor(error));
