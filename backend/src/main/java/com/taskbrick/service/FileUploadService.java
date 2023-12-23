package com.taskbrick.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.UUID;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import com.taskbrick.entity.FilesTask;
import com.taskbrick.entity.Task;
import com.taskbrick.repository.FileUploadRepository;
import java.util.List;
import java.io.IOException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class FileUploadService {
    
    @Autowired
    private FileUploadRepository fileUploadRepository;

    public List<FilesTask> allImagesService(int idTask) {
        return fileUploadRepository.findByTaskId(idTask);
    }   


    public FilesTask saveImagesService(String nome, String path, Task task) {
        return fileUploadRepository.save(new FilesTask(nome, path, task));
    }


    public String genFileNameService(String originalFileName) {
        String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        return UUID.randomUUID().toString() + extension;
    }


    public byte[] getImageData(int fileId) throws IOException {
        FilesTask filesTask = fileUploadRepository.findById(fileId)
                .orElseThrow(() -> new EntityNotFoundException("File not found with ID: " + fileId));
    
        String filePath = filesTask.getPath();
        Path imagePath = Paths.get(filePath);
    
        return Files.readAllBytes(imagePath);
    }




    

}   
