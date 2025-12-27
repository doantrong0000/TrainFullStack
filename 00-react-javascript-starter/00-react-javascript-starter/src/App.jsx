import axios from "./utils/axios.customize"
import { useEffect } from "react"
import Header from "./components/layout/header.jsx";
import { Outlet } from "react-router-dom";


function App() {

  useEffect(() => {
    const fetchHelloWorld = async () => {
      const res = await axios.get(`/v1/api/account`);
      console.log(">>> check res:", res)
    }
    fetchHelloWorld()
  }, []);

  return (
    <div>      
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
