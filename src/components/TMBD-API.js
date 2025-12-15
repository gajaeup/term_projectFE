
export const URL = 'https://api.themoviedb.org/3/'

export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/'
const KEY = process.env.REACT_APP_TMDB_API_KEY;
export const TMBDAPI = {
    fetchMovies: async () => {
        try {
            const response = await fetch(`${URL}movie/popular?api_key=${KEY}&language=ko-KRpage=1`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.results; // 영화 데이터 배열 반환
        } catch (error) {
            console.error("Failed to fetch movie data:", error); // 영화 데이터 불러오기 실패
            return []; // 오류 발생 시 빈 배열 반환
        }
    },

    fetchPopularTvSeries: async () => {
        try {
            const response = await fetch(`${URL}tv/airing_today?api_key=${KEY}&language=ko-KR&page=1`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.results; // TV 시리즈 데이터 배열 반환
        } catch (error) {
            console.error("Failed to fetch popular TV series data:", error); // 인기 TV 시리즈 데이터 불러오기 실패
            return []; // 오류 발생 시 빈 배열 반환
        }
    },

    fetchMovieDetail: async (movieId) => {
        try {
            const response = await fetch(`${URL}movie/${movieId}?api_key=${KEY}&language=ko-KR`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to fetch movie detail for ID ${movieId}:`, error);
            throw error;
        }
    },


    fetchTvSeriesDetail: async (tvSeriesId) => {
        try {
            const response = await fetch(`${URL}tv/${tvSeriesId}?api_key=${KEY}&language=ko-KR`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to fetch TV series detail for ID ${tvSeriesId}:`, error);
            throw error;
        }
    },

    fetchMovieCredits: async (movieId) => {
        try {
            const response = await fetch(`${URL}movie/${movieId}/credits?api_key=${KEY}&language=ko-KR`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
            }
            const data = await response.json();
            return data.cast; // 'cast' 배열에 출연진 정보가 담겨 있습니다.
        } catch (error) {
            console.error(`Failed to fetch movie credits for ID ${movieId}:`, error);
            throw error;
        }
    },


    fetchTvSeriesCredits: async (tvSeriesId) => {
        try {
            const response = await fetch(`${URL}tv/${tvSeriesId}/credits?api_key=${KEY}&language=ko-KR`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
            }
            const data = await response.json();
            return data.cast; // 'cast' 배열에 출연진 정보가 담겨 있습니다.
        } catch (error) {
            console.error(`Failed to fetch TV series credits for ID ${tvSeriesId}:`, error);
            throw error;
        }
    },

    search: async (query) => {
        try {
            if (!query || query.trim() === '') {
                return []; // 검색어가 없으면 빈 배열 반환
            }

            const params = new URLSearchParams({
                api_key: KEY,
                language: 'ko-KR',
                query: query.trim(), // 검색어 앞뒤 공백 제거
            });
            const apiUrl = `${URL}search/multi?${params.toString()}`;
            
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
            }
            const data = await response.json();
            
            return data.results
                .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
                .map(item => ({
                    id: item.id,
                    type: item.media_type,
                    title: item.media_type === 'movie' ? item.title : item.name
                }));

        } catch (error) {
            console.error("Failed to perform TMDB search:", error);
            return [];
        }
    }




};
export default TMBDAPI;