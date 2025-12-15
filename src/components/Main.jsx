import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ContentCard from './ContentCard';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/main.css';
import {TMBDAPI, IMAGE_BASE_URL} from './TMBD-API';
import Movie from './Movie';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();
  const [combinedContent, setCombinedContent] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    async function getAllContentData() {
            try {
                // 영화 데이터와 드라마 데이터를 동시에 가져옵니다.
                const [movieData, tvSeriesData] = await Promise.all([
                    TMBDAPI.fetchMovies(),
                    TMBDAPI.fetchPopularTvSeries()
                ]);

                // 영화와 드라마 데이터를 합치고, 각 항목에 displayTitle 속성을 추가하여 통일합니다.
                // TMDB API에서 영화는 'title', 드라마는 'name'을 사용합니다.
                const processedMovieData = movieData.map(item => ({
                    ...item,
                    type: 'movie', // 영화임을 나타내는 타입 추가
                    displayTitle: item.title // 영화는 title을 그대로 사용
                }));
                
                const processedTvSeriesData = tvSeriesData.map(item => ({
                    ...item,
                    type: 'tv', // 드라마임을 나타내는 타입 추가
                    displayTitle: item.name // 드라마는 name을 사용
                }));

                // 두 배열을 합칩니다.
                const shuffledContent = [...processedMovieData, ...processedTvSeriesData]
                    .sort(() => 0.5 - Math.random()); // 콘텐츠를 무작위로 섞습니다.

                setCombinedContent(shuffledContent);
                setLoading(false);
            } catch (error) {
                console.error("콘텐츠 데이터를 불러오는 데 실패했습니다:", error);
                setLoading(false);
            }
        }
        
        getAllContentData();
  }, []);


  return (
    <div className="main-section-wrapper">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        centeredSlides={false}
        navigation={true}
        modules={[Navigation]}
        
        className="mySwiper"
      >
            {combinedContent.map(item => (
                <SwiperSlide key={`${item.type}-${item.id}`}> {/* 고유한 key를 위해 type과 id 조합 */}
                                {/* ContentCard 컴포넌트로 각 슬라이드 내용 렌더링 */}
                                <ContentCard item={item} />
                </SwiperSlide>
            ))}

      </Swiper>
    </div>
  );
}