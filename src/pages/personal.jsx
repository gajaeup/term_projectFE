import React from "react";
import "../styles/personal.css";
import defaultprofile from "../images/default_profile.png";
import Grade from "../components/grade";
import Distance from "../components/distance";
import { useAuth } from '../components/authContext';
import { userApi } from '../api/users';
import { useState, useEffect } from 'react';

function Personal() {
    const { isLoggedIn, user } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [myReviews, setMyReviews] = useState([]);
    const [myBookmarks, setMyBookmarks] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            // 3. 로그인 상태일 때만 실제 정보를 서버에서 가져옴
            if (isLoggedIn && localStorage.getItem('access_token')) {
                try {
                    const [infoRes, reviewRes, bookmarkRes] = await Promise.all([
                        userApi.getMyInfo(),
                        userApi.getMyReviews(1,10),
                        userApi.getMyBookmarks(1,10)
                    ]);
                    setUserInfo(infoRes.data || infoRes);
                    const reviewData = reviewRes.data?.items || reviewRes.items || [];
                    setMyReviews(reviewData);
                    setMyBookmarks(bookmarkRes.data?.items || []);
                } catch (error) {
                    console.error("사용자 정보 로딩 실패:", error);
                }
            }
        };

        fetchUserData();
    }, [isLoggedIn]);

    // 4. 로그인하지 않았을 때 에러가 나는 것을 원천 차단
    if (!isLoggedIn) {
        return <div style={{ padding: "100px", textAlign: "center" }}>로그인이 필요한 페이지입니다.</div>;
    }
    if (isLoggedIn) {
       return (
        <div className="personal-page-container">
            {/* 상단 프로필 섹션 */}
            <div className="background-section">
                <div className="background">
                    <div className="profile-container">
                        <div className="profile-img-box">
                            <img src={userInfo?.profileImage || defaultprofile} alt="profile" className="personal-img" />
                        </div>
                        <div className="nickname-section">
                            <div className="nickname">{userInfo?.nickname || user?.nickname || "사용자"}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 칭호/타임라인 자리에 리뷰와 북마크 배치 */}
            <div className="main-section">
                {/* 내가 쓴 리뷰 영역 */}
                <div className="content-box review-box">
                    <div className="box-header">
                        <h3>내가 쓴 리뷰 <span>{myReviews.length}</span></h3>
                    </div>
                    <div className="box-list">
                        {myReviews.length > 0 ? (
                            myReviews.map((review) => (
                                <div key={review.id} className="item-card">
                                    <div className="card-top">
                                        <span className="rating-star">⭐ {review.rating}</span>
                                        <span className="item-date">{review.created_at?.split('T')[0]}</span>
                                    </div>
                                    <p className="item-content">{review.comment}</p>
                                    <div className="card-bottom">
                                        <small>작품 ID: {review.content_id}</small>
                                        <span className="like-count">❤️ {review.like_count}</span>
                                    </div>
                                </div>
                            ))
                        ) : <p className="empty-msg">작성한 리뷰가 없습니다.</p>}
                    </div>
                </div>

                {/* 북마크 영역 */}
                <div className="content-box bookmark-box">
                    <div className="box-header">
                        <h3>북마크 <span>{myBookmarks.length}</span></h3>
                    </div>
                    <div className="box-list">
                        {myBookmarks.length > 0 ? (
                            myBookmarks.map((bookmark) => (
                                <div key={`${bookmark.user_id}-${bookmark.content_id}`} className="item-card">
                                    <h4 className="place-name">저장된 작품 ID: {bookmark.content_id}</h4>
                                    <span className="item-date">저장일: {bookmark.created_at?.split('T')[0]}</span>
                                </div>
                            ))
                        ) : <p className="empty-msg">저장된 북마크가 없습니다.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
    }
}
export default Personal;