import axios from "./utils/axios.customize"
import { useEffect } from "react"
import Header from "./components/layout/header.jsx";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/auth.context.jsx";
import { Spin } from "antd";


function App() {

  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);
  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true); // Bắt đầu loading

      const res = await axios.get(`/v1/api/account`);
      if (res) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.email, // Nếu bạn có lưu email
            name: res.name
          }
        })
      }
      setAppLoading(false); // Kết thúc loading

    }
    fetchAccount()
  }, []);

  return (
    <div>
      {appLoading === true ? 
      <div>
        <Spin style={{
          position: "fixed",
          top :"50%",
          left: "50%",
          transform: "translare(-50%, -50%)"
        }}></Spin>
        </div> :
        <>
          <Header />
          <Outlet />
          </>
          }
    </div>
  )
}

export default App
