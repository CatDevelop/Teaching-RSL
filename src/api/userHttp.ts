import axios from 'axios';
import { CONFIG } from './config';

export const userHttp = axios.create({
	baseURL: CONFIG.apiUserUrl,
	headers: {
		"Accept": "text/plain",
		"Content-Type":"application/json; charset=utf-8"
	}
});
