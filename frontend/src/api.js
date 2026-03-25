const envUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = envUrl || "/api";

export const api = {
  async request(path, options = {}) {
    const token = localStorage.getItem("ysg_token");
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let response;
    try {
      response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
      });
    } catch (error) {
      throw new Error("Unable to connect to server. Please ensure backend is running on port 5001.");
    }

    const contentType = response.headers.get("content-type") || "";
    let data;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const raw = await response.text();
      data = {
        message: `Unexpected server response format (status ${response.status}). ${raw.slice(0, 120)}`,
      };
    }

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  },
};
