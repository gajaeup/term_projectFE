import { useParams } from "react-router-dom";
import { TMBDAPI } from "../components/TMBD-API";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../components/TMBD-API";
import '../styles/detail.css';
const PROFILE_IMAGE_BASE_URL = `${IMAGE_BASE_URL}w185`;
const Detail = () => {
  const { id, type } = useParams(); // URL 파라미터에서 ID와 타입 가져오기
  const navigate = useNavigate();
  const [details, setDetails] = useState(null); 
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedDetails;
        let fetchedCredits;
        if (type === 'movie') {
          [fetchedDetails, fetchedCredits] = await Promise.all([
            TMBDAPI.fetchMovieDetail(id),
            TMBDAPI.fetchMovieCredits(id) 
          ])
        } else if (type === 'tv') {
          [fetchedDetails, fetchedCredits] = await Promise.all([ // ⭐️ Promise.all로 병렬 호출
            TMBDAPI.fetchTvSeriesDetail(id),
            TMBDAPI.fetchTvSeriesCredits(id) 
          ])
        } else {
          throw new Error('알 수 없는 콘텐츠 타입입니다.');
        }
        setDetails(fetchedDetails);
        setCredits(fetchedCredits);

      } catch (err) {
        setError('상세 정보를 불러오는데 실패했습니다. 네트워크 연결 또는 API 키를 확인해주세요.');
        console.error(`Error fetching details for ${type} ID ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    // id와 type이 유효할 때만 API 호출
    if (id && type) {
      loadDetails();
    }
  }, [id, type]); // ID 또는 타입이 변경될 때마다 다시 호출

  // 로딩, 에러, 데이터 없음 상태 처리
  if (loading) return <div className="loading-message"> </div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!details) return <div className="not-found-message">정보를 찾을 수 없습니다.</div>;


  return (
    <div className="movie-detail-container">
      
      <div className="detail-header">
        {details.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}w300${details.poster_path}`}
            alt={details.title || details.name}
            className="detail-poster"
          />
        ) : (
          <div className="no-poster-placeholder-large">
            포스터 없음 <br/> {(details.title || details.name)}
          </div>
        )}
        <div className="detail-container">
          <div className="detail-info">
            <p className="detail-title">{details.title || details.name}</p> {/* 영화는 title, 드라마는 name */}
            <p className="detail-release-date">
              개봉/방영일: {details.release_date || details.first_air_date} {/* 영화는 release_date, 드라마는 first_air_date */}
            </p>
            <p className="detail-genres">
              장르: {details.genres && details.genres.map(g => g.name).join(', ')}
            </p>
            {details.runtime && <p className="detail-runtime">러닝타임: {details.runtime}분</p>} {/* 영화 러닝타임 */}
            {/* 드라마의 경우 episode_run_time 배열의 첫 번째 값 사용 */}
            {type === 'tv' && details.episode_run_time && details.episode_run_time.length > 0 &&
              <p className="detail-runtime">회당 러닝타임: {details.episode_run_time[0]}분</p>}
            <p className="detail-vote-average">
              평점: {details.vote_average ? details.vote_average.toFixed(1) : 'N/A'} ({details.vote_count}표)
            </p>
          </div>
          <div className="detail-overview">
            <p className="detail-overview-title">줄거리</p>
            <p className="detail-overview-content">{details.overview || '줄거리 정보가 없습니다.'}</p>
          </div>
        </div>
      </div>
      
      <div className="cast-content">
          <p className="cast-title">주요 출연진</p>
            <div className="credits-list">
              {credits.map(actor => (
                <div key={actor.id} className="actor-item">
                  {actor.profile_path ? (
                    <img
                      src={`${PROFILE_IMAGE_BASE_URL}${actor.profile_path}`}
                      alt={actor.name}
                      className="actor-profile-img"
                    />
                  ) : (
                    <div className="no-profile-placeholder">
                      {actor.name.charAt(0)}
                    </div>
                  )}
                  <div className="actor">
                    <p className="actor-name">{actor.name}</p>
                    <p className="actor-character">{actor.character}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
    </div>
  );
};

export default Detail;