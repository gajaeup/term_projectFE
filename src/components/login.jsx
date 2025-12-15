
import React, { useState } from 'react';
import '../styles/login.css'; 
import logo from '../images/logo4.png'; 
import { useAuth } from './authContext';
import defaultprofile from '../images/default_profile.png';

function Login({ onCloseModal }) { // 모달 닫기 함수를 prop으로 받습니다.
    const [formData, setFormData] = useState({
        userId: '',
        pw: ''
    });
    const [formMessage, setFormMessage] = useState('');
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userId || !formData.pw) {
            setFormMessage('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/login.do', {
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
                login({ 
                    userId: responseData.userId || formData.userId, // 백엔드에서 userId를 보내면 사용, 아니면 폼 데이터 사용
                    nickname: responseData.nickname || responseData.name || '알 수 없는 사용자', // 백엔드 응답의 nickname 또는 name 필드 사용
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
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        placeholder="아이디"
                        required
                    />
                    <label htmlFor="userId"></label>
                </div>
                <div className="login-form-group">
                    <input
                        type="password"
                        id="pw"
                        name="pw"
                        value={formData.pw}
                        onChange={handleChange}
                        placeholder="비밀번호"
                        required
                    />
                    <label htmlFor="pw"></label>
                </div>
                <div className='login-button-group'><button type="submit" className="login-submit-button">로그인</button></div>
                
                {formMessage && <p className={`message-box ${formMessage.includes('실패') ? 'error' : ''}`}>{formMessage}</p>}
            </form>
        </div>
    );
}

export default Login;