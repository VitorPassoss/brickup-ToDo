// sagas/CardSaga.ts

import { call, put, takeLatest, all } from 'redux-saga/effects';
import { getAllCards, getImagesByTask, getTaskByState } from '../../services/ApiService';
import { setCards } from '../actions/CardAction';

interface ICard {
  id: string;
  nome: string;
}

interface ITask {
  id: string;
  nome: string;
  descricao: string;
  status: any;
  thumb?: string;
}

function* fetchCards(): Generator<any> {
  try {
    const cardsData: any = yield call(getAllCards);

    if (!Array.isArray(cardsData)) {
      throw new Error('Dados inválidos retornados por getAllCards');
    }

    const cards: ICard[] = cardsData;

    const cardsWithTasks: any = yield all(
      cards.map(async (card: ICard) => {
        const tasksData: any = await getTaskByState(card.nome);

        if (!Array.isArray(tasksData)) {
          throw new Error('Dados inválidos retornados por getTaskByState');
        }

        const tasks: ITask[] = await Promise.all(
          tasksData.map(async (task: ITask) => {
            const urlPath = await getImagesByTask(task.id);
            return {
              ...task,
              thumb: urlPath[0],
            };
          })
        );

        return { ...card, tasks };
      })
    );

    yield put(setCards(cardsWithTasks));
  } catch (error: any) {
    console.error('Erro ao buscar cards:', error.message);
  }
}

export default function* CardSaga() {
  yield takeLatest('FETCH_CARDS', fetchCards);
}
