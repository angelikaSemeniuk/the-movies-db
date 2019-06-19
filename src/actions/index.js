import themoviedb from '../api/themoviedb';

export const fetchMovies =  (value, page=1) => async  dispatch => {
  const response = await themoviedb.get('/search/movie', {
    params: {
      api_key: "9f8233e5843d6fc70a65f379d4909c34",
      language: "en-US",
      query: value,
      include_adult: false,
      page:page
    }
    });

  dispatch({ type: 'FETCH_MOVIES', payload: response.data.results });
  dispatch({type: 'RECEIVE_TOTAL_PAGES_FOR_MOVIES', payload: response.data.total_pages});
};

export const fetchTVShows =  (value, page=1) =>  async dispatch => {
  const response = await themoviedb.get('/search/tv', {
    params: {
      api_key: "9f8233e5843d6fc70a65f379d4909c34",
      language: "en-US",
      query: value,
      include_adult: false,
      page:page
    }
    });

  dispatch({ type: 'FETCH_TVSHOWS', payload: response.data.results });
  dispatch({type: 'RECEIVE_TOTAL_PAGES_FOR_SHOWS', payload: response.data.total_pages});
};

export const clearDataFromStore = () => dispatch => {
  dispatch({ type: 'CLEAR_DATA_OF_MOVIES' });
  dispatch({ type: 'CLEAR_DATA_OF_TVSHOWS' });
};
   