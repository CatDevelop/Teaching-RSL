import axios from 'axios';
import { CONFIG } from './config';

export const http = axios.create({
	baseURL: CONFIG.apiUrl,
	headers: {
		"Accept": "text/plain",
		"Content-Type":"application/json; charset=utf-8"
	}
});
