// API Configuration
export const API_CONFIG = {
  // Local Development Server
  LOCAL: "http://10.30.132.49:3000/api",

  // External/Production API
  EXTERNAL: "http://10.0.15.34:3000/api",

  // Current active API
  CURRENT: "http://10.30.132.49:3000/api", // เปลี่ยนตรงนี้เพื่อสลับ API
};

export const API_ENDPOINTS = {
  BOOKS: `${API_CONFIG.CURRENT}/books`,
  HEALTH: `${API_CONFIG.CURRENT}/health`,
};
