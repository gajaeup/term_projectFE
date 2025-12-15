import React from 'react';
import { useState } from 'react';
import '../styles/join.css';
import logo from '../images/logo4.png';


function Join({ onCloseModal }) {
    const [formData, setFormData] = useState({
        userId: '',
        pw: '',
        confirmPw: '',
        name: '',
        nickname:'',
        birth: '',
        phone: ''
    });

    const [formMessage, setFormMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userId || !formData.pw || !formData.confirmPw || !formData.name ||!formData.nickname) {
            setFormMessage('필수 정보를 모두 입력해주세요 (아이디, 비밀번호, 회원명, 닉네임).');
            return;
        }
        if (formData.pw !== formData.confirmPw) {
            setFormMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/memberRegist.do', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
                },
                body: JSON.stringify({ // formData에서 confirmPw를 제외하고 JSON 문자열로 변환
                    userId: formData.userId,
                    pw: formData.pw,
                    name: formData.name,
                    nickname:formData.nickname,
                    birth: formData.birth,
                    phone: formData.phone
                }),
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
                            id="userId"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            placeholder='아이디'
                            required
                        />
                </div>            
                        
                <div className="form-group">
                    <label htmlFor="pw"></label>
                        <input
                            type="password"
                            id="pw"
                            name="pw"
                            value={formData.pw}
                            onChange={handleChange}
                            required
                            placeholder='비밀번호'
                        />
                </div>
                <div className="form-group">
                            <label htmlFor="confirmPw"></label>
                                <input
                                    type="password"
                                    id="confirmPw"
                                    name="confirmPw"
                                    value={formData.confirmPw}
                                    onChange={handleChange}
                                    required
                                    placeholder='비밀번호확인'
                                />
                                {formData.pw && formData.confirmPw && formData.pw !== formData.confirmPw && (
                                    <p className='password-mismatch-message'>비밀번호가 일치하지 않습니다.</p>
                                )}
                </div>
                        <div className="form-group">
                            <label htmlFor="name"></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder='성명'
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nickname"></label>
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
                        
                        <div className="form-group">
                            <label htmlFor="birth"></label>
                                <input
                                    type="text"
                                    id="birth"
                                    name="birth"
                                    value={formData.birth}
                                    onChange={handleChange}
                                    placeholder="생년월일(YYYY-MM-DD)"
                                    maxLength="10"
                                />
                        </div>
                        <div className="form-group">
                            <th><label htmlFor="phone"></label></th>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder='휴대폰'
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
