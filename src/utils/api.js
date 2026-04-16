import { AuthContext } from "../context/AuthContext";

//Helper function to make authenticated fetch requests
export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    const config = {
        ...options,
        headers: {
            "Content-Type" : "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
            ...options.headers,
        },
    };

    const response = await fetch(url, config);

    if (response.status === 401) {
        // Token expired or invalid -> logout
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
    }

    return response;
};