import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/main.css'; 
import '../styles/banner.css';
import banner1 from '../images/banner1-3.png';
import banner2 from '../images/banner2-1.png';

import { Navigation, Autoplay } from 'swiper/modules'; 

import ContentCard from './ContentCard'; 

export default function ImageSlider() { 
    const navigate = useNavigate();
    const staticImages = [
        { id: 1, poster_path: banner1, displayTitle: '배너1', type: 'custom', path: '/detail/tv/292531' },
        { id: 2, poster_path: banner2, displayTitle: '배너2', type: 'custom', path: '/detail/tv/253193' },

    ];

    const [combinedContent, setCombinedContent] = useState(staticImages);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {

    }, []); 

    return (
                <div className="banner-section-wrapper">
                    <Swiper
                        slidesPerView={1} 
                        spaceBetween={20} // 슬라이드 간 간격
                        centeredSlides={false} // 슬라이드 중앙 정렬 비활성화
                        autoplay={{
                            delay: 7000,
                            disableOnInteraction: false,
                        }}
                        sliderOffsetAfter={0}
                        sliderOffsetBefore={0}
                        navigation={false}
                        loop={true}
                        modules={[Navigation, Autoplay]} 
                        className="banner-swiper" // CSS 클래스 적용
                    >
                        {/* 합쳐진 콘텐츠 배열을 매핑하여 각 항목에 대해 SwiperSlide 렌더링 */}
                        {combinedContent.map(item => (
                            <SwiperSlide key={`${item.type}-${item.id}`}> 
                            <img
                                    src={item.poster_path} // staticImages의 poster_path는 이미 완전한 URL
                                    alt={item.displayTitle}
                                    onClick={() => navigate(item.path)}
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            );
}
