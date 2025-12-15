import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from './TMBD-API'; // 이미지 베이스 URL 임포트

function ContentCard({ item }) {
    // TMDB API에서 가져온 poster_path를 사용하여 배경 이미지 URL 생성
    const backgroundImageUrl = item.poster_path 
        ? `${IMAGE_BASE_URL}w500${item.poster_path}` 
        : 'https://placehold.co/300x450/000000/FFFFFF?text=No+Image'; // 이미지 없을 때 대체 이미지

    return (
        <Link
            to={`/detail/${item.type}/${item.id}`}
            className="rolling-card" 
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            title={item.displayTitle}
        >
            {/* 상단 오버레이 (어둡게 처리) */}
            <div className="card-top-overlay"></div>
            
            {/* 상단 카테고리/배지 영역 */}
            <p className="card-category">
                {item.type === 'movie' ? '인기 영화' : '인기 드라마'} {/* 타입에 따라 카테고리 표시 */}
            </p>

            {/* 하단 오버레이 (제목 영역) */}
            <div className="card-bottom-overlay"></div>
            
            {/* 하단 제목 영역 */}
            <div className="card-text-content">
                <p className="card-title">{item.displayTitle}</p>

            </div>
        </Link>
    );
}

export default ContentCard;
