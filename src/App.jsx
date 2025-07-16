import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import Sample from "./pages/Sample";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

function App() {
  // logic
  // 진입시 무조건 로딩, 인증서비스 준비 완료 후에 로딩 fasle
  const [isLoading, setIsloading] = useState(true);

  const init = async () => {
    await auth.authStateReady() // 로그인 상태 변화 감지
    console.log('인증 완료', auth)
    setIsloading(false); // 로딩 상태 변경
  }

  // 페이지 진입 후 딱 한번 실행
  useEffect(() => {
    init()
  }, []);

  // view
  return (
    <div className="bg-churead-black h-full text-white overflow-auto">
      {isLoading ? <p className="text-2xl">Loadding...</p> : 
      <div className="max-w-[572px] mx-auto h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/post" element={<Post />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sample" element={<Sample />} />
          </Routes>
        </BrowserRouter>
      </div>}
    </div>
  );
}

export default App;
