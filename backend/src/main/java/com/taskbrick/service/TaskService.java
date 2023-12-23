package com.taskbrick.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskbrick.entity.Task;
import com.taskbrick.repository.TaskRepository;
import com.taskbrick.repository.CardsTypeRepository;
import com.taskbrick.repository.FileUploadRepository;
import com.taskbrick.entity.CardsType;
import com.taskbrick.entity.FilesTask;

import java.util.Optional;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    CardsTypeRepository cardsTypeRepository;

    @Autowired
    private FileUploadRepository fileUploadRepository;

    public List<Task> allTasksService() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksByStatusName(String status) {
        return taskRepository.findByStatusNome(status);
    }

    public Integer createTaskService(String nome, String descricao, int cardsTypeId) {
        CardsType status = cardsTypeRepository.getById(cardsTypeId);
        Task task = new Task(nome, descricao, status);
        Task savedTask = taskRepository.save(task);
        return savedTask.getId();
    }

    public Task updateTaskService(int taskId, Task task) {
        Optional<Task> existingTask = taskRepository.findById(taskId);
        if (existingTask.isPresent()) {
            task.setId(taskId);
            return taskRepository.save(task);
        } else {
            throw new EntityNotFoundException("Task with ID " + taskId + " not found");
        }
    }

    @Transactional
    public void deleteTaskService(int taskId) {
        // Extrair o objeto Task do Optional
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada com ID: " + taskId));

        // Chamar findByTaskId em uma instância de fileUploadRepository
        List<FilesTask> files = fileUploadRepository.findByTaskId(taskId);

        if (!files.isEmpty()) {
            // Excluir todos os arquivos associados à tarefa
            fileUploadRepository.deleteAll(files);
        }

        // Excluir a tarefa
        taskRepository.delete(task);
    }

    public CardsType createStateService(String nome) {
        return cardsTypeRepository.save(new CardsType(nome));
    }

    public List<CardsType> allStateService() {
        return cardsTypeRepository.findAll();
    }

    public CardsType updateStateService(int stateId, CardsType cardsType) {
        Optional<CardsType> existingCard = cardsTypeRepository.findById(stateId);
        if (existingCard.isPresent()) {
            cardsType.setId(stateId);
            return cardsTypeRepository.save(cardsType);
        } else {
            throw new EntityNotFoundException("Card with ID " + stateId + " not found");
        }
    }

    public void MoveTaskService(int taskId, int cardId) {
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isEmpty()) {
            throw new EntityNotFoundException("Tarefa não encontrada com o ID: " + taskId);
        }

        Task task = taskOptional.get();

        Optional<CardsType> newCardOptional = cardsTypeRepository.findById(cardId);
        if (newCardOptional.isEmpty()) {
            throw new EntityNotFoundException("Cartão não encontrado com o ID: " + cardId);
        }

        CardsType newCard = newCardOptional.get();

        task.setStatus(newCard);
        taskRepository.save(task);
    }

    public void deleteStateService(int id) {
        cardsTypeRepository.deleteById(id);
    }

}