// sagas/index.ts
import { all } from 'redux-saga/effects';
import CardSaga from './cardSaga';


function* rootSaga() {
  yield all([
    CardSaga()
  ]);
}

export default rootSaga;
