import React, { useState, useRef, useEffect } from 'react';
import '../styles/header.css'; // 해당 CSS 파일 불러오기
import logo from '../images/logo4.png';
import { Link, useNavigate } from 'react-router-dom';
import TMBDAPI from './TMBD-API';
import Pngegg from '../images/pngegg.png';
import { useAuth } from './authContext';
import defaultprofile from '../images/default_profile.png';

const Header = ({ onOpenJoinModal , onOpenLoginModal }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 목록 상태
    const [showResults, setShowResults] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const navigate = useNavigate();
    const searchRef = useRef(null);
    const { isLoggedIn, user, logout } = useAuth();
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }

    }, []);

    
    const handleSearchInputChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim().length > 0) {
            const results = await TMBDAPI.search(query.trim());// 검색어가 있으면 즉시 검색 시도
            setSearchResults(results);
            setShowResults(true); // 결과가 있을 수도 있으니 일단 보이게
        } else {
            setShowResults(false); // 검색어가 없으면 결과 숨기기
            setSearchResults([]); // 결과 초기화
        }
    };
    

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // 폼 제출의 기본 동작 방지
        
    };

    const handleResultClick = (item) => {
        navigate(`/detail/${item.type}/${item.id}`);
        setSearchQuery(''); // 검색창 초기화
        setSearchResults([]); // 검색 결과 초기화
        setShowResults(false); // 검색 결과 목록 숨기기
    };

    const handleProfileMouseEnter = () => {
        setIsProfileMenuOpen(true);
    };

    const handleProfileMouseLeave = () => {

        setIsProfileMenuOpen(false);

    };

    const handleLogoutClick = () => {
        logout(); // AuthContext의 로그아웃 함수 호출
        setIsProfileMenuOpen(false); // 메뉴 닫기
        navigate('/');
    };
    
    const handleMyInfoClick = () => {
        navigate('/personal'); // 내 정보 페이지로 이동 (라우트 경로에 맞게 수정)
        setIsProfileMenuOpen(false); // 메뉴 닫기
    };

    return (
        <div className="header-container">
            <div className="header-wrap" >
                <div className="logo"  >
                    <Link to="/">
                        <img src={logo} alt="logo" style={{ width: '100px', height: '30px' }} />
                    </Link>
                </div>
                <div className="search-bar-section" ref={searchRef}>
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <input
                            type="text"
                            placeholder="작품 이름 검색"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="search-input"
                        />
                        <button type="submit" className="search-icon-button"> 
                            <img src={Pngegg} alt='Pngegg' className="search-icon-img"/>
                        </button>
                    
                

                        {showResults && searchQuery.trim().length > 0 && ( 
                            <div className="search-results-dropdown">
                                {searchResults.length > 0 ? (
                                    <ul>
                                        {searchResults.map((item) => (
                                            <li key={`${item.type}-${item.id}`} onClick={() => handleResultClick(item)}>
                                                {item.poster_path && (
                                                    <img 
                                                        src={TMBDAPI.getPosterUrl(item.poster_path, 'w92')} 
                                                        alt={item.title} 
                                                        style={{ width: '40px', height: 'auto', marginRight: '10px', borderRadius: '4px' }} 
                                                    />
                                                )}
                                                <span>{item.title} ({item.type === 'movie' ? '영화' : 'TV'})</span> 
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="no-results">검색 결과가 없습니다.</div>
                                )}
                            </div>
                        )}
                    </form>
                </div>
                <div className="header-left-wrap">
                    <ul>
                        {isLoggedIn ? ( // <--- 로그인 상태에 따라 조건부 렌더링
                            <>
                                <li style={{ listStyle: 'none' }}>
                                    <button
                                        type="button"
                                        onClick={() => { navigate('/rate'); }}
                                        className="rateButton"
                                        style={{ cursor: 'pointer', border: 'none', background: 'none', padding: '8px 15px', color: 'rgb(104, 104, 104)', fontSize: '14px', marginRight: '8px' }}
                                    >
                                        <span role="textbox">평가하기</span>
                                    </button>
                                </li>
                                <li
                                    className="profile-menu-container" /* <--- 새로운 클래스명 추가 */
                                    onMouseEnter={handleProfileMouseEnter} 
                                    onMouseLeave={handleProfileMouseLeave}
                                    style={{ listStyle: 'none' }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => { navigate('/personal') }}
                                        className="profileButton"
                                        style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 , marginRight:'15px'}}
                                    >
                                        <img
                                            src={defaultprofile} // <--- user.avatarUrl 사용 또는 임시 플레이스홀더
                                            alt="프로필 사진"
                                            className="user-profile-image"
                                            style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    </button>
                                    {isProfileMenuOpen && (
                                            <div className="profile-dropdown-menu">
                                                <ul className="profile-menu-list">
                                                    <li>
                                                        <button type="button" onClick={handleMyInfoClick}>
                                                            내 정보
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button type="button" onClick={handleLogoutClick}>
                                                            로그아웃
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                    )}
                                    
                                </li>
                            </>
                        ) : (
                            <>
                                <li style={{ listStyle: 'none' }}>
                                    <button
                                        type="button"
                                        className="loginButton"
                                        onClick={onOpenLoginModal}
                                        style={{
                                            cursor: 'pointer',
                                            border: 'none',
                                            background: 'none',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <span role="textbox">로그인</span>
                                    </button>
                                </li>
                                <li style={{ listStyle: 'none' }}>
                                    <button type="button" className="joinButton" onClick={onOpenJoinModal} style={{
                                        cursor: 'pointer',
                                        background: 'none',
                                        textDecoration: 'none'
                                    }}
                                    >
                                        <span role="textbox">회원가입</span>
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;