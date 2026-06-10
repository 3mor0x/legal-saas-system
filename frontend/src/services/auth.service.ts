import axios from 'axios';

const API_URL = 'http://localhost:3000'; // رابط الـ Backend بتاعنا

export const loginAPI = async (credentials: any) => {
  // هنا بنخبط على باب الـ Backend بجد!
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data; // هيرجعلنا الـ Token وبيانات اليوزر
};