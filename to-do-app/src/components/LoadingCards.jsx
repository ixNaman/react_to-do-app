import { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
 
const LoadingCards = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Create a form instance using Form.useForm()
 
  const showModal = () => {
    setIsModalVisible(true);
  };
 
  const handleCancel = () => {
    setIsModalVisible(false);
  };
 
  const handleAddTodo = async (values) => {
    try {
      setLoading(true);
      await axios.post(`https://apis-production-145a.up.railway.app/api/todo/`, {
        title: values.title,
        para: values.para,
      }, {
        headers: {
          Authorization: 'baf0b04b-f443-447c-8706-c379963fddc5',
        },
      });
      props.onSuccess();

 
    
      form.resetFields();
 
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding todo:', error);
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
        style={{ position: 'fixed', bottom: 20, right: 20 }}
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
              rules={[{ required: true, message: 'Please enter the title' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="para"
              rules={[{ required: true, message: 'Please enter the description' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}
 
export default LoadingCards;