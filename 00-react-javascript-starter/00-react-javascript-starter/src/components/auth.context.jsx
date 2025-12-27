import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    isAuthenticated: false,
    user: { email: "", name: "" },
    appLoading: true, // Thêm cái này để tránh giật giao diện
});

export const AuthWrapper = (props) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: { email: "", name: "" }
    });
    
    
    // Thêm trạng thái loading để đợi check xong mới hiện web
    const [appLoading, setAppLoading] = useState(true);

    

    return (
        <AuthContext.Provider value={{ auth, setAuth, appLoading, setAppLoading }}>
            {/* Chỉ khi nào check xong (hết loading) mới hiện nội dung bên trong */}
            {props.children}
        </AuthContext.Provider>
    );
};