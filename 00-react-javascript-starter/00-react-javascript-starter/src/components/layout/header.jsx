import React, { useContext, useState } from 'react';
import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth.context.jsx';

const Header = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <MailOutlined />, 
        },
        
        // Logic: Nếu login rồi thì hiện User
        ...(auth.isAuthenticated ? [{
            label: <Link to={"/user"}>User</Link>,
            key: 'user',
            icon: <AppstoreOutlined />, // Thay icon khác cho đẹp
        }] : []),

        {
            // Logic: Nếu chưa có email thì hiện "Guest"
            label: `Welcome ${auth?.user?.email ?? "Guest"}`,
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                // Logic: Đã login -> Hiện Logout
                ...(auth.isAuthenticated ? [{
                    label: <span onClick={() => {
                        localStorage.removeItem("access_token");
                        navigate("/"); 
                        window.location.reload(); // Load lại trang để reset sạch sẽ
                    }}>Logout</span>,
                    key: 'logout',
                }] : 
                // Logic: Chưa login -> Hiện Login
                [{
                    label: <Link to={"/login"}>Login</Link>,
                    key: 'login',
                }]),
            ],
        },
    ];

    // SỬA LỖI Ở ĐÂY: Đổi 'mail' thành 'home' để mặc định chọn trang chủ
    const [current, setCurrent] = useState('home'); 

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;