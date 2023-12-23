// reducers/index.ts
import CardListReducer from "./CardListReducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  cardList: CardListReducer,
});

export default rootReducer;
