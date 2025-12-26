
import React, { useState } from 'react';
import '../styles/login.css'; 
import logo from '../images/logo4.png'; 
import { useAuth } from './authContext';
import { auth } from '../firebase'; // 지난 단계에서 만든 firebase.js 경로 확인해주세요!
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import client from '../api/client';
import { useNavigate } from 'react-router-dom';
function Login({ onCloseModal }) { // 모달 닫기 함수를 prop으로 받습니다.
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [formMessage, setFormMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleGoogleLogin = async () => {
        try {
            // (1) 구글 팝업 띄우기
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            // (2) ID 토큰 추출
            const user = result.user;
            const idToken = await user.getIdToken();


            const response = await client.post('/auth/google', { 
                id_token: idToken
            });

            const responseData = response.data;
            const tokens = responseData.data || responseData; 
            
            localStorage.setItem('access_token', tokens.access_token);
            localStorage.setItem('refresh_token', tokens.refresh_token);
            
            login({ 
                email: user.email, 
                token: tokens.access_token 
            });

            if (onCloseModal) onCloseModal();
            
            setTimeout(() => {
                navigate('/'); // SPA 방식의 이동 권장
            }, 1500);
        
        } catch (error) {
            console.error("구글 로그인 에러:",error.response?.data);
            setFormMessage('구글 로그인 중 오류가 발생했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setFormMessage('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('http://113.198.66.75:10093/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // userId와 pw만 보냄
            });
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const responseData = isJson ? await response.json() : { message: await response.text() };
            
            if (response.ok) { // HTTP 상태 코드가 200번대인 경우
                setFormMessage('로그인이 성공적으로 완료되었습니다.');
                const tokens = responseData.data || responseData;
                localStorage.setItem('access_token', tokens.access_token);
                localStorage.setItem('refresh_token', tokens.refresh_token);
                login({ 
                    email: formData.email, 
                    token: tokens.access_token 
                });
                if (onCloseModal) {
                    onCloseModal(); // 모달 닫기
                }
                setTimeout(() => {
                    window.location.href = '/'; // 홈 화면으로 이동 또는 새로고침
                }, 1500); // 1.5초 후 이동
            } else { // 로그인 실패
                setFormMessage(`로그인 실패: ${responseData.message || '알 수 없는 오류'}`);
            }
        } catch (error) {
            console.error('로그인 오류:', error);
           
        }
    };

    return (
        <div className="login-container">
            <div className="login-header-section">
                <div className="login-logo">
                    <img src={logo} alt="로고" style={{ width: '150px' }} />
                </div>
                <div className="login-header">로그인</div>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-group">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="이메일"
                        required
                    />
                    <label htmlFor="email"></label>
                </div>
                <div className="login-form-group">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호"
                        required
                    />
                    <label htmlFor="password"></label>
                </div>
                <div className='login-button-group'><button type="submit" className="login-submit-button">로그인</button></div>
                
                {formMessage && <p className={`message-box ${formMessage.includes('실패') ? 'error' : ''}`}>{formMessage}</p>}
            </form>
            <div className="social-login-section">
                <div className="login-divider">
                    <div className="login-divider-line"></div>
                    <span className="login-divider-text">또는</span>
                    <div className="login-divider-line"></div>
                </div>

                <button 
                    type="button" 
                    onClick={handleGoogleLogin} 
                    className="google-login-button"
                >
                    <img 
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                        alt="Google" 
                        className="google-icon"
                    />
                    Google 계정으로 로그인
                </button>
            </div>

        </div>
    );
}

export default Login;