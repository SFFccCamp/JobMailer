import { FETCH_USER, GET_USER, RESET_USER } from '../actions/actions';
import fetchUser from '../actions/fetchUser';

import { takeEvery, call, put, all } from 'redux-saga/effects';


function* watchUser() {
    yield takeEvery(GET_USER, getUser);
}

function* getUser() {
   
    try {

        const response = yield call(fetchUser);
        if (response.ok) {
          const user = yield response.json();
          yield put( {
            type: FETCH_USER,
            payload: { ...user, isLoggedIn: true }
        } );

        } else {
          throw response;
        }
        

    } catch (e) {
        yield put( { type: RESET_USER } );
    }
}

export default function* rootSaga() {
    yield all([
        watchUser()
    ]);
}