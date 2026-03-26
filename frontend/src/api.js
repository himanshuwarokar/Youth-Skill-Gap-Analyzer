const envUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = envUrl || "/api";
const isProduction = import.meta.env.PROD;

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
      const likelyMissingApiEnv = isProduction && API_URL.startsWith("/");
      const hint = likelyMissingApiEnv
        ? "VITE_API_URL is missing in production. Set it to your Render backend URL ending with /api."
        : "Check backend availability, HTTPS URL, and CORS CLIENT_URL/CLIENT_URLS.";
      throw new Error(
        `Unable to connect to server at ${API_URL}${path}. ${hint} ${error?.message ? `(${error.message})` : ""}`.trim()
      );
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
