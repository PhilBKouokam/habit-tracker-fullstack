import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Load user from token on app start
    useEffect(() => {
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({
                    token: token,
                    id: payload.userId
                });
            } catch (err) {
                console.error("Failed to decode token on load", err);
                setUser({ token });
            }
        }
        setLoading(false);
    }, [token]);

    const login = (newToken, userData) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);

        //Store user ID properly - use userData if available, otherwise decode token
        let userId = userData?.id || userData?._id;

        if (!userId && newToken) {
            try {
                const payload = JSON.parse(atob(newToken.split('.')[1]));
                userId = payload.userId;
                console.log("Decoded userId from token:", userId);
            } catch (err) {
                console.error("Failed to decode token", err);
            }

            setUser({
                token: newToken,
                id: userId
            });

            console.log("User state set to:", { token: newToken, id: userId });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        window.location.href = '/login'; // Force redirect to login
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};