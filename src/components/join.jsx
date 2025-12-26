import React from 'react';
import { useState } from 'react';
import '../styles/join.css';
import logo from '../images/logo4.png';
import client from '../api/client';

function Join({ onCloseModal }) {
    const [formData, setFormData] = useState({
        email: '',         
        password: '',
        confirmPassword: '',
        nickname: '',
    });

    const [formMessage, setFormMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password || !formData.nickname) {
            setFormMessage('필수 정보를 모두 입력해주세요 (아이디, 비밀번호, 닉네임).');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setFormMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        try {
            const response = await client.post('/users/signup', {
                email: formData.email,
                password: formData.password,
                nickname: formData.nickname,
            });
            const message = await response.text(); 
            if (response.ok) {
                if (onCloseModal) {
                    onCloseModal();
                }
                setTimeout(() => {
                    window.location.href = '/'; 
                }, 2000);
            } else {
                setFormMessage(`회원가입 실패 : ${message}`);
            }
        } catch (error) {
            setFormMessage('회원가입 실패');
        }
    };
     return (
         <div className="join-container">
            <div className='header-wrapper'>
                <div className="join-logo">
                    <img src={logo} alt="logo" style={{ width: '150px'}} />
                </div>
                <div className="join-header">회원가입</div>
            </div>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userId"></label>
                           
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='이메일'
                            required
                        />
                </div>            
                        
                <div className="form-group">
                    <label htmlFor="pw"></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder='비밀번호'
                        />
                </div>
                <div className="form-group">
                            <label htmlFor="confirmPw"></label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder='비밀번호확인'
                                />
                                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className='password-mismatch-message'>비밀번호가 일치하지 않습니다.</p>
                                )}
                </div>
                        <div className="form-group">
                            <label htmlFor="name"></label>
                                <input
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    value={formData.nickname}
                                    onChange={handleChange}
                                    required
                                    placeholder='닉네임'
                                />
                        </div>  
                        <div className='button-group'>
                            <button type="submit" className="submit-button">회원가입</button>
                        </div>
                {formMessage && <p className={`message-box ${formMessage.includes('실패') ? 'error' : ''}`}>{formMessage}</p>}
            </form>
        </div>
    );
}

export default Join;
