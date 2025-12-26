// src/api/userApi.js
import client from './client'; // 위에서 만든 파일 import

export const userApi = {
  // 1. 회원가입 (POST /users/signup) - 자물쇠 없음 (토큰 불필요)
  signup: async (userData) => {
    const response = await client.post('/users/signup', userData);
    return response.data;
  },

  // 2. 내 정보 조회 (GET /users/me) - 🔒 자물쇠 있음
  getMyInfo: async () => {
    const response = await client.get('/users/me');
    return response.data;
  },

  // 3. 내 정보 수정 (PUT /users/me) - 🔒 자물쇠 있음
  updateMyInfo: async (updateData) => {
    const response = await client.put('/users/me', updateData);
    return response.data;
  },

  // 4. 회원 탈퇴 (DELETE /users/me) - 🔒 자물쇠 있음
  deleteAccount: async () => {
    const response = await client.delete('/users/me');
    return response.data;
  },

  // 5. 비밀번호 변경 (PATCH /users/me/password) - 🔒 자물쇠 있음
  changePassword: async (passwordData) => {
    const response = await client.patch('/users/me/password', passwordData);
    return response.data;
  },

  getMyReviews: async (page = 1, size = 10) => {
    const response = await client.get(`/users/me/reviews?page=${page}&size=${size}`);
    return response.data;
  },
  getMyBookmarks: async (page = 1, size = 10) => {
      const response = await client.get(`/users/me/bookmarks?page=${page}&size=${size}`);
      return response.data;
  },
};