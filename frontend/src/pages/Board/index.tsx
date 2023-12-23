import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Image, Flex, Spin, message } from 'antd';
import LayoutCore from '../../sections/Layout';
import FrameCore from '../../sections/Frame';
import StyledButton from '../../components/StyledButton';
import FormCard from '../../components/FormCard';
import FormTask from '../../components/FormTask';

import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteCard, deleteTask, updateMoveTask } from '../../services/ApiService';
import { useDispatch } from 'react-redux';
import { currentCard, fetchCards } from '../../store/actions/CardAction';
import { StyledCard, StyledTask, StyledText } from './styles'
import { useSelector } from 'react-redux';

interface ITask {
  id: string;
  nome: string;
  descricao: string;
  status: any
  files: any
  thumb: any
}

interface ICard {
  id: string;
  tasks: ITask[];
  nome: string
}


export function Board() {
  const dispatch = useDispatch()
  const [useCards, setCards] = useState<any>([]);
  const [useLoading, setLoading] = useState<any>(null)
  const [isCardModalOpen, setCardModalpen] = useState(false);
  const [isTaskModalOpen, setTaskModalpen] = useState(false);
  const [handleRender, setHandleRender] = useState(false);
  const cards = useSelector((state: any) => state.cardList.cards);


  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch, handleRender]);


  useEffect(() => {
    setLoading(true);
    setCards(cards)
    setLoading(false);
  }, [cards]);



  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const idTask = result.draggableId
    const idCard = result.destination.droppableId

    updateMoveInMemory(idTask, idCard)
    await updateMoveTask(idTask, idCard)


  };

  const updateMoveInMemory = (idTask: string, idCard: string) => {
    const cardCurrent = useCards.find((card: ICard) =>
      card.tasks.some((task) => task.id.toString() === idTask)
    );

    const removedTaskIndex: number = cardCurrent?.tasks.findIndex(
      (task: ITask) => task.id.toString() === idTask
    );

    if (cardCurrent && removedTaskIndex !== -1) {
      const removedTask: any = cardCurrent.tasks.splice(removedTaskIndex, 1)[0];
      const cardUpdated = useCards.find((card: any) => {
        return card.id === Number(idCard);
      });

      if (cardUpdated) {
        cardUpdated.tasks.push(removedTask);
      } else {
        message.error("Card not found");
      }
    } else {
      message.error("Task not found");
    }
  };

  const showCardModal = () => {
    setCardModalpen(true);
  };

  const showTaskModal = (CardId: any) => {
    setTaskModalpen(true);
    dispatch(currentCard(CardId))
  };

  const handleFormSubmit = () => {
    setHandleRender((prev) => !prev);
  };


  const CardDelete = (cardId: string) => {
    deleteCard(cardId).then((res) => {
      dispatch(fetchCards());
      message.success("Card excluido com sucesso.");
    })
  }

  const TaskDelete = (taskId: string) => {
    deleteTask(taskId).then((res) => {
      dispatch(fetchCards());
      message.success("Atividade excluida com sucesso.");
    })
  }


  return (
    <LayoutCore>
      <DragDropContext onDragEnd={onDragEnd}>
        <FrameCore>
          {useCards.map((card: ICard) => (
            <Droppable key={card.id} droppableId={card.id.toString()}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <StyledCard
                    title={card.nome}
                    headStyle={{ backgroundColor: '#1677ff', color: "#fff" }}
                    extra={<Button type="primary" danger size='small' onClick={() => { CardDelete(card.id) }} icon={<DeleteOutlined  />}>
                    </Button>} >

                    <div>
                      {useLoading === false ? (
                        card.tasks && card.tasks.map((task: ITask, index: number) => (
                          <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                            {
                              (provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    opacity: snapshot.isDragging ? '0.5' : '1',
                                  }}
                                >

                                  <StyledTask>
                                    <Flex vertical align="start">
                                      <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        backgroundColor: '#1677ff',
                                        borderRadius: '8px',

                                      }}>
                                        <StyledText>
                                          {task.nome}
                                        </StyledText>

                                        <span><Button
                                          type="primary"
                                          danger
                                          size='small'
                                          onClick={() => { TaskDelete(task.id) }}
                                          icon={<DeleteOutlined  />}>
                                        </Button></span>
                                      </div>

                                      <div>
                                        {task.descricao}
                                      </div>

                                      {task.thumb && (
                                        <Image
                                          width={'100%'}
                                          style={{ height: '250px' }}
                                          fallback={task?.thumb}
                                        >

                                        </Image>
                                      )}

                                    </Flex>
                                  </StyledTask>
                                  <div></div>
                                </div>
                              )}

                          </Draggable>
                        ))
                      ) : (
                        <Spin />
                      )}
                      <div style={{ marginTop: '15px' }}>
                        <Button style={{ background: '#1677ff', color: '#fff', border: 'none' }} onClick={() => { showTaskModal(card.id) }} icon={<AppstoreAddOutlined />} >
                          Adicionar uma nova tarefa
                        </Button>
                        <FormTask IsModalOpen={isTaskModalOpen} setModal={setTaskModalpen} onFormSubmit={handleFormSubmit} />
                      </div>
                    </div>
                    {provided.placeholder}
                  </StyledCard>
                </div>
              )}
            </Droppable>
          ))}
          <StyledButton onPress={showCardModal} title="Adicionar outra lista" icon={<AppstoreAddOutlined />} />
          <FormCard IsModalOpen={isCardModalOpen} setModal={setCardModalpen} onFormSubmit={handleFormSubmit} // Pass the callback function
          />
        </FrameCore>
      </DragDropContext>
    </LayoutCore>
  );
}