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

    useEffect(() => {
        // 1. Lấy token từ localStorage
        const token = localStorage.getItem("access_token");

        if (token) {
            // TRƯỜNG HỢP CƠ BẢN: Có token thì coi như đã login
            // (Tốt nhất là nên gọi API về backend để check token còn hạn không và lấy thông tin user mới nhất)
            setAuth({
                isAuthenticated: true,
                user: {
                    email: localStorage.getItem("user_email") || "", // Nếu bạn có lưu email
                    name: "" 
                }
            });
        }
        
        // 2. Tắt loading
        setAppLoading(false);
    }, []); // [] nghĩa là chỉ chạy 1 lần duy nhất khi F5 trang

    return (
        <AuthContext.Provider value={{ auth, setAuth, appLoading }}>
            {/* Chỉ khi nào check xong (hết loading) mới hiện nội dung bên trong */}
            {appLoading ? <div>Loading app...</div> : props.children}
        </AuthContext.Provider>
    );
};