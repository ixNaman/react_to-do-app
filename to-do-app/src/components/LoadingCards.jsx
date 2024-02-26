import { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Spin, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const LoadingCards = ({ onSuccess }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const Create = import.meta.env.VITE_CREATE;
  const Header = import.meta.env.VITE_HEADER;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddTodo = async (values) => {
    try {
      setLoading(true);
      await axios.post(
        Create,
        {
          title: values.title,
          para: values.para,
        },
        {
          headers: {
            Authorization: Header,
          },
        }
      );
      onSuccess();

      form.resetFields();

      setIsModalVisible(false);
    } catch (error) {
      message.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        shape="square"
        icon={<EditOutlined />}
        size="large"
        style={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={showModal}
      />
      <Modal
        title="Add ToDo"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form form={form} onFinish={handleAddTodo}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="para"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={loading}>
                {loading ? "Adding..." : "Add"}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default LoadingCards;
