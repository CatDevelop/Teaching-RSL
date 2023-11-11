import axios from 'axios';
import { CONFIG } from './config';

export const authHttp = axios.create({
	baseURL: CONFIG.apiAuthUrl,
	headers: {
		"Accept": "text/plain",
		"Content-Type":"application/json; charset=utf-8"
	}
});
