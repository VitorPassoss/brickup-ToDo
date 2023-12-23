interface CardListState {
  cards: any[]; 
  newCard: string;
  currentCard: any;
  statusEvent: boolean
}

const initialState: CardListState = {
  cards: [],
  newCard : '',
  currentCard: '',
  statusEvent: false
};

const CardListReducer = (state: CardListState = initialState, action: any): CardListState => {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, cards: action.payload };
    case 'NEW_CARD':
      return {...state, newCard: action.payload};
    case 'CURRENT_CARD':
      return {...state, currentCard: action.payload};
    case 'EMITTER_EVENT':
      return {...state, statusEvent: action.payload};
    default:
      return state;
  }
};


export default CardListReducer;
