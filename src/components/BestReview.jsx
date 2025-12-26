import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import '../styles/bestReview.css';

function BestReview() {
  const [bestReviews, setBestReviews] = useState([]);
  const navigate = useNavigate();

  // 2. 컴포넌트가 처음 렌더링될 때 API 호출
  useEffect(() => {
    const fetchBestReviews = async () => {
      try {

        const response = await client.get('/reviews/popular');
        const rawData = response.data.data || response.data;

        const mappedData = rawData.map((item) => ({
          id: item.reviewId || item.id,            // 백엔드가 reviewId로 주면 수정
          movieImg: item.imageUrl || 'https://placehold.co/40x40/800080/FFFFFF?text=NoImg', // 이미지 URL
          username: item.nickname || item.username,
          movieName: item.title || item.movieName, 
          reviewText: item.comment,
          likes: item.like_count,    
          rating: item.rating
        }));

        setBestReviews(mappedData);

      } catch (error) {
        console.error("베스트 리뷰 불러오기 실패:", error);
        // 에러 시 빈 배열 유지
      }
    };
    fetchBestReviews();
  }, []);


  const renderStars = (rating) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      let fillType = "empty";

      if (i < Math.floor(rating)) {
        fillType = "full";
      } else if (i < rating) {
        fillType = "half";
      }

      stars.push(
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 13 13"
          xmlns="http://www.w3.org/2000/svg"
          className="star-icon"
        >
          {fillType === "full" && (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 0l1.902 3.92 4.33.63-3.116 3.045.735 4.29L6.5 10.64l-3.851 2.245.735-4.29L.268 4.55l4.33-.63L6.5 0z"
              fill="#FFD047"
            />
          )}
          {fillType === "half" && (
            <>
              <defs>
                <linearGradient id={`halfGradient-${i}`}>
                  <stop offset="50%" stopColor="#FFD047" />
                  <stop offset="50%" stopColor="#E9EAEB" />
                </linearGradient>
              </defs>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 0l1.902 3.92 4.33.63-3.116 3.045.735 4.29L6.5 10.64l-3.851 2.245.735-4.29L.268 4.55l4.33-.63L6.5 0z"
                fill={`url(#halfGradient-${i})`}
              />
            </>
          )}
          {fillType === "empty" && (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 0l1.902 3.92 4.33.63-3.116 3.045.735 4.29L6.5 10.64l-3.851 2.245.735-4.29L.268 4.55l4.33-.63L6.5 0z"
              fill="#E9EAEB"
            />
          )}
        </svg>
      );
    }

    return stars;
  };

  return (

    <>  
      <div className="section-title" >지금 뜨는 BEST 리뷰</div>
        <div className="best-review-list-wrapper"onClick={() => navigate('/reviewlist', { state: { sort: 'popular' } })} // 이동 시 상태 전달
        style={{ cursor: 'pointer' }}>
        <div className="best-review-section">
        <div className="review-grid">
          <div className="best-review-list-animated">
            {[...bestReviews, ...bestReviews].map((review, index) => (
              <div key={review.id + "-" + index} className="comment-item">
                <div className="review-header">
                    <img src={review.movieImg} alt="profile" className="movie-img" />
                  <div className="review-info" style={{ whiteSpace: 'pre-line', display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                    <p className="username">{review.username}</p>
                    <p className="movie-name">{review.movieName}</p>
                    <div className="rating">{renderStars(review.rating)}</div>
                    <p className="review-text">{review.reviewText}</p>
                  </div>
                </div>
                
                <div className="likes">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                  <path fill="currentColor" fillRule="evenodd" d="M4.5 6.323h-2a.667.667 0 0 0-.667.667v6.667c0 .368.3.666.667.666h2a.667.667 0 0 0 .667-.666V6.99a.666.666 0 0 0-.667-.667" clipRule="evenodd"></path>
                  <path stroke="currentColor" strokeWidth="1.25" d="m10.7 5.46.207-.784c.084-.32.126-.688.126-1.167 0-.58-.21-.952-.476-1.185a1.62 1.62 0 0 0-1.059-.376c-.255 0-.371.075-.437.15l-.002.003a.4.4 0 0 0-.068.118.6.6 0 0 0-.023.257l.002.024v.025l.016.678.006.265-.186.189-1.834 1.858c-.377.381-.514.73-.514 1.044v6.431c0 .023.02.042.042.042h5.127c.648 0 1.197-.497 1.272-1.103l.003-.02.004-.022.961-4.966c.041-.37-.075-.74-.317-1.019zm0 0h.811m-.81 0h.81m0 0h1.074m-1.074 0h1.074m0 0c.368 0 .72.16.965.442z"></path>
                  </svg>
                  <span>{review.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default BestReview;
