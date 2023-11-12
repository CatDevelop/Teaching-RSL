import axios from 'axios';
import { CONFIG } from './config';
import { addTokenInterceptor } from './interceptors/addTokenInterceptor';
import { refreshSecretInterceptor } from './interceptors/refreshTokenInterceptor';

export const userHttp = axios.create({
	baseURL: CONFIG.apiUserUrl,
	headers: {
		"Accept": "text/plain",
		"Content-Type":"application/json; charset=utf-8"
	}
});

userHttp.interceptors.request.use(config => addTokenInterceptor(config),
	error => Promise.reject(error));

userHttp.interceptors.response.use(response => response,
	error => refreshSecretInterceptor(error));