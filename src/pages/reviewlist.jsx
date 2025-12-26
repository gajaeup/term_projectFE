import React, { useState, useEffect } from 'react';
import client from '../api/client';
import '../styles/reviews.css';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularReviews = async () => {
            try {
                // 명세서에 존재하는 경로인 /reviews/popular만 호출합니다.
                const response = await client.get('/reviews/popular');
                // 보내주신 JSON 구조에 따라 response.data.data에서 배열을 가져옵니다.
                setReviews(response.data.data || []);
            } catch (error) {
                console.error("리뷰 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPopularReviews();
    }, []);

    // 좋아요 기능: 명세서의 /reviews/{id}/likes 경로 사용
    const handleLike = async (reviewId) => {
        try {
            await client.post(`/reviews/${reviewId}/likes`);
            
            // 성공 시 로컬 상태의 숫자를 직접 업데이트합니다.
            setReviews(prev => prev.map(r => 
                r.id === reviewId ? { ...r, like_count: r.like_count + 1 } : r
            ));
        } catch (error) {
            alert("좋아요 처리에 실패했습니다. 로그인이 필요할 수 있습니다.");
        }
    };

    if (loading) return <div className="loading">데이터를 불러오는 중...</div>;

    return (
        <div className="reviews-page">
            <div className="section-title">지금 뜨는 인기 리뷰</div>
            <div className="review-list">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-top">
                                <span className="rating-tag">⭐ {review.rating}</span>
                                <span className="date-tag">{review.created_at?.split('T')[0]}</span>
                            </div>
                            <p className="review-text">{review.comment}</p>
                            <div className="review-footer">
                                <span className="user-info">작성자 ID: {review.user_id}</span>
                                <button className="like-button" onClick={() => handleLike(review.id)}>
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M4.5 6.323h-2a.667.667 0 0 0-.667.667v6.667c0 .368.3.666.667.666h2a.667.667 0 0 0 .667-.666V6.99a.666.666 0 0 0-.667-.667"/>
                                        <path d="m10.7 5.46.207-.784c.084-.32.126-.688.126-1.167 0-.58-.21-.952-.476-1.185a1.62 1.62 0 0 0-1.059-.376c-.255 0-.371.075-.437.15l-.002.003a.4.4 0 0 0-.068.118.6.6 0 0 0-.023.257l.002.024v.025l.016.678.006.265-.186.189-1.834 1.858c-.377.381-.514.73-.514 1.044v6.431c0 .023.02.042.042.042h5.127c.648 0 1.197-.497 1.272-1.103l.003-.02.004-.022.961-4.966c.041-.37-.075-.74-.317-1.019z"/>
                                    </svg>
                                    <span>{review.like_count}</span>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="empty-msg">불러올 수 있는 인기 리뷰가 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default Reviews;