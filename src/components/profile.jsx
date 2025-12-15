import React from 'react';
import '../styles/profile.css'; // 새로 생성된 CSS 파일 import
import { useAuth } from './authContext';
import defaultprofile from '../images/default_profile.png';
import { Link, useNavigate } from 'react-router-dom';
function LoginRequiredSection({onOpenLoginModal}) {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

  if (isLoggedIn) {
    return (
            <div className="profile-section-wrapper">
                <div className="login-required-section" onClick={() => { navigate('/personal'); }}>
                    <div className="placeholder-circle">
                        <img
                            src={defaultprofile}
                            alt={``}
                            className="profile-img"
                        />
                    </div>
                    <p className="user-nickname">{user.nickname || user.userId}</p>
                </div>
                {/* 여기에 다른 사용자 활동 정보 등을 추가할 수 있습니다. */}
            </div>
        );
  }
  return (
    <>
    <div className="profile-section-wrapper">
        <div className="login-required-section" onClick={onOpenLoginModal}>
            <div className="placeholder-circle">
                <img
                src="https://placehold.co/128x128/cccccc/ffffff?text=User" // 회색 배경에 "User" 텍스트가 있는 원형 이미지
                alt="User Profile Placeholder"
                className="profile-img" // CSS에서 추가 스타일링을 위한 클래스
                />
            </div>
            <p className="message-text">로그인 필요</p>
        </div>
    </div>
    </>
  );
}

export default LoginRequiredSection;

