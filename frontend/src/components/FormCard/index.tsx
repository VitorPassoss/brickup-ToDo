// FormCard component
import React from "react";
import { Button, Form, Input, Modal, Spin } from "antd";
import { createCard } from "../../services/ApiService";

function FormCard({ IsModalOpen, setModal, onFormSubmit }: any) {
  const [form] = Form.useForm();
  const [spinning, setSpinning] = React.useState<boolean>(false);

  const onFinish = (values: any) => {
    setSpinning(true);
    createCard(values).then((res) => {
      setSpinning(false);
      setModal(false);
      onFormSubmit();
    });
  };

  const handleCancel = () => {
    setModal(false);
  };

  return (
    <Modal
      title="Adicionar Lista"
      open={IsModalOpen}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form
        name="basic"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ nome: "" }}
      >
        <Form.Item
          rules={[
            { required: true, message: "Por favor, insira um nome para o card!" },
          ]}
          label="Nome"
          name="nome"
          required
          tooltip="Campo obrigatorio"
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
      <Spin spinning={spinning} fullscreen />
    </Modal>
  );
}

export default FormCard;
