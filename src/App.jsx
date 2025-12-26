import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import ReactDOM from "react-dom";
import Banner from "./components/banner";
import BestReview from "./components/BestReview";
import './index.css';
import Profile from "./components/profile";
import Vote from "./components/vote";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import MovieDetail from "./pages/detail";
import Personal from './pages/personal';
import Join from "./components/join";
import JoinModal from "./components/joinModal";
import Login from './components/login';
import { useState } from "react";
import { AuthProvider } from './components/authContext';
import ReviewList from "./pages/reviewlist";
function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenJoinModal = () => {
        setIsJoinModalOpen(true);
  };

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false);
  };
  const handleOpenLoginModal = () => { // <--- 로그인 모달 열기 함수
        setIsLoginModalOpen(true);
  };
  const handleCloseLoginModal = () => { // <--- 로그인 모달 닫기 함수
        setIsLoginModalOpen(false);
        // 로그인 모달 닫힐 때 폼 초기화 로직 등 필요시 추가
  };
  return (
        <AuthProvider>
          <div className="app">
            <Header
              onOpenJoinModal={handleOpenJoinModal}
              onOpenLoginModal={handleOpenLoginModal}/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/personal" element={<Personal/>} />                 
                <Route path="/detail/:type/:id" element={<MovieDetail />} />
                <Route path="/detail/:type/:id" element={<MovieDetail />} /> 
                <Route path="/reviewlist" element={<ReviewList />} />
              </Routes>
              <JoinModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal}>
                        <Login onCloseModal={handleCloseLoginModal} /> 
              </JoinModal>
              <JoinModal isOpen={isJoinModalOpen} onClose={handleCloseJoinModal}>
                <Join onCloseModal={handleCloseJoinModal} /> 
              </JoinModal>
          </div>
        </AuthProvider>
    );
}

export default App;