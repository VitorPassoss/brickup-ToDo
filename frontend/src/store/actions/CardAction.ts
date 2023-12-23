// CardAction.ts
export const fetchCards = () => {
  return {
    type: 'FETCH_CARDS'
  }
}

export const setCards = (cards: any[]): any => ({
  type: 'SET_CARDS',
  payload: cards,
});


export const newCard = (name: any) => ({
  type: 'NEW_CARD',
  payload: name,
});


export const currentCard = (idCard: any) => ({
  type: 'CURRENT_CARD',
  payload: idCard,
});


export const emitterEvent = (status: boolean) => ({
  type: 'EMITTER_EVENT',
  payload: status,
});




