package com.taskbrick.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.taskbrick.entity.FilesTask;
import com.taskbrick.entity.Task;
import com.taskbrick.repository.TaskRepository;
import com.taskbrick.service.FileUploadService;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.io.IOException;
import org.springframework.http.MediaType;
import java.util.stream.Collectors;
import java.util.Base64;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/files")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private TaskRepository taskRepository;

    private static final Path UPLOAD_DIR = Paths.get(System.getProperty("user.dir"), "src", "main", "java", "com", "taskbrick", "files");

    @PostMapping("/upload/{taskId}")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable int taskId) {
        try {
            if (!Files.exists(UPLOAD_DIR)) {
                Files.createDirectories(UPLOAD_DIR);
            }
            System.out.println(file);
            String fileName = fileUploadService.genFileNameService(file.getOriginalFilename());
            Path filePath = UPLOAD_DIR.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            Task task = taskRepository.findById(taskId)
                    .orElseThrow(() -> new EntityNotFoundException("Task não encontrada com ID: " + taskId));

            fileUploadService.saveImagesService(fileName, filePath.toString(), task);

            return ResponseEntity.status(HttpStatus.OK).body(filePath.toString());
        } catch (Exception e) {
            // Handle exceptions appropriately
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao fazer upload do arquivo");
        }
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<List<String>> listTaskImages(@PathVariable int taskId) {
    try {
        List<FilesTask> filesTasks = fileUploadService.allImagesService(taskId);

        List<String> imagesData = filesTasks.stream()
                .map(filesTask -> {
                    try {
                        byte[] imageData = fileUploadService.getImageData(filesTask.getId());
                        String base64Image = Base64.getEncoder().encodeToString(imageData);
                        String mimeType = Files.probeContentType(Paths.get(filesTask.getPath()));
                        return "data:" + mimeType + ";base64," + base64Image;
                    } catch (IOException e) {
                        return null;
                    }
                })
                .filter(imageData -> imageData != null)
                .collect(Collectors.toList());

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(imagesData);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

}
