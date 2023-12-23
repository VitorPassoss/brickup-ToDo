import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, message } from "antd";
import { createTask, saveImages } from "../../services/ApiService";
import { useSelector } from "react-redux";

interface ITaskCreated {
  nome: string;
  descricao: string;
  files: any;
}

function FormTask({ IsModalOpen, setModal, onFormSubmit }: any) {
  const [form] = Form.useForm();
  const [isNameValid, setIsNameValid] = useState(false);
  const [isDescricaoValid, setIsDescricaoValid] = useState(false);
  const [isFileValid, setIsFileValid] = useState(true); 

  const cardListReducer: any = useSelector((state: any) => state.cardList);

  const onFinish = (values: ITaskCreated) => {
    setModal(false);
    console.log(values);
    const payload = {
      ...values,
      status: {
        id: cardListReducer.currentCard,
      },
    };

    createTask(payload).then(async (res: any) => {
      const TaskId = res;
      const fileItem = values.files?.file;
      if (fileItem) {
        console.log(fileItem);
        await saveImages({ idTask: TaskId, file: fileItem });
        onFormSubmit();
      }
    });

    onFormSubmit();
  };

  const handleCancel = () => {
    setModal(false);
  };

  const checkFile = (file: any) => {
    const MAX_FILE_SIZE = 1048576; // 1 MB
    const SAFETY_MARGIN = 1024;
    const fileSize = file.size;
    const totalSize = fileSize + SAFETY_MARGIN;

    if (totalSize > MAX_FILE_SIZE) {
      message.error("O tamanho do arquivo excede o limite permitido.");
      setIsFileValid(false);
      return false;
    }

    setIsFileValid(true);
    return false;
  };

  return (
    <Modal
      title="Adicionar Lista"
      open={IsModalOpen}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ nome: "" }}
        name="basic"
      >
        <Form.Item
          rules={[
            { required: true, message: "Por favor, insira um nome para a task!" },
          ]}
          label="Nome"
          name="nome"
          required
          tooltip="Campo obrigatorio"
          validateStatus={isNameValid ? "success" : "error"}
          help={!isNameValid && "Por favor, insira um nome válido."}
        >
          <Input onChange={(e) => setIsNameValid(!!e.target.value)} />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Por favor, insira uma descricao para a task!",
            },
          ]}
          label="Descricao"
          name="descricao"
          required
          tooltip="Campo obrigatorio"
          validateStatus={isDescricaoValid ? "success" : "error"}
          help={!isDescricaoValid && "Por favor, insira uma descrição válida."}
        >
          <Input onChange={(e) => setIsDescricaoValid(!!e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Imagem"
          name="files"
          validateStatus={isFileValid ? "success" : "error"}
          help={!isFileValid && "O tamanho do arquivo excede o limite permitido."}
        >
          <Upload.Dragger
            accept="image/png, image/jpeg"
            beforeUpload={checkFile}
            maxCount={1}
            name="files"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={!isNameValid || !isDescricaoValid || !isFileValid}
          >
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormTask;
