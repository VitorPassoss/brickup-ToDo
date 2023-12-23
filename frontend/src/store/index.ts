import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootReducer from '../store/reducers';
import rootSaga from '../store/sagas';

const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();

const store: Store<any> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware as any) 
);



sagaMiddleware.run(rootSaga);

export default store;

