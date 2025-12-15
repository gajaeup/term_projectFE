import React from 'react';
import '../styles/bestReview.css';

function BestReview() {
  const bestReviews = [
    {
      id: 'best-1',
      movieImg: 'https://placehold.co/40x40/800080/FFFFFF?text=B1',
      username: '닉네임1',
      movieName: '영화 이름',
      reviewText: '리뷰',
      likes: 47,
      rating: 4,
    },
    {
      id: 'best-2',
      movieImg: 'https://placehold.co/40x40/008080/FFFFFF?text=B2',
      username: '닉네임2',
      movieName: '영화 이름',
      reviewText: '이 작품을 보기 전으로 돌아가고 싶어요.',
      likes: 4,
      rating: 1.5
    },
    {
      id: 'best-3',
      movieImg: 'https://placehold.co/40x40/008080/FFFFFF?text=B3',
      username: '닉네임3',
      movieName: '영화 이름',
      reviewText: '리뷰',
      likes: 16,
      rating: 2.5
    },
    {
      id: 'best-4',
      movieImg: 'https://placehold.co/40x40/008080/FFFFFF?text=B4',
      username: '닉네임4',
      movieName: '영화 이름',
      reviewText: '리뷰',
      likes: 27,  
      rating: 3
    },
    {
      id: 'best-4',
      movieImg: 'https://placehold.co/40x40/008080/FFFFFF?text=B5',
      username: '닉네임5',
      movieName: '영화 이름',
      reviewText: '작품 안본 눈 삽니다',
      likes: 10,  
      rating: 5
    },
  ];

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
      <div className="section-title">지금 뜨는 BEST 리뷰</div>
        <div className="best-review-list-wrapper">
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
