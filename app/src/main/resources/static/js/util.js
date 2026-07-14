// Shared constants and helper functions used across all pages

const API_BASE_URL = "/api";

function getToken() {
  return localStorage.getItem("token");
}

function getRole() {
  return localStorage.getItem("userRole");
}

// Basic fetch wrapper that adds auth header when a token exists
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = Object.assign(
    { "Content-Type": "application/json" },
    options.headers || {}
  );
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed: ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
}
