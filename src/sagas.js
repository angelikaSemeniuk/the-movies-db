import { call, put, takeEvery, all } from 'redux-saga/effects';
import { fetchData, fetchDetails, fetchEpisodes } from './api/themoviedb';
import {
  receiveContentData,
  receiveSelectedItem,
  receiveEpisodes 
} from './actions';

import {
  REQUEST_MULTI_DATA,
  REQUEST_MOVIES_DATA,
  REQUEST_SHOWS_DATA,
  REQUEST_EPISODES,
  REQUEST_MOVIE_DETAILS,
  REQUEST_TVSHOW_DETAILS,
} from './consts/ActionTypes';

function* fetchContent(action) {
  const { url, query, page } = action.payload;
  try {
    const response = yield call(fetchData, url, query, page);
    yield put(receiveContentData(response));
  } catch (error) {
    console.log(error);
  }
};

function* fetchItemDetails(action) {
  try {
    const response = yield call(fetchDetails, action.payload);
    yield put(receiveSelectedItem(response));
  } catch (error) {
    console.log(error);
  }
};

function* fetchSeasonEpisodes(action) {
  const { tvId, number } = action.payload;
  try {
    const response = yield call(fetchEpisodes, tvId, number);

    yield put(receiveEpisodes(response));
  } catch (error) {
      console.log(error);
  }
};

function* watchFetchingData() {
  yield takeEvery(REQUEST_MULTI_DATA, fetchContent);
  yield takeEvery(REQUEST_MOVIES_DATA, fetchContent);
  yield takeEvery(REQUEST_SHOWS_DATA, fetchContent);
}

function* watchGettingDetails() {
  yield takeEvery(REQUEST_MOVIE_DETAILS, fetchItemDetails);
  yield takeEvery(REQUEST_TVSHOW_DETAILS, fetchItemDetails)
};

function* watchFetchingEpisodes() {
  yield takeEvery(REQUEST_EPISODES, fetchSeasonEpisodes);
}
  
export default function* rootSaga() {
  yield all([
    watchFetchingData(),
    watchGettingDetails(),
    watchFetchingEpisodes()
  ])
};