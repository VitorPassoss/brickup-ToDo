import axios, { AxiosResponse, AxiosError } from 'axios';

const baseURL = 'http://localhost:8080';

const api = axios.create({
  baseURL,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    console.error('Erro na requisição:', error.message);
    throw error;
  }
);

export const getAllTask = async (): Promise<any> => {
  try {
    const response = await api.get('/tasks/all');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllCards = async (): Promise<any> => {
  try {
    const response = await api.get('/tasks/state/all');
    return response;
  } catch (error) {
    throw error;
  }
};


export const getTaskByState = async (state:any): Promise<any> => {
  try {
    const response = await api.get(`/tasks/filter/${state}`);
    return response;
  } catch (error) {
    throw error;
  }
};



export const updateTaskByState = async (state:any): Promise<any> => {
  try {
    const response = await api.put(`/tasks/update/${state}`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const updateMoveTask = async (idTask:string, idCard:string): Promise<any>  => {
  try {
    const response = await api.put(`/tasks/update/move/${idTask}/to/${idCard}`);
    return response;
  } catch (error) {
    throw error;
  }
}


export const createCard = async (body:any): Promise<any>  => {
  try {
    const response = await api.post(`/tasks/state/create`, body);
    return response;
  } catch (error) {
    throw error;
  }
}


export const createTask = async (body:any): Promise<any>  => {
  try {
    const response = await api.post(`/tasks/create`, body);
    return response;
  } catch (error) {
    throw error;
  }
}


export const saveImages = async ({ idTask, file }:any): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`/files/upload/${idTask}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};


export const getImagesByTask = async (taskId:any): Promise<any> => {
  try {
    const response:any = await api.get(`/files/${taskId}`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const deleteTask = async (taskId:any): Promise<any> => {
  try {
    const response:any = await api.delete(`/tasks/delete/${taskId}`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const deleteCard = async (taskId:any): Promise<any> => {
  try {
    const response:any = await api.delete(`/tasks/state/delete/${taskId}`);
    return response;
  } catch (error) {
    throw error;
  }
};



