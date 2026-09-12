import axios from 'axios';

export const axiosServer = axios.create({
  baseURL: process.env.ACADEMY_API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    tokenCybersoft: process.env.ACADEMY_TOKEN,
  },
});

// Add a request interceptor

// Add a response interceptor
